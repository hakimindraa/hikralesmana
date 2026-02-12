<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    public function index()
    {
        return response()->json(Skill::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'level' => 'required|integer|min:0|max:100'
        ]);

        $skill = Skill::create($validated);
        return response()->json($skill, 201);
    }

    public function show($id)
    {
        $skill = Skill::findOrFail($id);
        return response()->json($skill);
    }

    public function update(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'string|max:255',
            'category' => 'string',
            'level' => 'integer|min:0|max:100'
        ]);

        $skill->update($validated);
        return response()->json($skill);
    }

    public function destroy($id)
    {
        $skill = Skill::findOrFail($id);
        $skill->delete();
        return response()->json(['message' => 'Skill deleted successfully']);
    }
}
