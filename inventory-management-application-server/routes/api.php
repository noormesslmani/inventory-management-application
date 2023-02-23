<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ProductController;


Route::group(['prefix' => 'v1.0.0'], function () {
    Route::group(['prefix' => 'auth'], function ($router) {
        Route::post('/register', [AuthController::class, 'register']); 
        Route::post('/login', [AuthController::class, 'login']); 
    }); 

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('/products', [ProductController::class, 'getProductsByOwner']);
        Route::post('/product', [ProductController::class, 'addNewProduct']);
        Route::patch('/product/{id}', [ProductController::class, 'updateProduct']);
        Route::delete('/product/{id}', [ProductController::class, 'deleteProduct']);

        Route::get('/items/{product_id}', [ItemController::class, 'getItemsByProduct']);
        Route::post('/items', [ItemController::class, 'addNewItems']);
        Route::delete('/item/{id}', [ItemController::class, 'deleteItem']);
       
    });

});
