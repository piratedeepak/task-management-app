<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskList;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(TaskList $task_list)
    {
        $tasks = $task_list->tasks()->orderBy('id', 'desc')->get();

        return Inertia::render('Tasks/Index', compact('tasks', 'task_list'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(TaskList $task_list)
    {
        return Inertia::render('Tasks/Create', compact('task_list'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, TaskList $task_list)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'completed' => ['nullable', 'boolean'],
        ]);

        $task_list->tasks()->create([
            'name' => $request->input('name'),
            'completed' => $request->input('completed', false),
        ]);

        return redirect()->route('tasks.index', $task_list->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TaskList $task_list, Task $task)
    {
        return Inertia::render('Tasks/Edit', compact('task', 'task_list'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TaskList $task_list, Task $task, Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'completed' => ['nullable', 'boolean'],
        ]);

        $task->update([
            'name' => $request->input('name'),
            'completed' => $request->input('completed', false),
        ]);

        return redirect()->route('tasks.index', $task_list->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task, TaskList $task_list)
    {
        $task->delete();

        return redirect()->route('tasks.index', $task_list->id);
    }
}
