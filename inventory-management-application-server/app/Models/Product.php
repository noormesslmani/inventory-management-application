<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;
use App\Models\Item;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\ModelNotFoundException;
class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'type',
        'image',
        'description',
        'owner_id',
    ];

    public static function queryProductsByOwner($owner_id): Collection
    {
        try {
            return self::where('owner_id', $owner_id)
            ->withCount('unsoldItems')
            ->get();
          
        } catch (Exception $e) {
            throw new Exception( $e->getMessage());
        }
    }

    public static function createProduct($validated, $id, $image_path): self
    {
        try {
            return self::create(array_merge(
                $validated,
                ['owner_id' => $id,
                'image'=>$image_path,
                ]
            ));
        } catch (Exception $e) {
            throw new Exception( $e->getMessage());
        }
    }

    public static function updateProduct($validated, $id, $image_path=null): self
    {
        try {
            $product= self::find($id);
            if (!$product) {
                throw new ModelNotFoundException( $e->getMessage());
            }
            $product->fill(array_merge(
                $validated,
                [
                    $image_path ? ['image' => $image_path] : []
                ]
            ));
            $product->save();
            return $product;
        } catch (Exception $e) {
            throw new Exception( $e->getMessage());
        }
    }

    public function items(): HasMany
    {
        return $this->hasMany(Item::class, 'product_id');
    }

    public function unsoldItems(): HasMany
    {
        return $this->hasMany(Item::class, 'product_id')->where('is_sold', false);

    }

    

}
