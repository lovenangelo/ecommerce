<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use Illuminate\Validation\Rules;

class PasswordResetController extends Controller
{

  public function store(Request $request)
  {
    $validated = $request->validate([
      'current_password' => ['required', 'string'],
      'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    $user = $request->user();
    $currentPassword = $validated['current_password'];
    $newPassword = $validated['password'];
    if (!Hash::check($validated['current_password'], $user->password)) {
      return response()->json(['message' => 'Password do not match your current password.'], 500);
    }

    // Here we will attempt to reset the user's password. If it is successful we
    // will update the password on an actual user model and persist it to the
    // database. Otherwise we will parse the error and return the response.
    $hashedPassword = Hash::make($newPassword);

    $user->password = $hashedPassword;

    $user->save();

    return response()->json(['message' => 'Password updated successfully']);
  }
}
