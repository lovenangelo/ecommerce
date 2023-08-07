<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('orders', function (Blueprint $table) {
      $table->id();
      $table->string('transaction_number')->unique();
      $table->foreignId('user_id')->nullable()->constrained();
      $table->foreignId('order_address_id')->constrained();
      $table->decimal('total_amount');
      $table->enum('status', ['processing', 'cancelled', 'completed'])->default('processing');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('orders');
  }
};
