<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Dotenv\Exception\ValidationException;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    try {
      $user_id = $request->user()->id;
      $validated = $request->validate(
        [
          'quantity' => 'required|numeric',
          'product_id' => 'required|numeric'
        ]
      );
      $cartItem = CartItem::create([...$validated, 'user_id' => $user_id]);
      $cartItem->save();

      return response()->json(['message' => 'New item added to cart'], 201);
    } catch (ValidationException $e) {
      return response()->json(['errors' => $e->errors()], 422);
    }
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, $id)
  {
    $cartItem = CartItem::findOrFail($id);
    $cartItem->quantity = $request->input('quantity');
    $cartItem->save();
    return response()->noContent();
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy($id)
  {
    try {
      $cartItem = CartItem::findOrFail($id);
      $cartItem->delete();
      return response()->json(['message' => 'Item removed successfully']);
    } catch (ModelNotFoundException $e) {
      return response()->json(['message' => 'Item not found'], 404);
    } catch (Exception $e) {
      return response()->json(['message' => 'Item could not be deleted', 500]);
    }
  }
}
