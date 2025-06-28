<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobPosting extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'location', 'salary', 'type', 'deadline', 'user_id',
    ];
}
