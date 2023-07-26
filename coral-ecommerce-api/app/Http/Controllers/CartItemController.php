<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartItemController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $cart = CartItem::where('user_id', request()->user()->id)->with('product.image')->paginate(9);
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
