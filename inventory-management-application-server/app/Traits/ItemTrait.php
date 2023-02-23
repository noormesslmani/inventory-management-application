<?php

namespace App\Traits;
use App\Models\Item;
use Illuminate\Support\Facades\Auth;
use App\Exceptions\ActionForbiddenException;
use App\Exceptions\ConflictException;
use App\Exceptions\NotFoundException;
trait ItemTrait
{
   
    public function findItem($id)
    {
        $item = Item::find($id);
        if (!$item) {
            throw new NotFoundException;
        }
        return $item;
    }

}