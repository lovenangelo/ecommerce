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
    $user_id = $id;
    $product_id = $request->input('product_id');

    $wishlist = Wishlist::where('user_id', $user_id)->first();

    if (!$wishlist) {
      $wishlist = Wishlist::create(['user_id' => $user_id]);
    }

    $wishlistItem = WishlistItem::where('wishlist_id', $wishlist->id)
      ->where('product_id', $product_id)
      ->first();

    if (!$wishlistItem) {
      WishlistItem::create(['wishlist_id' => $wishlist->id, 'product_id' => $product_id]);
      return response()->noContent();
    } else {
      return response()->noContent(); // Item already exists in the wishlist
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

  public function destroy($wishlistItemId)
  {
    // Find the wishlist item by its ID
    clock($wishlistItemId);
    $wishlistItem = WishlistItem::find($wishlistItemId);
    if (!$wishlistItem) {
      return response()->json(['message' => 'Wishlist item not found'], 404);
    }

    // Check if the authenticated user is the owner of the wishlist containing the item
    if (request()->user()->id !== $wishlistItem->wishlist->user_id) {
      return response()->json(['message' => 'Unauthorized'], 403);
    }

    // Delete the wishlist item
    $wishlistItem->delete();

    return response()->json(['message' => 'Wishlist item deleted successfully'], 200);
  }
}
