<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TaskList extends Model
{
    protected $guarded = [];

    public function Tasks()
    {
        return $this->hasMany(Task::class, 'task_list_id');
    }

    public function sharedWithUsers()
    {
        return $this->belongsToMany(User::class, 'task_list_shares', 'task_list_id', 'shared_with_user_id')
            ->withPivot('permission', 'shared_by_user_id');
    }
}
