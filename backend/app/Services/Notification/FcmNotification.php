<?php


namespace App\Services\Notification;

use Illuminate\Http\Response;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Illuminate\Support\Facades\Log;
use Exception;

class FcmNotification implements NotificationService
{
    /**
     * @param $deviceTokens
     * @param $data
     */
    public function sendBatchNotification($deviceTokens, $data = [])
    {
        self::subscribeTopic($deviceTokens, $data['topic']);
        self::sendNotification($data, $data['topic']);
        self::unsubscribeTopic($deviceTokens, $data['topic']);
    }

    /**
     * @param $data
     */
    public function sendNotification($data, $topicName = null)
    {

        $url = 'https://fcm.googleapis.com/fcm/send';
        $data = [
            'to' => '/topics/' . $topicName,
            'notification' => [
                'body' => $data['body'] ?? 'Something',
                'title' => $data['title'] ?? 'Something',
                'image' => $data['image'] ?? null,
            ],
            'data' => [
                'url' => $data['url'] ?? null,
                'redirect_to' => $data['redirect_to'] ?? null,
            ],
            'apns' => [
                'payload' => [
                    'aps' => [
                        'mutable-content' => 1,
                    ],
                ],
                'fcm_options' => [
                    'image' => $data['image'] ?? null,
                ],
            ],
        ];

        $this->execute($url, $data);
    }

    /**
     * @param $deviceTokens
     * @param $topicName
     */
    public function subscribeTopic($deviceTokens, $topicName)
    {
        $url = 'https://iid.googleapis.com/iid/v1:batchAdd';
        $data = [
            'to' => '/topics/' . $topicName,
            'registration_tokens' => $deviceTokens,
        ];

        $this->execute($url, $data);
    }

    /**
     * @param $deviceTokens
     * @param $topicName
     */
    public function unsubscribeTopic($deviceTokens, $topicName)
    {

        $url = 'https://iid.googleapis.com/iid/v1:batchRemove';
        $data = [
            'to' => '/topics/' . $topicName,
            'registration_tokens' => $deviceTokens,
        ];

        $this->execute($url, $data);
    }

    private function execute(string $url, array $data = [], $method = 'POST')
    {
        $result = false;
        try {
            $client = new Client();
            $result = $client->request($method, $url, [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => 'key=' . config('app.messaging'),
                ],
                'json' => $data,
                'timeout' => 300,
            ]);
            $result = $result->getStatusCode() == Response::HTTP_OK;
        } catch (\Exception $e) {
            return \response()->json(['error' => $e->getMessage()], 500);
        }
        return $result;
    }
}
