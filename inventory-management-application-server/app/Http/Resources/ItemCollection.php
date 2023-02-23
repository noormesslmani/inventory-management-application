<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ItemCollection extends ResourceCollection
{
    
    public function toArray($request)
    {
        return [
            'items' => $this->collection,
            'product'=>$this->collection->first()->product
        ];
    }

}
