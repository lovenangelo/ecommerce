<?php

use App\Http\Controllers\AvatarController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\Orders\OrderAddressController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Product\ProductSearchController;
use App\Http\Controllers\Product\UserProductController;
use App\Http\Controllers\Profile\PasswordResetController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\Orders\OrdersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware(['auth:sanctum'])->group(function () {

  // User
  Route::get('/user', function (Request $request) {
    return $request->user();
  });
  Route::post('/reset-password', [PasswordResetController::class, 'store']);

  // Avatar
  Route::post(
    '/upload-avatar',
    [AvatarController::class, 'upload']
  );

  // Products routes
  Route::post('/products/create', [ProductController::class, 'store']);
  Route::get('/my-products', [UserProductController::class, 'index']);
  Route::put('/my-products/{id}', [UserProductController::class, 'update']);
  Route::delete('/my-products/{id}', [UserProductController::class, 'destroy']);



  // Order
  Route::get('/order/address', [OrderAddressController::class, 'index']);
  Route::post('/order/address', [OrderAddressController::class, 'store']);
  Route::delete('/order/address/{id}', [OrderAddressController::class, 'destroy']);

  // Wishlist
  Route::post('/users/{id}/wishlist', [WishlistController::class, 'store']);
  Route::get('/users/{id}/wishlist', [WishlistController::class, 'index']);
  Route::delete('/wishlist/{wishlistItemId}', [WishlistController::class, 'destroy']);
});

// Cart
Route::resource('cart', CartItemController::class);

// Order
Route::resource('/orders', OrdersController::class);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/search', [ProductSearchController::class, 'search']);
Route::get('/public/products/new-arrivals', [ProductController::class, 'newArrivals']);
