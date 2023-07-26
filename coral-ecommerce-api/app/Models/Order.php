<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
  use HasFactory;

  /**
   * Get all of the order_items for the Order
   *
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function order_items(): HasMany
  {
    return $this->hasMany(OrderItem::class);
  }

  /**
   * Get the user that owns the Order
   *
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function user(): BelongsTo
  {
    return $this->belongsTo(User::class);
  }
}