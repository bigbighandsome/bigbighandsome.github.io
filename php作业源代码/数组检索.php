<?php
// 4、数组检索
// （1）创建数组$arr3('张三' => '60', '李四'=> '50', '王五'=> '40', '赵六' => '60','孙七'=>60)
$arr3 = ['张三' => '60', '李四' => '50', '王五' => '40', '赵六' => '60', '孙七' => 60];
// （2）使用array_keys()，查找'60'所对应的键，使用print_r ()输出观察结果。
$six = array_keys($arr3, '60');
echo "使用array_keys()，查找'60'所对应的键，使用print_r ()输出观察结果" . "<br>";
print_r($six);
echo "<hr>";
// （3）使用array_keys()，使用严格模式查找'60'所对应的键，输出值为'60'的个数。
$sixS = array_keys($arr3, '60', true);
echo "使用array_keys()，使用严格模式查找'60'所对应的键，输出值为'60'的个数" . "<br>";
print_r(count($sixS));
echo "<hr>";
// （4）使用array_values()获取数组中的所有值。
$result =  array_values($arr3);
echo "使用array_values()获取数组中的所有值" . "<br>";
print_r($result);
echo "<hr>";
// （5）使用array_search()，查找'60'所对应的键，输出观察结果。
$result = array_search('60', $arr3);
echo "使用array_search()，查找'60'所对应的键，输出观察结果" . "<br>";
print_r($result);
echo "<hr>";
// （6）使用array_search()，使用严格模式查找数组是否存在40，输出观察结果。
$result = array_search('40', $arr3, true);
echo "使用array_search()，使用严格模式查找数组是否存在40，输出观察结果" . "<br>";
var_dump($result !== null);
echo "<hr>";
// （7）使用in_array()，查找40值是否在数组，输出结果。
$result =  in_array('40', $arr3);
echo "使用in_array()，查找40值是否在数组，输出结果" . "<br>";
var_dump($result !== null);
echo "<hr>";
// （8）使用in_array()严格模式查找40值是否在数组，输出结果。
$result =  in_array('40', $arr3, true);
echo "使用in_array()，查找40值是否在数组，输出结果" . "<br>";
var_dump($result !== null);
echo "<hr>";
// （9）使用array_key_exists，查找“张三”键是否在数组，输出结果。
$result =  array_key_exists('张三', $arr3);
echo "使用array_key_exists，查找“张三”键是否在数组，输出结果" . "<br>";
var_dump($result !== null);
echo "<hr>";
// （10）将$arr3数组使用array_chunk()拆分成2个数组，保留原来的键名，使用print_r打印输出数组。
$result =  array_chunk($arr3, 3, true);
echo '将$arr3数组使用array_chunk()拆分成2个数组，保留原来的键名，使用print_r打印输出数组' . "<br>";
var_dump($result);
echo "<hr>";
