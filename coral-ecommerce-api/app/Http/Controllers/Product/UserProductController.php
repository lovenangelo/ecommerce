<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product\Product;
use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

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
    $product = Product::findOrFail($id);
    $product->fill($request->all());
    $product->save();

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
