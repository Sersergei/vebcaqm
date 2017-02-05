<?php
/**
 * Created by PhpStorm.
 * User: serse
 * Date: 05.02.2017
 * Time: 20:25
 */

namespace app\models;


use yii\base\Model;

class Image extends Model
{
    
    public $user_id;
    private $img;
    public function __construct(array $config,string $img)
    {
        $img = str_replace('data:image/png;base64,', '', $img);
        $this->img = str_replace(' ', '+', $img);
        parent::__construct($config);
    }

    public function SaveImage(){
        define('UPLOAD_DIR', 'img/');
        $data = base64_decode($this->img);
        $file = UPLOAD_DIR .$this->user_id. '.png';
        $save = file_put_contents($file, $data);
        return $save;
    }

}