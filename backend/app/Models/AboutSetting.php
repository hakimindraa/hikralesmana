<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutSetting extends Model
{
    protected $fillable = [
        'subtitle', 'title', 'description_1', 'description_2',
        'stat_projects', 'stat_projects_label',
        'stat_clients', 'stat_clients_label',
        'stat_experience', 'stat_experience_label',
        'stat_awards', 'stat_awards_label'
    ];
}
