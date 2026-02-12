<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:5120' // 5MB max
        ]);

        try {
            // Set Cloudinary URL from env
            putenv('CLOUDINARY_URL=' . env('CLOUDINARY_URL'));
            
            $uploadedFile = $request->file('image');
            
            // Upload using Cloudinary URL
            $result = \Cloudinary\Uploader::upload($uploadedFile->getRealPath(), [
                'folder' => 'portfolio',
                'transformation' => [
                    ['width' => 1200, 'height' => 800, 'crop' => 'limit'],
                    ['quality' => 'auto']
                ]
            ]);

            return response()->json([
                'success' => true,
                'url' => $result['secure_url']
            ]);
        } catch (\Exception $e) {
            \Log::error('Cloudinary upload error: ' . $e->getMessage());
            \Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'success' => false,
                'message' => 'Upload failed: ' . $e->getMessage()
            ], 500);
        }
    }
}
