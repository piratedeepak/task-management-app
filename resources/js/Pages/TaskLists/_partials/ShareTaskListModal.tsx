import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { TaskListType } from '../Index';

type ShareTaskListModalPropType = {
    taskList: TaskListType;
};

const ShareTaskListModal: React.FC<ShareTaskListModalPropType> = ({
    taskList,
}) => {
    const [open, setOpen] = useState(false);
    const form = useForm({
        email: '',
        task_list_id: taskList.id,
    });

    const handleShare = () => {
        form.post(route('task_lists.share'), {
            onSuccess: () => {
                form.reset();
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'secondary'} type="button">
                    <svg
                        width="800px"
                        height="800px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9 12C9 13.3807 7.88071 14.5 6.5 14.5C5.11929 14.5 4 13.3807 4 12C4 10.6193 5.11929 9.5 6.5 9.5C7.88071 9.5 9 10.6193 9 12Z"
                            stroke="#1C274C"
                            strokeWidth="1.5"
                        />
                        <path
                            d="M14 6.5L9 10"
                            stroke="#1C274C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M14 17.5L9 14"
                            stroke="#1C274C"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z"
                            stroke="#1C274C"
                            strokeWidth="1.5"
                        />
                        <path
                            d="M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z"
                            stroke="#1C274C"
                            strokeWidth="1.5"
                        />
                    </svg>
                    Share
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share Task List</DialogTitle>
                    <DialogDescription>
                        Share the task list with someone
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            value={form.data.email}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    handleShare();
                                }
                            }}
                            onChange={(e) =>
                                form.setData('email', e.target.value)
                            }
                            className="col-span-3"
                        />
                    </div>
                    <p className="text-xs text-red-500">{form.errors.email}</p>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleShare}>
                        Share
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ShareTaskListModal;