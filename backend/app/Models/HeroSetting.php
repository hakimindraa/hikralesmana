<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'subtitle',
        'title_line1',
        'title_line2',
        'description',
        'button1_text',
        'button1_link',
        'button2_text',
        'button2_link'
    ];
}
