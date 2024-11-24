import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Using shadcn Input component
import { Label } from '@/components/ui/label'; // Using shadcn Label component
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head, Link, useForm } from '@inertiajs/react';
import { TaskListType } from './Index';

interface Props {
    taskList: TaskListType;
}

export default function Edit({ taskList }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: taskList.name,
    });

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData('name', event.target.value);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        put(route('task_lists.update', taskList));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight dark:text-gray-200">
                    Edit Task List
                </h2>
            }
        >
            <Head title="Edit Task List" />

            <div className="max-w-xl py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={data.name}
                                onChange={onHandleChange}
                                disabled={processing}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <Link href={route('task_lists.index')}>
                                <Button variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
