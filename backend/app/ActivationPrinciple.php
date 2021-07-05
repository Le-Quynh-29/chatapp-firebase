<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ActivationPrinciple extends Model
{
    protected $guarded = [];

    const KIM = 1;
    const MOC = 2;
    const THUY = 3;
    const HOA = 4;
    const THO = 5;
}
