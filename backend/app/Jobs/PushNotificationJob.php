<?php

namespace App\Jobs;

use App\Services\Notification\FcmNotification;
use App\Services\Notification\NotificationService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class PushNotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $method;
    protected $params;

    /**
     * Create a new job instance.
     *
     * @param $method
     * @param array $params
     */
    public function __construct($method, $params = [])
    {
        $this->method = $method;
        $this->params = $params;
    }

    /**
     * Execute the job.
     *
     * @param FcmNotification $notificationService
     * @return void
     */
    public function handle(FcmNotification $notificationService)
    {
        call_user_func_array([
            $notificationService,
            $this->method
        ], $this->params);
    }
}
