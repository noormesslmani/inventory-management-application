<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Product;
use App\Services\UserService;
use App\Validators\ProductValidators;
use Illuminate\Validation\ValidationException;
use App\Exceptions\ActionForbiddenException;
use App\Exceptions\ConflictException;
use JWTAuth;
use App\Exceptions\NotFoundException;
use App\Http\Resources\Product as ProductResource;
use App\Http\Resources\ProductPagination ;
use App\Traits\ProductTrait;


class ProductController extends Controller
{
    use ProductTrait;

    public function getProductsByOwner(){
        
        try {
            $products= Auth::user()
            ->products()
            ->withCount('unsoldItems')
            ->latest()
            ->paginate(10);


            
            return response()->json([
                'status' => 'success',
                'data'=>new ProductPagination($products),
            ], 200);
        } 
      
        catch (Exception $e) {
            return response()->json(['status' => 'fail','message' => 'Somethig Went Wrong'], 500);
        }  
    }

    public function addNewProduct(Request $request){
        try {
            //validate request
            $productValidators = new ProductValidators();
            $validated = $productValidators-> validateAddProductRequest($request);
          
            if($request->base64_image !=''){
                $userService= new UserService();
                $image_path= $userService->decodeImage($request->base64_image);
            }
            else{
                $image_path='no-image.png';
            }

            //check if product type already exists for current user
            $this->checkExistingProductType($request->type);

            

            //create a new product
            $newProduct= Product::createProduct(
                $validated, 
                Auth::User()->id, 
                $image_path
            );

            return response()->json([
                'status' => 'success',
                'data'=>new ProductResource($newProduct),
            ], 200);
        } 
        catch (ValidationException $e) {
            return response()->json(['status' => 'fail','message' => 'Invalid input data '], 422);
        }
        catch (ConflictException $e) {
            return response()->json(['status' => 'fail','message' => 'Product type already exist'], 409);
        }
        catch (Exception $e) {
            return response()->json(['status' => 'fail','message' => 'Somethig Went Wrong'], 500);
        } 
    }

    public function updateProduct(Request $request, $id){
        
        try {
            //validate request
            $productValidators = new ProductValidators();
            $validated = $productValidators-> validateUpdateProductRequest($request);

            //check if product exits in the database
            $product=$this->findProduct($id);

            //check if user is authorized to update the product
            $this->authorizeProduct($id);
            
            //check if requested type alreay exists for current user
            if($request->type)
                $this->checkExistingProductType($request->type);

            

            if($request->base64_image ){
                $userService= new UserService();
                $image_path= $userService->decodeImage($request->base64_image);

            }
            else $image_path=null;
            
            //update the product
            if ($image_path) {
                $validated['image'] = $image_path;
            }
            $product->update($validated);

            return response()->json([
                'status' => 'success',
                'data'=> new ProductResource($product)
            ], 200);
        } 
        catch (ValidationException $e) {
            return response()->json(['status' => 'fail','message' => 'Invalid input data '], 422);
        }
        catch (ActionForbiddenException $e) {
            return response()->json(['status' => 'fail','message' => 'Action forbidden'], 403);
        }
        catch (NotFoundException $e) {
            return response()->json(['status' => 'fail','message' => 'Product not found'], 404);
        }
        catch (ConflictException $e) {
            return response()->json(['status' => 'fail','message' => 'Product type already exist'], 409);
        }
        catch (Exception $e) {
            return response()->json(['status' => 'fail','message' => 'Somethig Went Wrong'], 500);
        }  
    }

    public function deleteProduct($id){
        try {
            //check if product exits in the database
            $product=$this->findProduct($id);

            //check if user is authorized to update the product
            $this->authorizeProduct($id);

            //delete product
            $product->delete();


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
            return response()->json(['status' => 'fail','message' => 'Somethig Went Wrong'], 500);
        }

    }

    public function searchProductsByType(Request $request){
        try{
            $type=$request->query('type');

            $products=Auth::user()
            ->products()
            ->withCount('unsoldItems')
            ->where('type', 'LIKE', '%'.$type.'%')
            ->latest()
            ->paginate(10);

            return response()->json([
                'status' => 'success',
                'data' => new ProductPagination($products),
            ], 200);
        }
        catch (Exception $e) {
            return response()->json(['status' => 'fail','message' => 'Somethig Went Wrong'], 500);
        }
        
    }

    
}
