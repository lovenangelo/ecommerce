<?php

namespace Database\Factories\Product;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product\Product>
 */
class ProductFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition(): array
  {

    return [
      'user_id' => 1,
      'name' => fake()->name(),
      'description' => fake()->text(),
      'subtitle' => fake()->text(100),
      'brand' => fake()->text(10),
      'quantity' => 10,
      'payment_options' => 'card,cod',
      'sizes' => 's,m,l',
      'color' => 'red',
      'category' => 'handbags',
      'price' => 100.0,
    ];
  }
}
