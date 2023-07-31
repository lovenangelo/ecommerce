<?php

namespace App\Http\Controllers\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrdersRequest;
use App\Models\Order;
use App\Models\OrderAddress;
use App\Models\OrderItem;

class OrdersController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreOrdersRequest $request)
  {
    $validatedData = $request->validated();

    clock($validatedData);

    // Create the OrderAddress
    $orderAddressId = $validatedData['order_address_id'];

    // Create the Order
    $order = Order::create([
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
