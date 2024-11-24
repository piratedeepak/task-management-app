import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input'; // Using shadcn Input component
import { Label } from '@/components/ui/label'; // Using shadcn Label component
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { TaskListType } from '../TaskLists/Index';

export default function Create() {
    const { task_list } =
        usePage<PageProps<{ task_list: TaskListType }>>().props;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        completed: false,
    });

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData('name', event.target.value);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        post(route('tasks.store', task_list.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight dark:text-gray-200">
                    Create Task
                </h2>
            }
        >
            <Head title="Create Task" />

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

                        <div className="flex flex-col space-y-2">
                            <Label htmlFor="completed">Completed</Label>
                            <Checkbox
                                id="completed"
                                checked={data.completed}
                                disabled={processing}
                            />
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <Link href={route('tasks.index', task_list.id)}>
                                <Button variant="outline">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                Create
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
