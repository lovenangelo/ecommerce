<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index($category)
  {
    $products = Product::where('category', $category)->with('image')->paginate(9);
    clock($products);
    return $products;
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $user_id = $request->user()->id;
    try {
      $validated = $request->validate(
        [
          'name' => 'required|string',
          'description' => 'required|string',
          'price' => 'required|integer',
          'quantity' => 'required|integer',
          'category' => 'required|string'
        ]
      );
      $validated['user_id'] = $user_id;
      $product = Product::create($validated);
      $product->save();
      $path = $request->file('image')->store("products/{$validated['category']}");
      ProductImage::create(['product_id' => $product->id, 'url' => $path]);
      return response()->json(['message' => 'New product created successfully'], 201);
    } catch (ValidationException $e) {
      return response()->json(['errors' => $e->errors()], 422);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show($category, $id)
  {
    try {
      $product = Product::where(['category' => $category, 'id' => $id])->with('image')->first();
      return response()->json($product);
    } catch (Exception $e) {
      return response()->json(['message' => 'Product could not be found', 404]);
    }
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
      $product->delete();
      return response()->json(['message' => 'Product deleted successfully']);
    } catch (Exception $e) {
      return response()->json(['message' => 'Product could not be deleted', 500]);
    }
  }
}
