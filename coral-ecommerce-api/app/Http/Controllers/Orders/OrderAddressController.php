<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Models\OrderAddress;
use Illuminate\Http\Request;

class OrderAddressController extends Controller
{
  public function index()
  {
    $user_id = request()->user()->id;

    $addresses = OrderAddress::where('user_id', '=', $user_id)->get();
    clock($addresses);
    return $addresses;
  }

  public function store(Request $request)
  {
    $validated = $request->validate(
      [
        'fullname' => 'required|string',
        'mobile_number' => "string|required",
        'street_address' => 'string|required',
        'city' => 'string|required',
        'state' => 'required|string',
        'zip_code' => 'string|required'
      ]
    );

    $user = $request->user();

    $orderAddress = OrderAddress::create([...$validated, 'user_id' => $user->id]);

    if ($orderAddress) {
      return response()->noContent();
    } else {
      return response()->json(['message' => 'Cannot save address'], 500);
    }
  }

  public function destory($id)
  {

    $address = OrderAddress::findOrFail($id)->get();
    if ($address) {
      $address->delete();
      return response()->json(['message' => 'Address successfully deleted.'], 204);
    } else {
      return response()->json(['message' => 'Address not found'], 404);
    }
  }
}
