<?php

namespace App\Validators;

use App\Models\User;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Validation\ValidationException;
class AuthValidators
{
    public function validateRegisterRequest(Request $request){
        
            $validator = Validator::make($request->all(), [
                'first_name' => 'required|string|between:2,50',
                'last_name' => 'required|string|between:2,50',
                'email' => 'required|string|email|max:100|unique:users',
                'password' => 'required|string|min:8',
            ]);  
            if($validator->fails()){
                throw new ValidationException($validator);
            }  
            return $validator->validated();    
        
    }

    public function validateLoginRequest(Request $request){
        
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);  
        if($validator->fails()){
            throw new ValidationException($validator);
        }  
        return $validator->validated();    
    
    }
}