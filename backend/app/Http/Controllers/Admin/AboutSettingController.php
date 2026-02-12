<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutSetting;
use Illuminate\Http\Request;

class AboutSettingController extends Controller
{
    public function index()
    {
        $about = AboutSetting::first();
        
        if (!$about) {
            $about = AboutSetting::create([
                'subtitle' => 'ABOUT ME',
                'title' => 'Visual Artist',
                'description_1' => 'Saya adalah seorang photographer dan videographer yang passionate dalam menangkap momen-momen berharga dan mengubahnya menjadi karya visual yang bercerita.',
                'description_2' => 'Dengan keahlian dalam photo editing dan video editing, saya menciptakan konten visual yang tidak hanya indah dipandang, tetapi juga menyampaikan emosi dan pesan yang mendalam.',
                'stat_projects' => '200+',
                'stat_projects_label' => 'Projects Completed',
                'stat_clients' => '50+',
                'stat_clients_label' => 'Happy Clients',
                'stat_experience' => '5+',
                'stat_experience_label' => 'Years Experience',
                'stat_awards' => '12',
                'stat_awards_label' => 'Awards Won'
            ]);
        }
        
        return response()->json($about);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'subtitle' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description_1' => 'required|string|max:1000',
            'description_2' => 'required|string|max:1000',
            'stat_projects' => 'required|string|max:50',
            'stat_projects_label' => 'required|string|max:255',
            'stat_clients' => 'required|string|max:50',
            'stat_clients_label' => 'required|string|max:255',
            'stat_experience' => 'required|string|max:50',
            'stat_experience_label' => 'required|string|max:255',
            'stat_awards' => 'required|string|max:50',
            'stat_awards_label' => 'required|string|max:255'
        ]);

        $about = AboutSetting::first();
        
        if (!$about) {
            $about = AboutSetting::create($validated);
        } else {
            $about->update($validated);
        }
        
        return response()->json($about);
    }
}
