<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Wishlist extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id'
  ];

  /**
   * Get the user that owns the Wishlist
   *
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }


  /**
   * Get all of the wishlist_items for the Wishlist
   *
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function wishlist_items(): HasMany
  {
    return $this->hasMany(WishlistItem::class);
  }
}
