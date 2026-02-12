<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\BeforeAfterController;
use App\Http\Controllers\HeroSettingController;
use App\Http\Controllers\AboutSettingController;
use App\Http\Controllers\Admin\AuthController;

// Public API Routes
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);

Route::get('/skills', [SkillController::class, 'index']);

Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/testimonials/{id}', [TestimonialController::class, 'show']);

Route::get('/gallery', [GalleryController::class, 'index']);
Route::get('/gallery/{id}', [GalleryController::class, 'show']);

Route::get('/before-after', [BeforeAfterController::class, 'index']);
Route::get('/before-after/{id}', [BeforeAfterController::class, 'show']);

Route::get('/hero-settings', [HeroSettingController::class, 'index']);
Route::get('/about-settings', [AboutSettingController::class, 'index']);

Route::post('/contact', [ContactController::class, 'store']);

// Admin Auth Routes
Route::post('/admin/login', [AuthController::class, 'login']);
Route::post('/admin/logout', [AuthController::class, 'logout']);
Route::get('/admin/me', [AuthController::class, 'me']);

// Admin CRUD Routes (For now, without authentication middleware for testing)
Route::prefix('admin')->group(function () {
    Route::post('upload', [\App\Http\Controllers\Admin\UploadController::class, 'upload']);
    Route::apiResource('projects', \App\Http\Controllers\Admin\ProjectController::class);
    Route::apiResource('skills', \App\Http\Controllers\Admin\SkillController::class);
    Route::apiResource('testimonials', \App\Http\Controllers\Admin\TestimonialController::class);
    Route::apiResource('gallery', \App\Http\Controllers\Admin\GalleryController::class);
    Route::apiResource('before-after', \App\Http\Controllers\Admin\BeforeAfterController::class);
    Route::apiResource('contacts', \App\Http\Controllers\Admin\ContactController::class)->only(['index', 'show', 'destroy']);
    
    Route::get('hero-settings', [\App\Http\Controllers\Admin\HeroSettingController::class, 'index']);
    Route::put('hero-settings', [\App\Http\Controllers\Admin\HeroSettingController::class, 'update']);
    
    Route::get('about-settings', [\App\Http\Controllers\Admin\AboutSettingController::class, 'index']);
    Route::put('about-settings', [\App\Http\Controllers\Admin\AboutSettingController::class, 'update']);
});
