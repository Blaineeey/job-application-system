<?php

namespace App\Policies;

use App\Models\JobPosting;
use App\Models\User;

class JobPostingPolicy
{
    public function viewAny(User $user): bool
    {
        return true; // Allow all authenticated users to view job listings
    }

    public function view(User $user, JobPosting $jobPosting): bool
    {
        return true; // Allow all authenticated users to view a job
    }

    public function create(User $user): bool
    {
        return $user->role === 'admin';
    }

    public function update(User $user, JobPosting $jobPosting): bool
    {
        return $user->role === 'admin';
    }

    public function delete(User $user, JobPosting $jobPosting): bool
    {
        return $user->role === 'admin';
    }

    public function restore(User $user, JobPosting $jobPosting): bool
    {
        return false;
    }

    public function forceDelete(User $user, JobPosting $jobPosting): bool
    {
        return false;
    }
}
