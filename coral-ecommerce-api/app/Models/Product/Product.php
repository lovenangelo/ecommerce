<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id', 'name', 'description', 'category', 'price', 'quantity', 'sizes', 'color', 'subtitle', 'payment_options', 'brand'
  ];

  public function image(): HasOne
  {
    return $this->HasOne(ProductImage::class);
  }

  public function promo(): HasOne
  {
    return $this->HasOne(Promo::class);
  }

  public function review(): HasOne
  {
    return $this->HasOne(Review::class);
  }
}
