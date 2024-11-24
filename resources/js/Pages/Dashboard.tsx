import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaTasks } from 'react-icons/fa';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Task Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="flex py-12">
                <Link
                    href={route('task_lists.index')}
                    className="max-w-7xl space-y-6 sm:px-6 lg:px-8"
                >
                    <div className="flex justify-center">
                        <Link
                            href={route('task_lists.index')}
                            className="flex transform flex-col items-center rounded-lg bg-white p-6 text-gray-800 shadow-lg transition-transform hover:scale-105 dark:bg-gray-700 dark:text-gray-200"
                        >
                            <FaTasks className="mb-3 h-12 w-12 text-blue-500" />
                            <h3 className="text-xl font-semibold">Task List</h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                View all your tasks with ease.
                            </p>
                        </Link>
                    </div>
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}
