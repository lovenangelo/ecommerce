<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Wishlist;
use App\Models\WishlistItem;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
  public function store(Request $request, $id)
  {
    $wishlist = Wishlist::create(['user_id' => $id]);
    $wishlistItem = WishlistItem::create(['wishlist_id' => $wishlist->id, 'product_id' => $request->input('product_id')]);
    if ($wishlistItem) {
      return response()->noContent();
    } else {
      return response()->json(['message' => 'Cannot save the item to your wishlist', 500]);
    }
  }

  public function index($id)
  {

    // Retrieve the user along with their wishlist and wishlist items
    $user = User::with([
      'wishlist' => function ($query) {
        $query->with('wishlist_items.product.image')->paginate(9);
      },
    ])->find($id);

    if (!$user) {
      return response()->json(['message' => 'User not found'], 404);
    }

    // Return the user's wishlist data
    return response()->json(['wishlist' => $user->wishlist], 200);
  }
}
