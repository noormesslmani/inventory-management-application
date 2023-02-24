<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ItemCollection extends ResourceCollection
{
    
    public function toArray($request)
    {
        $items = $this->collection;
        return [
            'items' => $this->collection,
            'product'=>$items[0]->product()
        ];
    }

}
