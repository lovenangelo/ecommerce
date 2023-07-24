<?php

namespace App\Http\Controllers\Product;

use App\Models\Product\Product;
use App\Models\Product\ProductImage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $categoryFilter = $request->input('category');
    $colorsFilter = $request->input('colors');
    $sizesFilter = $request->input('sizes');
    $priceFilter = $request->input('price');
    $sortBy = request()->input('sort_by');
    $sortDirection = request()->input('sort_direction');

    $query = Product::query();

    // Apply filters
    if ($categoryFilter) {
      $query->where('category', $categoryFilter);
    }

    if ($colorsFilter) {
      $colors = explode(',', $colorsFilter);
      $query->where(function ($query) use ($colors) {
        foreach ($colors as $color) {
          $query->orWhere('color', 'like', '%' . $color . '%');
        }
      });
    }

    if ($sizesFilter) {
      $sizes = explode(',', $sizesFilter);
      $query->where(function ($query) use ($sizes) {
        foreach ($sizes as $size) {
          $query->orWhere('sizes', 'like', '%' . $size . '%');
        }
      });
    }

    if ($priceFilter) {
      $query->where('price', '>=', $priceFilter);
    }

    // Sorting
    if ($sortBy === 'price') {
      $query
        ->orderBy('price', $sortDirection);
    }
    $products = $query->with('image')->paginate(9);

    return $products;
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    try {
      $user_id = $request->user()->id;
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
      $product = Product::create([...$validated, 'user_id' => $user_id]);
      $product->save();
      $product_id = $product->id;

      // Saving image
      $path = $request->file('image')->store("products/{$validated['category']}");
      ProductImage::create(['product_id' => $product_id, 'url' => $path]);

      return response()->json(['message' => 'New product created successfully'], 201);
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
      $product = Product::where(['id' => $id])->with('image')->first();
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
