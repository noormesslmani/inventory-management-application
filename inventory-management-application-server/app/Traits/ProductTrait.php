<?php

namespace App\Traits;
use App\Models\User;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use App\Exceptions\ActionForbiddenException;
use App\Exceptions\ConflictException;
trait ProductTrait
{
    public function authorizeProduct($id)
    {
        if(! Auth::User()->products()->where('id',$id)->exists()){
            throw new ActionForbiddenException;
        }
    }

    public function checkExistingProductType($type)
    {
        if(Auth::User()->products()->where('type',$type)->exists()){
            throw new ConflictException;
           
        }
    }
}
