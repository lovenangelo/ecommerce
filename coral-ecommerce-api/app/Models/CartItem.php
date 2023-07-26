<?php

namespace App\Models;

use App\Models\Product\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
  use HasFactory;

  protected $fillable = [
    'quantity', 'user_id', 'product_id'
  ];

  /**
   * Get the user that owns the Cart
   *
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }

  /**
   * Get all of the products for the Cart
   *
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class);
  }
}
