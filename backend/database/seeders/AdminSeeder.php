<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Delete existing admin if exists
        User::where('email', 'admin@visual.com')->delete();
        
        // Create new admin
        User::create([
            'name' => 'Admin',
            'email' => 'admin@visual.com',
            'password' => Hash::make('admin123')
        ]);
        
        echo "Admin user created successfully!\n";
        echo "Email: admin@visual.com\n";
        echo "Password: admin123\n";
    }
}
