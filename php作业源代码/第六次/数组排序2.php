<?php
// 2、数组排序，创建一个一维数组$arr2 (’name’=>"Volvo",’city’=>"BMW",’country’=>"Toyota")。
$arr2 = ['name' => "Volvo", 'city' => "BMW", 'country' => "Toyota"];
echo '使用array_reverse()使元素顺序相反的数组，使用print_r ()输出观察结果：' . "<br>" . "<hr>";
// （1）使用array_reverse()使元素顺序相反的数组，使用print_r ()输出观察结果
array_reverse($arr2);
print_r($arr2);
echo "<br>";
echo '使用ksort()对数组$arr2排序，使用print_r ()输出数组观察结果：' . "<br>" . "<hr>";
// （2）使用ksort()对数组$arr2排序，使用print_r ()输出数组观察结果。
ksort($arr2);
print_r($arr2);
echo "<br>";
echo '使用krsort()对数组$arr2排序，使用print_r ()输出数组观察结果：' . "<br>" . "<hr>";
// （3）使用krsort()对数组$arr2排序，使用print_r ()输出数组观察结果。
krsort($arr2);
print_r($arr2);
