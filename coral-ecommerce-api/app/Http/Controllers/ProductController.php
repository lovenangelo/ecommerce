<?php

namespace App\Http\Controllers;

use App\Models\Product;
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
    $products = Product::where('category', $category)->paginate(9);
    return $products;
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
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
      $product = Product::create($validated);
      $product->save();
      return response()->json(['message' => 'New prod created successfully'], 201);
    } catch (ValidationException $e) {
      return response()->json(['errors' => $e->errors()], 422);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show($id)
  {
    try {
      $product = Product::findOrFail($id);
      return response($product);
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
