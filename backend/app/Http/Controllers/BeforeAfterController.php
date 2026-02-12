<?php

namespace App\Http\Controllers;

use App\Models\BeforeAfter;

class BeforeAfterController extends Controller
{
    public function index()
    {
        return response()->json(BeforeAfter::orderBy('order')->get());
    }

    public function show($id)
    {
        $item = BeforeAfter::findOrFail($id);
        return response()->json($item);
    }
}
