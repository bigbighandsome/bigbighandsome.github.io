// 打字效果
var typed = new Typed('#tag', {
    strings: ['<i><del style="color:#F4606C;font-size:18px!important;">翔游</del><i style="font-size:18px!important;">XiangYou制作者</i></i>', '<i style="font-size:22px!important;"><i style="color:#F4606C;">游戏</i>爱好者</i>', '<i style="font-size:22px!important;"><i style="color:#F4606C;">理想</i>游戏开发师</i>'],
    typeSpeed: 10,
    backSpeed: 20,
    cursorChar: '',
    shuffle: true,
    smartBackspace: false,
    loop: true
});
// 点击菜单
$(function () {
    $('.toggle').click(function () {
        $('.menu').toggleClass('menu-active')
        $('.toggle').toggleClass('toggle-active')
    });
});
// $(function () {
//     // $('.点击的对象')是选中点击的对象
//     $('.toggle').click(function () {
//         // 给菜单添加、删除menu-active的类（样式）
//         $('.menu').toggleClass('menu-active')
//         // $('.toggle').toggleClass('toggle-active')
//     });
// });

// 过滤功能
var $grid = $('.grid').isotope({
    // options
    itemSelector: '.grid-item',
    layoutMode: 'fitRows'
});
$('.button-group').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
    $('.button-item').removeClass('button-active')
    $(this).addClass('button-active');
});

// 跑动效果
$(function () {
    $('body').running();
})

var canvas_1 = new EnableCircle({
    id: 'le-canvas_1', // 节点标签 [必填] id选择器
    value: 80, // 百分比值 [必填] 
    bgColor: '', // 背景颜色 十六进制 [可填] 默认为透明;  当填了type的vba_color 或target的 可不填
    cirColor: '#E6CEAC', // 进度条颜色 十六进制 [必填] 当填了type的vba_color 或target的 可不填
    textColor: '#19CAAD', // 字体颜色 十六进制 [必填] 当填了type的vba_color 或target的 可不填
    type: 'shadow', // 样式 [可填] 默认:none 样式可选: shadow (添加阴影);vba_color(优先级最高特殊样式) none (无)
    lineCap: 'round', // 进度条末端类型 [可填] 默认:butt (平滑);round (圆形线帽) 
    target: 'default', // 进度条指定类型 [可填] 默认: default 
    size: 60,// 环形半径 [可填] 默认: 40
    lineWidth: 20, // 进度条宽度 [可填] 默认: 8 最高60
    open: 'bottom' // 进度条开始点 [可填] 默认: top 可选 bottom 、top 、between
})
var canvas_2 = new EnableCircle({
    id: 'le-canvas_2', // 节点标签 [必填] id选择器
    value: 75, // 百分比值 [必填] 
    bgColor: '', // 背景颜色 十六进制 [可填] 默认为透明;  当填了type的vba_color 或target的 可不填
    cirColor: '#E6CEAC', // 进度条颜色 十六进制 [必填] 当填了type的vba_color 或target的 可不填
    textColor: '#19CAAD', // 字体颜色 十六进制 [必填] 当填了type的vba_color 或target的 可不填
    type: 'shadow', // 样式 [可填] 默认:none 样式可选: shadow (添加阴影);vba_color(优先级最高特殊样式) none (无)
    lineCap: 'round', // 进度条末端类型 [可填] 默认:butt (平滑);round (圆形线帽) 
    target: 'default', // 进度条指定类型 [可填] 默认: default 
    size: 60,// 环形半径 [可填] 默认: 40
    lineWidth: 20, // 进度条宽度 [可填] 默认: 8 最高60
    open: 'top' // 进度条开始点 [可填] 默认: top 可选 bottom 、top 、between
})
var canvas_3 = new EnableCircle({
    id: 'le-canvas_3', // 节点标签 [必填] id选择器
    value: 85, // 百分比值 [必填] 
    bgColor: '', // 背景颜色 十六进制 [可填] 默认为透明;  当填了type的vba_color 或target的 可不填
    cirColor: '#E6CEAC', // 进度条颜色 十六进制 [必填] 当填了type的vba_color 或target的 可不填
    textColor: '#19CAAD', // 字体颜色 十六进制 [必填] 当填了type的vba_color 或target的 可不填
    type: 'shadow', // 样式 [可填] 默认:none 样式可选: shadow (添加阴影);vba_color(优先级最高特殊样式) none (无)
    lineCap: 'round', // 进度条末端类型 [可填] 默认:butt (平滑);round (圆形线帽) 
    target: 'default', // 进度条指定类型 [可填] 默认: default 
    size: 60,// 环形半径 [可填] 默认: 40
    lineWidth: 20, // 进度条宽度 [可填] 默认: 8 最高60
    open: 'between' // 进度条开始点 [可填] 默认: top 可选 bottom 、top 、between
})
var canvas_4 = new EnableCircle({
    id: 'le-canvas_4', // 节点标签 [必填] id选择器
    value: 90, // 百分比值 [必填] 
    bgColor: '', // 背景颜色 十六进制 [可填] 默认为透明;  当填了type的vba_color 或target的 可不填
    cirColor: '#E6CEAC', // 进度条颜色 十六进制 [必填] 当填了type的vba_color 或target的 可不填
    textColor: '#19CAAD', // 字体颜色 十六进制 [必填] 当填了type的vba_color 或target的 可不填
    type: 'shadow', // 样式 [可填] 默认:none 样式可选: shadow (添加阴影);vba_color(优先级最高特殊样式) none (无)
    lineCap: 'round', // 进度条末端类型 [可填] 默认:butt (平滑);round (圆形线帽) 
    target: 'default', // 进度条指定类型 [可填] 默认: default 
    size: 60,// 环形半径 [可填] 默认: 40
    lineWidth: 20, // 进度条宽度 [可填] 默认: 8 最高60
    open: 'bottom' // 进度条开始点 [可填] 默认: top 可选 bottom 、top 、between
})
// 滚动效果
$(function () {
    window.scrollReveal = new scrollReveal({
        reset: true, move: '50px',
    });
})();