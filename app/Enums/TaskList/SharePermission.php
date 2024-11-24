<?php

namespace App\Enums\TaskList;

enum SharePermission: string
{
    case VIEW = 'view';
    case EDIT = 'edit';
}
