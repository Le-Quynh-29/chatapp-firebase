<?php

namespace App\Http\Controllers;

use App\KhaiSonLapHuong;
use App\Version;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class KhaiSonLapHuongController extends Controller
{
    public function index(Request $request)
    {
        $attr = $request->query('attr');
        if ($attr) {
            return KhaiSonLapHuong::where('attribute', $attr)->get();
        }
        return KhaiSonLapHuong::all();
    }

    public function update(Request $request, $id) {
        try {
            $KhaiSonLapHuong = KhaiSonLapHuong::find($id);
            if(!$KhaiSonLapHuong) {
                throw new \Exception('Không tìm thấy đối tượng với id: ' . $id, 500);
            }
            $KhaiSonLapHuong->update($request->all());
            $version = Version::all()->first();
            $version->version += 1;
            $version->save();
            return $KhaiSonLapHuong;
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }

    }
}
