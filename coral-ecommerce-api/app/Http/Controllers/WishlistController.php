<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\WishlistItem;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
  public function store(Request $request)
  {
    $wishlist = Wishlist::create(['user_id' => $request->input('user_id')]);
    $wishlistItem = WishlistItem::create(['wishlist_id' => $wishlist->id, 'product_id' => $request->input('product_id')]);
    if ($wishlistItem) {
      return response()->noContent();
    } else {
      return response()->json(['message' => 'Cannot save the item to your wishlist', 500]);
    }
  }

  public function index()
  {
  }
}
