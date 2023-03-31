<?php
// 1、数组排序，创建一个一维数组$arr1 (77,56,98,44,64,89)。
$arr1 = [77, 56, 98, 44, 64, 89];
// （1）写出向数组头部插入（96,87）2个数的代码。
array_unshift($arr1, 96, 87);
// （2）写出向数组尾部插入（74,99）2个数的代码。
array_push($arr1, 74, 99);
echo '使用sort()对数组$arr1排序，使用print_r ()输出数组观察结果，输出最小值:';
// （3）使用sort()对数组$arr1排序，使用print_r ()输出数组观察结果，输出最小值。
sort($arr1);
print_r(min($arr1));
echo "<br>" . "<hr>";
echo '使用rsort()对数组$arr1排序，使用print_r ()输出数组观察结果，输出最大值:';
// （4）使用rsort()对数组$arr1排序，使用print_r ()输出数组观察结果，输出最大值。
rsort($arr1);
print_r(max($arr1));
echo "<br>" . "<hr>";
echo '使用asort()对数组$arr1排序，使用print_r ()输出数组观察结果:';
// （5）使用asort()对数组$arr1排序，使用print_r ()输出数组观察结果。
asort($arr1);
print_r($arr1);
echo "<br>" . "<hr>";
echo '使用arsort()对数组$arr1排序，使用print_r ()输出数组观察结果:';
// （6）使用arsort()对数组$arr1排序，使用print_r ()输出数组观察结果。
asort($arr1);
print_r($arr1);
echo "<br>" . "<hr>";
echo '删除数组头部1个元素，使用print_r ()输出数组观察结果:';
// （7）删除数组头部1个元素，使用print_r ()输出数组观察结果。
array_shift($arr1);
print_r($arr1);
echo "<br>" . "<hr>";
echo '删除数组尾部1个元素，使用print_r ()输出数组观察结果:';
// （8）删除数组尾部1个元素，使用print_r ()输出数组观察结果。
array_pop($arr1);
print_r($arr1);
echo "<br>" . "<hr>";
echo '使用shuffle()对数组$arr1排序，使用print_r ()输出数组观察结果:';
// （9）使用shuffle()对数组$arr1排序，使用print_r ()输出数组观察结果。
shuffle($arr1);
print_r($arr1);

echo "<br>";
