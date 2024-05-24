<?php
$info = [
    ["学号", "姓名", "性别", "专业", "班级"],
    [
        2022011,
        "小明",
        "男",
        "Web前端开发",
        "前端2101"
    ],
    [
        2022012,
        "小爱",
        "女",
        "Web前端开发",
        "前端2101"
    ],
    [
        2022013,
        "小度",
        "男",
        "人工智能",
        "人工智能2102",
    ]
];
echo "<table border='0'>";
for ($i = 0; $i < count($info); $i++) {
    if ($i == 0) {
        echo "<tr>";
        for ($j = 0; $j < count($info[$i]); $j++) {
            echo "<td style='font-weight:bold'>";
            echo $info[$i][$j];
            echo "</td>";
        }
        echo "</tr>";
    } else {
        echo "<tr>";
        for ($j = 0; $j < count($info[$i]); $j++) {
            echo "<td>";
            echo $info[$i][$j];
            echo "</td>";
        }
        echo "</tr>";
    }
}
echo "</table>";
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>二维数组实践</title>
    <style>
        table {
            border-spacing: 0;

        }

        table td {
            text-align: center;
            width: 800px;
            height: 60px;
            border: 1px solid orange;
            border-spacing: 0;
        }
    </style>
</head>

<body>
</body>

</html>