<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\Product\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'email',
    'password',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array<string, string>
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
    'password' => 'hashed',
  ];

  /**
   * Get all of the products for the User
   *
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function products(): HasMany
  {
    return $this->hasMany(Product::class);
  }

  /**
   * Get all of the carts for the User
   *
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function cart_items(): HasMany
  {
    return $this->hasMany(CartItem::class);
  }

  /**
   * Get all of the orders for the User
   *
   * @return \Illuminate\Database\Eloquent\Relations\HasMany
   */
  public function orders(): HasMany
  {
    return $this->hasMany(Order::class);
  }

  /**
   * Get the user associated with the User
   *
   * @return \Illuminate\Database\Eloquent\Relations\HasOne
   */
  public function wishlist(): HasOne
  {
    return $this->hasOne(Wishlist::class);
  }
}
