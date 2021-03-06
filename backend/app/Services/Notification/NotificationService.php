<?php


namespace App\Services\Notification;


interface NotificationService
{
    public function sendBatchNotification($deviceTokens, $data);
    public function subscribeTopic($deviceTokens, $topicName);
    public function unsubscribeTopic($deviceTokens, $topicName);
    public function sendNotification($data);
}
