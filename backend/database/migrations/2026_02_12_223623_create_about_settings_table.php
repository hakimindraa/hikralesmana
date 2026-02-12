<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('about_settings', function (Blueprint $table) {
            $table->id();
            // About Section
            $table->string('subtitle')->default('ABOUT ME');
            $table->string('title')->default('Visual Artist');
            $table->string('description_1', 1000)->default('Saya adalah seorang photographer dan videographer yang passionate dalam menangkap momen-momen berharga dan mengubahnya menjadi karya visual yang bercerita.');
            $table->string('description_2', 1000)->default('Dengan keahlian dalam photo editing dan video editing, saya menciptakan konten visual yang tidak hanya indah dipandang, tetapi juga menyampaikan emosi dan pesan yang mendalam.');
            // Stats
            $table->string('stat_projects')->default('200+');
            $table->string('stat_projects_label')->default('Projects Completed');
            $table->string('stat_clients')->default('50+');
            $table->string('stat_clients_label')->default('Happy Clients');
            $table->string('stat_experience')->default('5+');
            $table->string('stat_experience_label')->default('Years Experience');
            $table->string('stat_awards')->default('12');
            $table->string('stat_awards_label')->default('Awards Won');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('about_settings');
    }
};
