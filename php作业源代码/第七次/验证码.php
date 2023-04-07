<?php
function generateCode()
{
    $chars = range('0', '9');
    $chars = array_merge($chars, range('a', 'z'));
    $chars = array_merge($chars, range('A', 'Z'));

    $length = count($chars);
    $code = '';

    for ($i = 0; $i < 6; $i++) {
        $index = rand(0, $length - 1);
        $code .= $chars[$index];
    }

    $div = "<div>";
    for ($i = 0; $i < strlen($code); $i++) {
        $color = sprintf("#%06X", mt_rand(0, 0xFFFFFF));
        $fontSize = rand(18, 36) . "px";
        $rotateX = rand(-40, 60) . "deg";
        $rotateY = rand(-40, 60) . "deg";
        $rotateZ = rand(-40, 60) . "deg";
        $rotate3D = rand(20, 30) . "deg";
        $div .=
            "<span 
        style='margin-right:6px;
        color:$color;
        font-size:$fontSize;
        transform:  rotateX($rotateX) rotateY($rotateY) rotateZ($rotateZ) rotate3d(1,1,1,$rotate3D);
        display:inline-block'>$code[$i]
            </span>";
        $color = "";
        $fontSize = "0";
    }
    $div .= "</div>";
    return $div;
}
$code =  generateCode();
echo $code;
