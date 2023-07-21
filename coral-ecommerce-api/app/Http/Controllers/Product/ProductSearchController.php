<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product\Product;

class ProductSearchController extends Controller
{
  public function search()
  {
    $query = Product::with('brand', 'category', 'price', 'color', 'image');
    $query->join('brands', 'products.id', '=', 'brands.product_id')
      ->join('categories', 'products.id', '=', 'categories.product_id')
      ->join('prices', 'products.id', '=', 'prices.product_id')
      ->join('colors', 'products.id', '=', 'colors.product_id');
    $searchKeyword = request()->input('search');
    if ($searchKeyword) {
      $query->where(function ($query) use ($searchKeyword) {
        $query->where('name', 'like', '%' . $searchKeyword . '%')
          ->orWhere('price', 'like', '%' . $searchKeyword . '%')
          ->orWhere('color', 'like', '%' . $searchKeyword . '%')
          ->orWhere('category', 'like', '%' . $searchKeyword . '%')
          ->orWhere('brand', 'like', '%' . $searchKeyword . '%');
      });
    }
    $results = $query->paginate(5);
    return response()->json(['data' => $results]);
  }
}
