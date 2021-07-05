<?php

namespace App\Http\Controllers;

use App\ActivationItem;
use App\Version;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ActivationItemController extends Controller
{
    public function index()
    {
        return ActivationItem::all();
    }

    public function update(Request $request, $id)
    {
        try {
            $max_width = config('setting.items.width', 200);
            $max_height = config('setting.items.height', 200);
            if ($request->hasFile('image')) {
                $fileInfo = getimagesize($request->file('image'));
                if ($fileInfo[0] > 3000 && $fileInfo[1] > 3000) {
                    throw new \Exception("Kích cỡ file tối đa ${max_width}x${max_height}", 500);
                }
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
        try {
            $data = $request->all();
            $ai = ActivationItem::find($id);
            if (!$ai) {
                throw new \Exception('Không tìm thấy đối tượng với id: ' . $id, 500);
            }
            if ($request->hasFile('image')) {
                $filename = $this->uploadImage($data['image']);
                $ai->image = $filename;
                $ai->save();
            }
            $ai->update([
                'name' => $data['name'],
                'content' => $data['content']
            ]);
            $version = Version::all()->first();
            $version->version += 1;
            $version->save();
            return $ai;
        } catch(\Exception $e) {
            return response()->json(['error' => $e->getMessage()], $e->getCode());
        }
    }

    private function uploadImage(UploadedFile $file)
    {
        $fileName = time() . '_item' . '.png';
        $file->storeAs('public/items', $fileName);
        return Storage::Url('items/'.$fileName);
    }
}
