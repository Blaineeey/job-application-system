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
            'type' => 'required|in:Full-Time,Part-Time,Internship',
            'deadline' => 'nullable|date',
        ]);

        $job = JobPosting::create([
            ...$validated,
            'user_id' => Auth::id(),
        ]);

        return response()->json($job, 201);
    }

    public function show(JobPosting $jobPosting)
    {
        return response()->json($jobPosting);
    }

    public function update(Request $request, JobPosting $jobPosting)
    {
        $this->authorize('update', $jobPosting);

        $jobPosting->update($request->only([
            'title', 'description', 'location', 'salary', 'type', 'status', 'deadline'
        ]));

        return response()->json($jobPosting);
    }

    public function destroy(JobPosting $jobPosting)
    {
        $this->authorize('delete', $jobPosting);
        $jobPosting->delete();

        return response()->json(['message' => 'Job deleted']);
    }
}
