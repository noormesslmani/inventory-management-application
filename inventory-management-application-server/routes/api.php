<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;

Route::group(['prefix' => 'v1.0.0'], function () {
    Route::group(['prefix' => 'auth'], function ($router) {
        Route::post('/register', [AuthController::class, 'register']); 
        Route::post('/login', [AuthController::class, 'login']); 

        Route::group(['middleware' => 'auth:api'], function () {
            Route::get('/logout', [AuthController::class, 'logout']);
        });
    }); 

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('/products', [ProductController::class, 'getProductsByOwner']);
        Route::get('/searched-products', [ProductController::class, 'searchProductsByType']);
        Route::post('/product', [ProductController::class, 'addNewProduct']);
        Route::patch('/product/{id}', [ProductController::class, 'updateProduct']);
        Route::delete('/product/{id}', [ProductController::class, 'deleteProduct']);

        Route::get('/searched-items/{product_id}', [ItemController::class, 'searchItemsBySerialNumber']);
        Route::get('/items/{product_id}', [ItemController::class, 'getItemsByProduct']);
        Route::post('/items', [ItemController::class, 'addNewItems']);
        Route::delete('/item/{id}', [ItemController::class, 'deleteItem']);
        Route::patch('/item/{id}', [ItemController::class, 'updateItem']);

        Route::patch('/profile', [ProfileController::class, 'editProfile']);
        Route::patch('/password', [ProfileController::class, 'changePassword']);

        
       
    });

});
