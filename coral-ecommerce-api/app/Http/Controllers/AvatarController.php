<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AvatarController extends Controller
{
  public function upload(Request $request): string
  {
    $user = $request->user();

    $path = $request->file('avatar')->store('avatars');

    $user->avatar = $path;

    $user->save();

    return $path;
  }
}
