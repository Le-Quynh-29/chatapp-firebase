<?php

namespace App\Http\Controllers;

use App\Intro;
use App\Version;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class IntroController extends Controller
{
    public function index()
    {
        return Intro::all()->first();
    }

    public function update(Request $request)
    {
        try {
            $max_width = config('setting.intro.width', 300);
            $max_height = config('setting.intro.height', 300);
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
            $intro = Intro::all()->first();
            if (!$intro) {
                throw new \Exception('Không tìm thấy đối tượng', 500);
            }
            if ($request->hasFile('image')) {
                $filename = $this->uploadImage($request->image);
                $intro->image = $filename;
                $intro->save();
            }
            $intro->update([
                'year' => $request->input('year'),
                'title' => $request->input('title'),
                'content' => $request->input('content')
            ]);
            $version = Version::all()->first();
            $version->version += 1;
            $version->save();
            return $intro;
        } catch (\Exception $e) {
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
