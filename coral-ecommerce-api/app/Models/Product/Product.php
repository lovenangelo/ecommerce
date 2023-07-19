<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id', 'name', 'description', 'category', 'price', 'quantity', 'sizes', 'colors', 'subtitle', 'delivery_options', 'brand'
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

  public function category(): HasOne
  {
    return $this->HasOne(Category::class);
  }

  public function price(): HasOne
  {
    return $this->HasOne(Price::class);
  }

  public function brand(): HasOne
  {
    return $this->HasOne(Brand::class);
  }

  public function quantity(): HasOne
  {
    return $this->HasOne(Quantity::class);
  }

  public function color(): HasOne
  {
    return $this->HasOne(Color::class);
  }

  public function size(): HasOne
  {
    return $this->HasOne(Size::class);
  }

  public function payment_options(): HasOne
  {
    return $this->HasOne(PaymentOption::class);
  }
}
