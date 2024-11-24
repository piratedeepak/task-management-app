import { Button } from '@/components/ui/button';
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

import { Head, Link, usePage } from '@inertiajs/react';
import ShareTaskListModal from './_partials/ShareTaskListModal';

type UserType = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
};

export type TaskListType = {
    id: number;
    user_id: number;
    name: string;
    created_at: string;
    updated_at: string;
    shared_with_users?: UserType[];
};

export default function Index() {
    const { taskLists } =
        usePage<PageProps<{ taskLists: TaskListType[] }>>().props;
    console.log(taskLists);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Task List
                </h2>
            }
        >
            <Head title="Task List" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="flex justify-end">
                        <Button asChild>
                            <Link href={route('task_lists.create')}>
                                Add Task List
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
                                        Manage
                                    </TableHead>
                                    <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Shared With
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="bg-white dark:bg-gray-800">
                                {taskLists?.map((taskList) => (
                                    <TableRow key={taskList.id}>
                                        <TableCell className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {taskList.name}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                            <Link
                                                href={route(
                                                    'task_lists.edit',
                                                    taskList.id,
                                                )}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={route(
                                                    'task_lists.destroy',
                                                    taskList.id,
                                                )}
                                                method="delete"
                                                as="button"
                                                className="ml-4 text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </Link>
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                            <Link
                                                href={route(
                                                    'tasks.index',
                                                    taskList.id,
                                                )}
                                            >
                                                <Button>Manage</Button>
                                            </Link>
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {taskList.shared_with_users?.length
                                                ? taskList.shared_with_users.map(
                                                      (user, index) => (
                                                          <span
                                                              key={index}
                                                              className="mr-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                                          >
                                                              {user.name}
                                                          </span>
                                                      ),
                                                  )
                                                : 'Not shared'}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                                            <ShareTaskListModal
                                                taskList={taskList}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
