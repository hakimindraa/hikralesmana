<?php

namespace App\Http\Controllers;

use App\Models\AboutSetting;

class AboutSettingController extends Controller
{
    public function index()
    {
        $about = AboutSetting::first();
        
        if (!$about) {
            return response()->json([
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
}
