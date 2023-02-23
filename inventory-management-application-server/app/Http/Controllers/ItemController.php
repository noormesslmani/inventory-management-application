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
class ItemController extends Controller
{
    use ProductTrait;
    public function getItemsByProduct($product_id){
        
        try {
            $product = Product::find($product_id);

            if (!$product) {
                return response()->json(['status' => 'fail','message' => 'Product not found'], 404);
            }

            $this->authorizeProduct($product_id);

            $items= Item:: queryItemsByProduct($product_id);

            

            return response()->json([
                'status' => 'success',
                'data'=>new ItemCollection($items),
            ], 200);
        } 
        catch (ActionForbiddenException $e) {
            return response()->json(['status' => 'fail','message' => 'Action forbidden'], 403);
        } 
        catch (Exception $e) {
            return response()->json($e->errors(), 500);
        }  
    }

    public function addNewItems(Request $request){
        
        try {
            $itemValidators = new ItemValidators();
            $validated = $itemValidators-> validateAddItemsRequest($request);
            
            $product_id=$request->product_id;
            $product = Product::find($product_id);

            if (!$product) {
                return response()->json(['status' => 'fail','message' => 'Product not found'], 404);
            }

            $this->authorizeProduct($product_id);

            Item::createACollectionOfItems($request->items, $product_id);

            return response()->json([
                'status' => 'success',
            ], 201);
        } 
        catch (ValidationException $e) {
            return response()->json($e->errors(), 422);
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

            $item = Item::find($id);

            if (!$item) {
                return response()->json(['status' => 'fail','message' => 'Item not found'], 404);
            }

            $this->authorizeProduct($item->product_id);

            $item->delete();


            return response()->json([
                'status' => 'success',
                'message' => 'Product deleted',
            ], 200);
        } 
        catch (ActionForbiddenException $e) {
            return response()->json(['status' => 'fail','message' => 'Action forbidden'], 403);
        }
        catch (Exception $e) {
            return response()->json($e->errors(), 500);
        } 
    }
}
