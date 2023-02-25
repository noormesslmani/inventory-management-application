<?php

namespace App\Http\Resources;
use App\Http\Resources\Product ;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductPagination extends JsonResource
{
    
    public function toArray($request)
    {
        return [
            'total_pages'=>$this->lastPage(),
            'current_page'=>$this->currentPage(),
            'products'=>$this->items()?Product:: collection($this->items()):[]
        ];
    }
}
