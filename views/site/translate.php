<?php
/**
 * Created by PhpStorm.
 * User: ohonko
 * Date: 13.12.2016
 * Time: 17:55
 */
$this->title = 'Web';
$this->params['breadcrumbs'][] = $this->title;
$this->registerJsFile('../js/translete.js');
?>
<div class="wrap">
    <div class="side fl">
        <h2>Веб-камера</h2>
        <div class="img-wrapper"><video id="video"></video></div>
    </div>
    <div class="side fr">
        <h2>Кадр на сайте</h2>
        <div class="img-wrapper"><canvas id="canvas" width="480" height="360"></canvas></div>
        <p id="time"></p>
    </div>
</div>
