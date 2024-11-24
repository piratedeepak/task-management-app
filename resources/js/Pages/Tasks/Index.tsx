import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { TaskListType } from '../TaskLists/Index';

export type TaskType = {
    id: number;
    task_list_id: number;
    name: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
};

export default function Index() {
    const form = useForm<{ name: string; _method: 'put'; completed: boolean }>({
        _method: 'put',
        name: '',
        completed: false,
    });
    const [editItem, setEditItem] = useState<TaskType | null>(null);

    const { tasks, task_list } =
        usePage<PageProps<{ tasks: TaskType[]; task_list: TaskListType }>>()
            .props;
    const handleUpdateTask = async () => {
        if (!editItem) {
            return;
        }

        form.setData({ name: editItem.name, _method: 'put', completed: false });
        await new Promise((resolve) => setTimeout(resolve, 0));
        form.post(
            route('tasks.update', {
                task_list: task_list.id,
                task: editItem.id,
            }),
            {
                onSuccess: () => {
                    setEditItem(null);
                },
            },
        );
    };

    const handleToggleCompleted = async (task: TaskType) => {
        form.setData({
            name: task.name,
            _method: 'put',
            completed: !task.completed,
        });
        await new Promise((resolve) => setTimeout(resolve, 0));
        form.put(
            route('tasks.update', {
                task_list: task_list.id,
                task: task.id,
            }),
            {
                onSuccess: () => {
                    setEditItem(null);
                    console.log('success');
                },
            },
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Tasks
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <div className="flex items-center space-x-2">
                            <h2 className="text-lg font-semibold leading-tight text-gray-800 dark:text-gray-200">
                                Task List Name:
                            </h2>
                            <span className="text-xl font-medium text-gray-600 dark:text-gray-400">
                                {task_list.name}
                            </span>
                        </div>
                        <Button asChild>
                            <Link
                                href={
                                    task_list &&
                                    route('tasks.create', {
                                        task_list: task_list.id,
                                    })
                                }
                            >
                                Add Task
                            </Link>
                        </Button>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Name
                                    </TableHead>
                                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Actions
                                    </TableHead>
                                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Completed
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="bg-white dark:bg-gray-800">
                                {tasks?.map((task) => {
                                    if (task.id === editItem?.id) {
                                        return (
                                            <TableRow key={task.id}>
                                                <TableCell className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                    <Input
                                                        type="text"
                                                        value={editItem.name}
                                                        onChange={(e) => {
                                                            setEditItem({
                                                                ...editItem,
                                                                name: e.target
                                                                    .value,
                                                            });
                                                            form.setData(
                                                                'name',
                                                                e.target.value,
                                                            );
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        onClick={
                                                            handleUpdateTask
                                                        }
                                                    >
                                                        {form.processing
                                                            ? 'Saving...'
                                                            : 'Save'}
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }

                                    return (
                                        <TableRow key={task.id}>
                                            <TableCell
                                                className={
                                                    'whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 ' +
                                                    (task.completed
                                                        ? 'line-through'
                                                        : '')
                                                }
                                            >
                                                {task.name}
                                            </TableCell>
                                            <TableCell className="flex gap-2 whitespace-nowrap px-6 py-4 text-sm font-medium">
                                                <>
                                                    <Button
                                                        variant={'outline'}
                                                        onClick={() => {
                                                            setEditItem(task);
                                                            form.setData(
                                                                'name',
                                                                task.name,
                                                            );
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>

                                                    <Button
                                                        variant={'destructive'}
                                                    >
                                                        Delete
                                                    </Button>
                                                </>
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                                {task.completed ? (
                                                    <span className="text-green-600">
                                                        Completed{' '}
                                                        <span
                                                            className="cursor-pointer px-2 text-red-600"
                                                            onClick={() =>
                                                                handleToggleCompleted(
                                                                    task,
                                                                )
                                                            }
                                                        >
                                                            X
                                                        </span>
                                                    </span>
                                                ) : (
                                                    <Button
                                                        type="button"
                                                        onClick={() =>
                                                            handleToggleCompleted(
                                                                task,
                                                            )
                                                        }
                                                    >
                                                        Mark as Completed
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
