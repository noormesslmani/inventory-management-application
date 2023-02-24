<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Product extends JsonResource
{
  
    public function toArray($request) : array
    {
        return [
            'id' => $this->id,
            'type'=>$this->type,
            'description'=>$this->description,
            'image'=>$this->image,
            'count'=>$this->unsold_items_count??$this->unsoldItems()->count(),
        ];
    }
}
