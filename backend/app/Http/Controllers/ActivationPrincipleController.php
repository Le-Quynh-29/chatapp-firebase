<?php

namespace App\Http\Controllers;

use App\ActivationPrinciple;
use App\Version;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ActivationPrincipleController extends Controller
{
    public function index()
    {
        return ActivationPrinciple::all();
    }

    public function update(Request $request, $id)
    {
        try {
            $ap = ActivationPrinciple::find($id);
            if(!$ap) {
                throw new \Exception('Không tìm thấy đối tượng với id: ' . $id, 500);
            }
            $ap->update($request->all());
            $version = Version::all()->first();
            $version->version += 1;
            $version->save();
            return $ap;
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }
}
