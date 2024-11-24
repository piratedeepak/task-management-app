<?php

namespace App\Http\Controllers;

use App\Enums\TaskList\SharePermission;
use App\Http\Requests\TaskList\TaskListShareRequest;
use App\Models\TaskList;
use App\Models\TaskListShare;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $taskLists = TaskList::with('sharedWithUsers')->where(function ($query) {
            $query->where('user_id', Auth::user()->id)
                ->orWhereHas('sharedWithUsers', function ($query) {
                    $query->where('shared_with_user_id', Auth::user()->id);
                });
        })->get();

        return Inertia::render('TaskLists/Index', compact('taskLists'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('TaskLists/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        TaskList::create([
            'name' => $request->name,
            'user_id' => Auth::user()->id,
        ]);

        return redirect()->route('task_lists.index');
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
    public function edit(string $id)
    {
        $taskList = TaskList::findOrFail($id);

        return Inertia::render('TaskLists/Edit', compact('taskList'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $taskList = TaskList::findOrFail($id);
        $taskList->name = $request->name;
        $taskList->save();

        return redirect()->route('task_lists.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        TaskList::findOrFail($id)->delete();

        return redirect()->route('task_lists.index');
    }

    public function share(TaskListShareRequest $request)
    {
        $taskList = TaskList::findOrFail($request->task_list_id);
        $user = User::where('email', $request->email)->first();

        if ($user->email === Auth::user()->email) {
            return redirect()->back()->withErrors(['email' => 'You can not share with your self.']);
        }

        $taskListShare = TaskListShare::where('task_list_id', $taskList->id)
            ->where('shared_with_user_id', $user->id)
            ->first();

        if ($taskListShare) {
            return redirect()->back()->withErrors(['email' => 'This user is already shared with this task list.']);
        }

        $taskListShare = TaskListShare::create([
            'task_list_id' => $taskList->id,
            'shared_with_user_id' => $user->id,
            'shared_by_user_id' => Auth::user()->id,
            'permission' => SharePermission::EDIT->value,
        ]);
        if ($taskListShare) {
            return redirect()->route('task_lists.index');
        }
    }
}
