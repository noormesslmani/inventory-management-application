<?php

namespace App\Validators;

use App\Models\User;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\ValidationException;
class ProfileValidators
{
    public function validateEditProfileRequest(Request $request){
        
        $validator = Validator::make($request->all(), [
            'first_name' => 'string|between:2,50',
            'last_name' => 'string|between:2,50',
            'base64_image' => 'string',
    
        ]);  
        if($validator->fails()){
            throw new ValidationException($validator);
        }  
        return $validator->validated();    
    }

    public function validateResetPasswordRequest(Request $request){
        
        $validator = Validator::make($request->all(), [
            'old_password' => 'required|string|min:8',
            'new_password' => 'required|string|min:8',
        ]);  
        if($validator->fails()){
            throw new ValidationException($validator);
        }  
        return $validator->validated();    
    
    }

 
}