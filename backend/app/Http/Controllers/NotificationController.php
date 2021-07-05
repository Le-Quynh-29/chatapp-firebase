<?php

namespace App\Http\Controllers;

use App\Jobs\PushNotificationJob;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class NotificationController extends Controller
{
    public function addDeviceToken(Request $request)
    {
        User::create($request->all());
        return ['message' => 'done'];
    }

    public function send(Request $request)
    {
        $topic = 'message';
        $imageName = Storage::URL('/default/notification.png');
        if ($request->hasFile('image')) {
            $imageName = $this->uploadImage($request->file('image'));
        }
        $deviceTokens = User::all()->pluck('device_token')->toArray();
		$chunkedArray = array_chunk($deviceTokens, 1000);
		foreach ($chunkedArray as $chunkedArrayItem) {
			PushNotificationJob::dispatch('sendBatchNotification', [
				$chunkedArrayItem,
				[
					'topic' => $topic,
					'title' => $request->title,
					'body' => $request->body
				]
			]);
		}
        
        return ['message' => 'sent notification'];
    }

    private function uploadImage(UploadedFile $file)
    {
        $fileName = time() . '_item' . '.png';
        $file->storeAs('public/items', $fileName);
        return Storage::Url('items/'.$fileName);
    }
}
