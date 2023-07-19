<?php

namespace App\Http\Controllers\Product;

use App\Models\Product\Product;
use App\Models\Product\ProductImage;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProductImageController extends Controller
{
  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class);
  }
}
