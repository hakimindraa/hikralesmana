<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BeforeAfter extends Model
{
    protected $table = 'before_after';
    
    protected $fillable = [
        'title',
        'description',
        'before_image',
        'after_image',
        'category',
        'order'
    ];
}
