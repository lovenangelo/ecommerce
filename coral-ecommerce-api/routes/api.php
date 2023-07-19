<?php

use App\Http\Controllers\AvatarController;
use App\Http\Controllers\Product\ProductController;
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

  // Avatar
  Route::post(
    '/upload-avatar',
    [AvatarController::class, 'upload']
  );

  // Products routes
  Route::post('/products/create', [ProductController::class, 'store']);
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{category}/{id}', [ProductController::class, 'show']);
