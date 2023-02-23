<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Services\UserService;
use App\Validators\AuthValidators;
use Illuminate\Validation\ValidationException;
use JWTAuth;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{



    public function register(Request $request){
        try {

            $authValidators = new AuthValidators();
            $validated = $authValidators-> validateRegisterRequest($request);
        
            $newUser= User::createUser(
                $validated, 
                $request->password, 
            );

            return response()->json([
                'status' => 'success',
            ], 201);
        } 
        catch (ValidationException $e) {
            return response()->json($e->errors(), 422);
        }
        catch (Exception $e) {
            return response()->json($e->errors(), 500);
        }  
        
    }

    public function login(Request $request){
        try {

            $authValidators = new AuthValidators();
            $validated = $authValidators-> validateLoginRequest($request);
        
            if (! $token = auth()->attempt($validated)) {
                return response()->json(['status' => 'fail','message' => 'Unauthorized'], 401);
            }

            return response()->json([
                'status' => 'success',
                'user' => Auth::user(),
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ], 200);
        } 
        catch (ValidationException $e) {
            return response()->json($e->errors(), 422);
        }
        catch (Exception $e) {
            return response()->json($e->errors(), 500);
        }  
        
    }

    

}
