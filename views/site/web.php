<?php
/**
 * Created by PhpStorm.
 * User: ohonko
 * Date: 13.12.2016
 * Time: 15:43
 */
use yii\helpers\Html;

$this->title = 'Web';
$this->params['breadcrumbs'][] = $this->title;
$this->registerJsFile('../js/cam.js');
?>
<div>
    <h1>WEB страничка</h1>
</div>
<div id="title">
    Трансляция с вебкамеры
</div>

<div id="viewer">
    <img src="data:base64," alt="" id="img" width="640" height="480" class="img-content" /> //берется изображение и выводится
</div>