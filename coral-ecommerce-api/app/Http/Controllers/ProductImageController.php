<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;

class ProductImageController extends Controller
{
  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class);
  }
}
