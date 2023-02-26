<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\Builder;
use App\Services\UserService;
class UserService
{
    public function decodeImage(String $base_64): String
    {
        $image_64 = $base_64; 
        $code64 = explode(',', $image_64);
        $decoded_img = base64_decode($code64[1]);
        $extension = explode(";", explode('/', $code64[0])[1])[0];
        $path =  uniqid() . "." . $extension;
        file_put_contents('images/' . $path, $decoded_img);
        return $path;
    }

}

