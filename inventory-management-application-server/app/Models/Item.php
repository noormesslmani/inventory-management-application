<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use App\Models\Item;
use App\Models\Product;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Item extends Model
{
    use HasFactory;
    protected $fillable = [
        'serial_number',
        'is_sold',
        'product_id',
    ];


    public static function createACollectionOfItems($items, $product_id): void
    {
        try {
            foreach($items as $serial_number){
                self::create(
                    [
                    'serial_number'=>  $serial_number,
                    'is_sold' => false,
                    'product_id'=>$product_id,
                    ]
                );
            }
          
        } catch (Exception $e) {
            throw new Exception( $e->getMessage());
        }
    }

    public static function updateItem($validated, $item): self
    {
        try {
            $item->fill($validated,);
            $item->save();
            return $item;
        } catch (Exception $e) {
            throw new Exception( $e->getMessage());
        }
    }

    public function product(){
        return $this->belongsTo(Product::class, 'product_id');
    }
}
