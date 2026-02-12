<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BeforeAfter;
use Illuminate\Http\Request;

class BeforeAfterController extends Controller
{
    public function index()
    {
        return response()->json(BeforeAfter::orderBy('order')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'before_image' => 'required|string',
            'after_image' => 'required|string',
            'category' => 'required|string',
            'order' => 'nullable|integer'
        ]);

        $item = BeforeAfter::create($validated);
        return response()->json($item, 201);
    }

    public function show($id)
    {
        $item = BeforeAfter::findOrFail($id);
        return response()->json($item);
    }

    public function update(Request $request, $id)
    {
        $item = BeforeAfter::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'before_image' => 'string',
            'after_image' => 'string',
            'category' => 'string',
            'order' => 'nullable|integer'
        ]);

        $item->update($validated);
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = BeforeAfter::findOrFail($id);
        $item->delete();
        return response()->json(['message' => 'Before/After deleted successfully']);
    }
}
