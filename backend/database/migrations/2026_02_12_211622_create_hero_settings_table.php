<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hero_settings', function (Blueprint $table) {
            $table->id();
            $table->string('subtitle')->default('VISUAL STORYTELLER');
            $table->string('title_line1')->default('Photography');
            $table->string('title_line2')->default('& Videography');
            $table->string('description', 500)->default('Capturing moments, crafting stories through the lens');
            $table->string('button1_text')->default('VIEW WORK');
            $table->string('button1_link')->default('/#projects');
            $table->string('button2_text')->default('GET IN TOUCH');
            $table->string('button2_link')->default('/#contact');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_settings');
    }
};
