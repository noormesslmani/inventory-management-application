<?php

namespace App\Validators;

use App\Models\Product;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\ValidationException;
class ProductValidators
{
    public function validateAddProductRequest(Request $request){
        
            $validator = Validator::make($request->all(), [
                'type' => 'required|string|between:2,100',
                'description' => 'required|string|between:2,500',
                'base64_image' => 'string',
            ]);  
            if($validator->fails()){
                throw new ValidationException($validator);
            }  
            return $validator->validated();    
        
    }

    public function validateUpdateProductRequest(Request $request){
        
        $validator = Validator::make($request->all(), [
            'type' => 'string|between:2,100',
            'description' => 'string|between:2,500',
            'base64_image' => 'string',
        ]);  
        if($validator->fails()){
            throw new ValidationException($validator);
        }  
        return $validator->validated();    
    
}

}