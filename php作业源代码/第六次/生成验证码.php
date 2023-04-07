<?php

$code = function () {

    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $random_string = substr(str_shuffle($characters), 0, 6);
    $div = "<div style='color:red'>";
    for ($i = 0; $i < strlen($random_string); $i++) {
        $color = sprintf("#%06X", mt_rand(0, 0xFFFFFF));
        $fontSize = rand(18, 36) . "px";
        $rotateX = rand(-40, 60) . "deg";
        $rotateY = rand(-40, 60) . "deg";
        $rotateZ = rand(-40, 60) . "deg";
        $rotate3D = rand(20, 30) . "deg";
        $div .= "<span style='margin-right:6px;color:$color;font-size:$fontSize;transform:  rotateX($rotateX) rotateY($rotateY) rotateZ($rotateZ) rotate3d(1,1,1,$rotate3D); display:inline-block'>$random_string[$i]</span>";
        $color = "";
        $fontSize = "0";
    }
    $div .= "</div>";
    return $div;
};
echo $code();
