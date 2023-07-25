<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product\Product;
use App\Models\Product\ProductImage;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserProductController extends Controller
{

  public function index()
  {
    $user = request()->user(); // Replace this with the desired user's ID
    $user = User::with('products')->find($user->id);

    if (!$user) {
      // Handle the case when the user is not found
      return response()->json(['message' => 'User not found'], 404);
    }

    $userProducts = $user->products()->with('image')->paginate(9);
    return $userProducts;
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, $id)
  {
    $validated = $request->validate(
      [
        'name' => 'required|string',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'quantity' => 'required|integer',
        'category' => 'required|string',
        'sizes' => 'required|string',
        'color' => 'required|string',
        'payment_options' => 'required|string',
        'subtitle' => 'required|string',
        'brand' => 'required|string',
      ]
    );
    $product = Product::findOrFail($id);
    $product->fill($request->all());
    $product->save();

    clock($request->file('image'));
    if ($request->file('image') !== null) {

      // Delete the old file if it exists
      $oldImage = $product->image->url;
      Storage::delete(basename($oldImage));

      // Store the new file with the specified name in the products/category folder
      $path = $request->file('image')->store("products/{$validated['category']}");
      $image = $product->image;
      $productImage = ProductImage::findOrFail($image->id);

      // ProductImage::create(['product_id' => $product->id, 'url' => $path]);
      $productImage->fill(['url' => $path]);
      $productImage->save();
    }


    return response()->noContent();
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy($id)
  {
    try {
      $product = Product::findOrFail($id);
      $product->image()->delete();
      $product->delete();
      return response()->json(['message' => 'Product deleted successfully']);
    } catch (ModelNotFoundException $e) {
      return response()->json(['message' => 'Product not found'], 404);
    } catch (Exception $e) {
      return response()->json(['message' => 'Product could not be deleted', 500]);
    }
  }
}
