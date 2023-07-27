<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderAddress extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id', 'fullname', 'mobile_number', 'street_address', 'city', 'state', 'zip_code'
  ];

  /**
   * Get the order that owns the OrderAddress
   *
   * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
   */
  public function order(): BelongsTo
  {
    return $this->belongsTo(Order::class);
  }
}
