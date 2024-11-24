<?php

use App\Enums\TaskList\SharePermission;
use App\Models\TaskList;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('task_list_shares', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(TaskList::class)->constrained();
            $table->foreignId('shared_with_user_id')->constrained('users')->onDelete('cascade');
            $table->enum('permission', array_column(SharePermission::cases(), 'value'));
            $table->foreignId('shared_by_user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task_list_shares');
    }
};
