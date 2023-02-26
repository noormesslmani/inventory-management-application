<?php

namespace App\Models;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'profile_picture',
    ];

    
    protected $hidden = [
        'password'
    ];

 
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public static function createUser($validated, $password): self
    {
        try {
            return self::create(array_merge(
                $validated,
                ['password' => bcrypt($password),
                'profile_picture'=>'no-profile.png',
                ]
            ));
        } catch (Exception $e) {
            throw new Exception( $e->getMessage());
        }
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'owner_id');
    }


}
