<?php

namespace App\Http\Controllers;

use App\Models\HeroSetting;
use Illuminate\Http\Request;

class HeroSettingController extends Controller
{
    public function index()
    {
        // Get first (and only) hero setting, or return defaults
        $hero = HeroSetting::first();
        
        if (!$hero) {
            return response()->json([
                'subtitle' => 'VISUAL STORYTELLER',
                'title_line1' => 'Photography',
                'title_line2' => '& Videography',
                'description' => 'Capturing moments, crafting stories through the lens',
                'button1_text' => 'VIEW WORK',
                'button1_link' => '/#projects',
                'button2_text' => 'GET IN TOUCH',
                'button2_link' => '/#contact'
            ]);
        }
        
        return response()->json($hero);
    }
}
