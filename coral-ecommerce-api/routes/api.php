<?php

use App\Http\Controllers\AvatarController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;
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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
  return $request->user();
});

Route::middleware(['auth:sanctum'])->post(
  '/upload-avatar',
  [AvatarController::class, 'upload']
);


// Products routes
Route::middleware(['auth:sanctum'])->post('/products/create', [ProductController::class, 'store']);
Route::middleware(['auth:sanctum'])->get('/products/{category}', [ProductController::class, 'index']);
Route::middleware(['auth:sanctum'])->get('/products/{category}/{id}', [ProductController::class, 'show']);
