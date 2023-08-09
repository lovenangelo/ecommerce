<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrdersRequest;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderItem;

class OrdersController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $userId = auth()->user()->id;

    $orders = Order::where('user_id', $userId)
      ->select('created_at as date', 'total_amount as price', 'id as order_id', 'status')
      ->get();

    return response()->json($orders);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreOrdersRequest $request)
  {
    $validatedData = $request->validated();

    // Generate a unique transaction number
    $transactionNumber = uniqid('TXN', true);

    // Create the OrderAddress
    $orderAddressId = $validatedData['order_address_id'];

    // Create the Order
    $order = Order::create([
      'transaction_number' => $transactionNumber,
      'user_id' => $validatedData['user_id'],
      'payment_method' => $validatedData['payment_method'],
      'total_amount' => $validatedData['total_amount'],
      'order_address_id' => $orderAddressId,
    ]);

    // Create the OrderItems
    $orderItemsData = $validatedData['order_items'];
    $orderItems = [];

    foreach ($orderItemsData as $itemData) {
      $orderItems[] = new OrderItem([
        'order_id' => $order->id,
        'product_id' => $itemData['product_id'],
        'quantity' => $itemData['quantity'],
        'price' => $itemData['price'],
      ]);
    }

    $order->order_items()->saveMany($orderItems);

    // Delete cart items based on their IDs
    $cartItemIds = array_column($orderItemsData, 'cart_item_id');
    CartItem::whereIn('id', $cartItemIds)->delete();

    // Save the order again to ensure the transaction number is stored
    $order->save();

    return response()->json(['message' => 'Order created successfully'], 201);
  }


  /**
   * Display the specified resource.
   */
  public function show($order_id)
  {
    //
  }

  public function destroy($order_id)
  {
    //
  }

  // /**
  //  * Update the specified resource in storage.
  //  */
  // public function update($id)
  // {
  //   //
  // }

  /**
   * Remove the specified resource from storage.
   */
}
