<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Product;
use App\Models\Item;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Exceptions\ActionForbiddenException;
use App\Exceptions\ConflictException;
use JWTAuth;
use App\Http\Resources\ItemCollection;
use App\Validators\ItemValidators;
use App\Traits\ProductTrait;
use App\Traits\ItemTrait;
use App\Exceptions\NotFoundException;
class ItemController extends Controller
{
    use ProductTrait, ItemTrait;
    public function getItemsByProduct($product_id){
        
        try {
            //check if product exits in the database
            $product=$this->findProduct($product_id);

            //check if user is authorized to have access to the product
            $this->authorizeProduct($product_id);

            //query collections of items coressponding to current product
            $items= Item:: queryItemsByProduct($product_id);


            return response()->json([
                'status' => 'success',
                'data'=>new ItemCollection($items),
            ], 200);
        } 
        catch (ActionForbiddenException $e) {
            return response()->json(['status' => 'fail','message' => 'Action forbidden'], 403);
        } 
        catch (NotFoundException $e) {
            return response()->json(['status' => 'fail','message' => 'Product not found'], 404);
        } 
        catch (Exception $e) {
            return response()->json($e->errors(), 500);
        }  
    }

    public function addNewItems(Request $request){
        
        try {
            //validate request
            $itemValidators = new ItemValidators();
            $validated = $itemValidators-> validateAddItemsRequest($request);
            
            
            $product_id=$request->product_id;

            //check if product exits in the database
            $product=$this->findProduct($product_id);

            //check if user is authorized to have access to the product
            $this->authorizeProduct($product_id);

            //create the requestion collection of items 
            Item::createACollectionOfItems($request->items, $product_id);

            return response()->json([
                'status' => 'success',
            ], 201);
        } 
        catch (ValidationException $e) {
            return response()->json($e->errors(), 422);
        }
        catch (NotFoundException $e) {
            return response()->json(['status' => 'fail','message' => 'Product not found'], 404);
        } 
        catch (ActionForbiddenException $e) {
            return response()->json(['status' => 'fail','message' => 'Action forbidden'], 403);
        }
        catch (Exception $e) {
            return response()->json($e->errors(), 500);
        }  
    }

    public function deleteItem($id){
        try {

            //check if item exits in the database
            $item=$this->findItem($id);

            //check if user is authorized to delete the item
            $this->authorizeProduct($item->product_id);

            //delete the item
            $item->delete();


            return response()->json([
                'status' => 'success',
                'message' => 'Product deleted',
            ], 200);
        } 
        catch (ActionForbiddenException $e) {
            return response()->json(['status' => 'fail','message' => 'Action forbidden'], 403);
        }
        catch (NotFoundException $e) {
            return response()->json(['status' => 'fail','message' => 'Product not found'], 404);
        } 
        catch (Exception $e) {
            return response()->json($e->errors(), 500);
        } 
    }
}
