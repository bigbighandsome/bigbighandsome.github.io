<?php
function isPalindrome($str)
{
    $len = strlen($str);
    $mid = floor($len / 2);

    for ($i = 0; $i < $mid; $i++) {
        if ($str[$i] !== $str[$len - $i - 1]) {
            return false;
        }
    }

    return true;
}
var_dump(isPalindrome("abba"));
