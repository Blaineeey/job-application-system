<?php

namespace Database\Factories;

use App\Models\JobPosting;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobPostingFactory extends Factory
{
    protected $model = JobPosting::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // or a static user_id if preferred
            'title' => $this->faker->jobTitle(),
            'description' => $this->faker->paragraph(5),
            'location' => $this->faker->city(),
            'salary' => $this->faker->randomFloat(2, 30000, 150000),
            'type' => $this->faker->randomElement(['Full-Time', 'Part-Time', 'Contract', 'Internship']),
            'deadline' => $this->faker->dateTimeBetween('now', '+3 months'),
        ];
    }
}
