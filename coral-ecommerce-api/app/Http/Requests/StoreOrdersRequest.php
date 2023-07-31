<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrdersRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
   */
  public function rules(): array
  {
    return [
      'user_id' => 'required|integer|exists:users,id',
      'payment_method' => 'required|string|max:255',
      'total_amount' => 'required|numeric|min:0',

      'order_items' => 'required|array',
      'order_items.*.product_id' => 'required|integer|exists:products,id',
      'order_items.*.quantity' => 'required|integer|min:1',
      'order_items.*.price' => 'required|numeric|min:0',

      'order_address_id' => 'required|integer|exists:order_addresses,id',
    ];
  }
}
