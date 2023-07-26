<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\User;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $cart = User::with('cart_items');
    return $cart;
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   */
  public function show(CartItem $cart)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(CartItem $cart)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, CartItem $cart)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(CartItem $cart)
  {
    //
  }
}
