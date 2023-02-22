<?php

namespace Database\Seeders;
use App\Models\Model;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{

    public function run()
    {
        $product = new Product;
        $product->type = 'Leather Jacket';
        $product->image = '753e91b62fab2.png';
        $product->description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
        $product->owner_id=1;
        $product->save();

        $product = new Product;
        $product->type = 'Dior Purse';
        $product->image = '635e91c47fab2.png';
        $product->description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
        $product->owner_id=1;
        $product->save();

        $product = new Product;
        $product->type = 'Barbie Doll';
        $product->image = '635e46c62fc85.png';
        $product->description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
        $product->owner_id=2;
        $product->save();

        $product = new Product;
        $product->type = 'The LEGO Movie';
        $product->image = '635e91b62fc13.png';
        $product->description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
        $product->owner_id=2;
        $product->save();

        $product = new Product;
        $product->type = 'LEGO City Fire Rescue Helicopter';
        $product->image = '635e91b62fc85.png';
        $product->description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
        $product->owner_id=2;
        $product->save();

        $product = new Product;
        $product->type = 'Themal Coffee Mug';
        $product->image = '635e91b62fc59.png';
        $product->description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
        $product->owner_id=3;
        $product->save();

        $product = new Product;
        $product->type = 'Backpack';
        $product->image = '753e45b62fab2.png';
        $product->description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
        $product->owner_id=3;
        $product->save();


    }
}
