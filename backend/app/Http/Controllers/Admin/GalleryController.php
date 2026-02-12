<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index()
    {
        return response()->json(Gallery::orderBy('order')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|string',
            'category' => 'required|string',
            'order' => 'nullable|integer'
        ]);

        $gallery = Gallery::create($validated);
        return response()->json($gallery, 201);
    }

    public function show($id)
    {
        $gallery = Gallery::findOrFail($id);
        return response()->json($gallery);
    }

    public function update(Request $request, $id)
    {
        $gallery = Gallery::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'string|max:255',
            'image' => 'string',
            'category' => 'string',
            'order' => 'nullable|integer'
        ]);

        $gallery->update($validated);
        return response()->json($gallery);
    }

    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->delete();
        return response()->json(['message' => 'Gallery item deleted successfully']);
    }
}
