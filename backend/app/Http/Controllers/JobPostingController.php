<?php

namespace App\Http\Controllers;

use App\Models\JobPosting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class JobPostingController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        return JobPosting::latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string',
            'salary' => 'nullable|numeric',
            'type' => 'required|in:Full-Time,Part-Time,Contract,Internship',
            'deadline' => 'nullable|date',
        ]);

        $job = JobPosting::create(array_merge($validated, [
            'user_id' => Auth::id(),
        ]));

        return response()->json($job, 201);
    }

    public function show($id)
    {
        $job = JobPosting::find($id);

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        return response()->json($job);
    }


    public function update(Request $request, JobPosting $jobPosting)
    {
        if ($jobPosting->user_id !== Auth::id() && !Auth::user()->is_admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string',
            'salary' => 'nullable|numeric',
            'type' => 'required|in:Full-Time,Part-Time,Contract,Internship',
            'deadline' => 'nullable|date',
        ]);

        $jobPosting->update($validated);

        return response()->json($jobPosting);
    }

   public function destroy($id)
    {
        $job = JobPosting::find($id);

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        if ($job->delete()) {
            return response()->json(['message' => 'Job deleted successfully'], 200);
        }

        return response()->json(['message' => 'Failed to delete job'], 500);
    }


    

}
