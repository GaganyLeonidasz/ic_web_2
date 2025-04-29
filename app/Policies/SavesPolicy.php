<?php

namespace App\Policies;

use App\Models\Saves;
use App\Models\Users;
use Illuminate\Auth\Access\Response;

class SavesPolicy
{
    /**
     * Determine whether the Users can view any models.
     */
    public function viewAny(Users $Users): bool
    {
        return false;
    }

    /**
     * Determine whether the Userss can view the model.
     */
    public function view(Users $Users, Saves $saves): bool
    {
        return false;
    }

    /**
     * Determine whether the Userss can create models.
     */
    public function create(Users $Users): bool
    {
        return false;
    }

    /**
     * Determine whether the Users can update the model.
     */
    public function update(Users $Users, Saves $saves): bool
    {
        return false;
    }

    /**
     * Determine whether the Users can delete the model.
     */
    public function delete(Users $Users, Saves $saves): bool
    {
        return false;
    }

    /**
     * Determine whether the Users can restore the model.
     */
    public function restore(Users $Users, Saves $saves): bool
    {
        return false;
    }

    /**
     * Determine whether the Users can permanently delete the model.
     */
    public function forceDelete(Users $Users, Saves $saves): bool
    {
        return false;
    }
}
