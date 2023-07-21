<?php

namespace App\Http\Controllers\Product;

use App\Filters\ProductFilters;
use App\Models\Product\Product;
use App\Models\Product\ProductImage;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Controller;
use App\Models\Product\Brand;
use App\Models\Product\Category;
use App\Models\Product\Color;
use App\Models\Product\PaymentOption;
use App\Models\Product\Price;
use App\Models\Product\Quantity;
use App\Models\Product\Size;

class ProductController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(ProductFilters $filters)
  {
    $query = Product::with('image', 'brand', 'category', 'price');
    $query->filter($filters);
    $sortBy = request()->input('sort_by');
    $sortDirection = request()->input('sort_direction');

    if ($sortBy === 'price') {
      $query->join('prices', 'products.id', '=', 'prices.product_id')
        ->orderBy('prices.price', $sortDirection);
    }
    $products = $query->paginate(9);
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

      $product = Product::create([...$request->only(['name', 'description', 'subtitle']), 'user_id' => $user_id]);
      $product->save();
      $product_id = $product->id;
      clock(['product_id' => $product_id, ...$request->only('price')]);
      Price::create(['product_id' => $product_id, ...$request->only('price')]);
      Category::create(['product_id' => $product_id, ...$request->only('category')]);
      Quantity::create(['product_id' => $product_id, ...$request->only('quantity')]);
      Color::create(['product_id' => $product_id, ...$request->only('color')]);
      Brand::create(['product_id' => $product_id, ...$request->only('brand')]);

      // Saving sizes
      $sizes =  $request->input('sizes');
      Size::create([
        'product_id' => $product_id, 's' => str_contains($sizes, 's'), 'm' => str_contains($sizes, 'm'),
        'l' => str_contains($sizes, 'l')
      ]);

      // Saving payment options
      $payment_options =  $request->input('payment_options');
      PaymentOption::create([
        'product_id' => $product_id, 'card' => str_contains($payment_options, 'card'), 'cod' => str_contains($payment_options, 'cod')
      ]);
      clock(str_contains($payment_options, 'card'));

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
      $product = Product::where(['id' => $id])->with('brand', 'image', 'quantity', 'size', 'payment_options', 'brand', 'category', 'color', 'price')->first();
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

  /**
   * Filter 
   */
  public function filter(Request $request, $category)
  {
  }

  /**
   * Filter 
   */
  public function sort(Request $request, $category)
  {
  }
}
