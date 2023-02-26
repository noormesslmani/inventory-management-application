<?php

namespace App\Validators;

use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\ValidationException;
class ItemValidators
{
    public function validateAddItemsRequest(Request $request){
        
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|integer',
            'items' => 'required|array',
            'items.*' => 'string|min:10', 
        ]);
        if($validator->fails()){
            throw new ValidationException($validator);
        }  
        return $validator->validated();     
    }

    public function validateUpdateItemsRequest(Request $request){
        
        $validator = Validator::make($request->all(), [
            'serial_number' => 'string|min:10',
            'is_sold' => 'boolean', 
        ]);
        if($validator->fails()){
            throw new ValidationException($validator);
        }  
        return $validator->validated();     
    }

}