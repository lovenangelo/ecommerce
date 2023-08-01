<?php

namespace App\Models;

use App\Models\Product\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class WishlistItem extends Model
{
  use HasFactory;
  protected $fillable = [
    'wishlist_id', 'product_id'
  ];

  /**
   * Get the wishlist that owns the WishlistItem
   *
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function wishlist(): BelongsTo
  {
    return $this->belongsTo(Wishlist::class);
  }

  /**
   * Get the product associated with the WishlistItem
   *
   * @return \Illuminate\Database\Eloquent\Relations\HasOne
   */
  public function product(): BelongsTo
  {
    return $this->belongsTo(Product::class);
  }
}
