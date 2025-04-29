<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Users;
use Illuminate\Auth\Access\Response;

class UsersPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(Users $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(Users $user, Users $users): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(Users $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(Users $user, Users $users): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(Users $user, Users $users): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(Users $user, Users $users): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(Users $user): bool
    {
        return false;
    }
}
