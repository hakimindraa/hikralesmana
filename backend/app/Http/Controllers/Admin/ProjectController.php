<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json(Project::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|string',
            'video_url' => 'nullable|string',
            'category' => 'required|string',
            'client' => 'nullable|string',
            'date' => 'nullable|date'
        ]);

        // Normalize category: trim and capitalize first letter
        $validated['category'] = ucfirst(strtolower(trim($validated['category'])));

        $project = Project::create($validated);
        return response()->json($project, 201);
    }

    public function show($id)
    {
        $project = Project::findOrFail($id);
        return response()->json($project);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'image' => 'string',
            'video_url' => 'nullable|string',
            'category' => 'string',
            'client' => 'nullable|string',
            'date' => 'nullable|date'
        ]);

        // Normalize category: trim and capitalize first letter
        if (isset($validated['category'])) {
            $validated['category'] = ucfirst(strtolower(trim($validated['category'])));
        }

        $project->update($validated);
        return response()->json($project);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return response()->json(['message' => 'Project deleted successfully']);
    }
}
