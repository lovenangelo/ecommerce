<?php

namespace App\Models;

use App\Models\Product\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class OrderItem extends Model
{
  use HasFactory;

  protected $fillable = [
    'order_id', 'product_id', 'quantity', 'price'
  ];
  /**
   * Get all of the products for the OrderItem
   *
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function products(): HasMany
  {
    return $this->hasMany(Product::class);
  }

  /**
   * Get the order associated with the OrderItem
   *
   * @return \Illuminate\Database\Eloquent\Relations\HasOne
   */
  public function order(): HasOne
  {
    return $this->hasOne(Order::class);
  }
}
