<?php
// 3、利用数组函数实现对歌唱比赛的评分，现有10个评委对某选手的评分为：，评分规则如下：
// 	节目规定最高分不能大于100分，最低分不能小于0分。
// 	去掉一个最高分，去掉一个最低分，求总分和平均分（保留一位小数）。
function ArraySorting()
{
    $result = [85, 91, 71, 91, 100, 81, 61, 81, 99, 88];
    $maxValue = 0;
    $minValue = $result[0] ? $result[0] : 999999;
    $sum = 0;
    //判断成绩合理性以及取出最高分和最低分
    for ($i = 0; $i < count($result); $i++) {
        if ($result[$i] > 100 || $result[$i] < 0) return false;
        if ($result[$i] > $maxValue) {
            $maxValue = $result[$i];
        } else if ($result[$i] < $minValue) {
            $minValue = $result[$i];
        };
    }
    for ($i = 0; $i < count($result); $i++) {
        if ($result[$i] == $maxValue || $result[$i] == $minValue) {
            array_splice($result, $i, 1);
        }
    }
    for ($i = 0; $i < count($result); $i++) {
        $sum += $result[$i];
    }
    $totalInfo = [
        "max" => $maxValue, "min" => $minValue,
        "sum" => $sum, "average" => round($sum / count($result), 1)
    ];
    return $totalInfo;
}
$totalInfo = ArraySorting();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>数组排序</title>
    <style>
        .bg {
            width: 500px;
            height: 330px;
            background-image: url("./images/back.jpg");
            z-index: -1;
            position: relative;
        }

        table {
            width: 200px;
            height: 100px;
            position: absolute;
            top: 30%;
            left: 30%;
        }

        table tr {
            background-color: aliceblue;

        }
    </style>
</head>

<body>
    <div class="bg">
        <table border="0">
            <tr>
                <td>最低分</td>
                <td><?php echo $totalInfo["min"] ?></td>
            </tr>
            <tr>
                <td>最高分</td>
                <td><?php echo $totalInfo["max"] ?></td>
            </tr>
            <tr>
                <td>总分</td>
                <td><?php echo $totalInfo["sum"] ?></td>
            </tr>
            <tr>
                <td>平均分</td>
                <td><?php echo $totalInfo["average"] ?></td>
            </tr>
        </table>
    </div>
</body>

</html>