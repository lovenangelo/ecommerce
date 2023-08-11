<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product\Product;

class ProductSearchController extends Controller
{
  public function search()
  {
    $searchTerm = request()->input('search'); // 'q' is the parameter for the search term.

    $query = Product::query();
    clock($searchTerm);

    // Search
    if ($searchTerm) {
      $query->where(function ($query) use ($searchTerm) {
        $query->where('name', 'like', '%' . $searchTerm . '%')
          ->orWhere('category', 'like', '%' . $searchTerm . '%')
          ->orWhere('color', 'like', '%' . $searchTerm . '%')
          ->orWhere('brand', 'like', '%' . $searchTerm . '%');
      });
    }

    $products = $query->with('image')->paginate(5);

    return response()->json(['data' => $products]);
  }
}
