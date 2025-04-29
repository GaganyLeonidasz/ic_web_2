<?php

namespace Tests\Unit;
use App\Models\Customer;
use PHPUnit\Framework\TestCase;

class CustomerTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_example(): void
    {
        $customer = new Customer([
            'first_name' => 'John',
            'last_name' =>  'Smith'
        ]);

        $this->assertEquals('John Smith',$customer->fullName());
    }
}
