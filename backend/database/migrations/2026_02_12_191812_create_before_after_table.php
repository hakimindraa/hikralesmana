<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('before_after', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('before_image');
            $table->string('after_image');
            $table->string('category')->default('Portrait');
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('before_after');
    }
};
