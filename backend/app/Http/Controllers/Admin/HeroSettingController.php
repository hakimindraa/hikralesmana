<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSetting;
use Illuminate\Http\Request;

class HeroSettingController extends Controller
{
    public function index()
    {
        $hero = HeroSetting::first();
        
        if (!$hero) {
            // Create default if not exists
            $hero = HeroSetting::create([
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

    public function update(Request $request)
    {
        $validated = $request->validate([
            'subtitle' => 'required|string|max:255',
            'title_line1' => 'required|string|max:255',
            'title_line2' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'button1_text' => 'required|string|max:255',
            'button1_link' => 'required|string|max:255',
            'button2_text' => 'required|string|max:255',
            'button2_link' => 'required|string|max:255'
        ]);

        $hero = HeroSetting::first();
        
        if (!$hero) {
            $hero = HeroSetting::create($validated);
        } else {
            $hero->update($validated);
        }
        
        return response()->json($hero);
    }
}
