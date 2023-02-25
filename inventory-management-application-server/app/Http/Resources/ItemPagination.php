<?php

namespace App\Http\Resources;
use App\Http\Resources\Item ;
use App\Http\Resources\ItemCollection;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemPagination extends JsonResource
{
    
    public function toArray($request)
    {
        return [
            'total_pages'=>$this->lastPage(),
            'current_page'=>$this->currentPage(),
            'items'=>$this->items()?new ItemCollection ($this->items()):[]
        ];
    }
}

