<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id', 'order_address_id', 'total_amount'
  ];

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

  /**
   * Get the order_address associated with the Order
   *
   * @return \Illuminate\Database\Eloquent\Relations\HasOne
   */
  public function order_address(): HasOne
  {
    return $this->hasOne(OrderAddress::class);
  }
}
