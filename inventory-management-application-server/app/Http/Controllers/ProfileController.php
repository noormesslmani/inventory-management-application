<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Validators\ProfileValidators;
use App\Services\UserService;
use Illuminate\Support\Facades\Hash;
class ProfileController extends Controller
{
    public function editProfile(Request $request){
        try {
            //validate request
            $profileValidators = new ProfileValidators();
            $validated = $profileValidators-> validateEditProfileRequest($request);

            //check if an image is sent in the request
            if($request->base64_image ){
                $userService= new UserService();
                $image_path= $userService->decodeImage($request->base64_image);

            }
            else $image_path=null;
            
        
            if ($image_path) {
                $validated['profile_picture'] = $image_path;
            }
            Auth::user()->update($validated);

            return response()->json([
                'status' => 'success',
                'data'=> Auth::user()
            ], 200);
        } 
        catch (ValidationException $e) {
            return response()->json(['status' => 'fail','message' => 'Unprocessable Input '], 422);
        }
        catch (Exception $e) {
            return response()->json(['status' => 'fail','message' => 'Somethig Went Wrong'], 500);
        }
        
    }

    public function changePassword(Request $request){
        try {
            //validate request
            $profileValidators = new ProfileValidators();
            $validated = $profileValidators-> validateResetPasswordRequest($request);
          
            //check if old password matches user's password
            if(Hash::check($request->old_password, Auth::user()->password)){
             
                Auth::user()->update([
                    'password' => bcrypt($request->new_password)
                ]);
                return response()->json([
                    'status' => 'success',
                ], 200);
            }
            
            //failing to match password
            return response()->json(['status' => 'fail','message' => 'You entered a wrong password'], 401);
            
        } 
        catch (ValidationException $e) {
            return response()->json(['status' => 'fail','message' => 'Invalid input data'], 422);
        }
        catch (Exception $e) {
            return response()->json(['status' => 'fail','message' => 'Somethig Went Wrong'], 500);
        }
        
    }

}
