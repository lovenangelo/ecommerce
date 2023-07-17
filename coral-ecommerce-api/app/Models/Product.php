<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id', 'name', 'description', 'category', 'price', 'quantity'
  ];

  public function image(): HasOne
  {
    return $this->HasOne(ProductImage::class);
  }
}
