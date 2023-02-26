<?php

namespace Database\Factories;
use App\Models\Product;
use App\Models\Item;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
 
    public function definition()
    {
        $productIds = Product::pluck('id');

        return [
            "serial_number"=> $this->faker->regexify('[0-9]{5}[A-Z]{2}[0-9]{5}[A-Z]{2}'),
            "is_sold"=>$this->faker->randomElement([true, false]),
            "product_id"=>$this->faker->randomElement($productIds),
        ];
    }
}
