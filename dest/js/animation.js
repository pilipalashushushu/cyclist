console.log('start');

// var controller = new ScrollMagic.Controller();

//Ｓolgan動畫
$(window).on('load', function () {
    $('.ex1').textyleF();
    $('.ex2').textyleF({
        duration: 2000,
        delay: 200,
        easing: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
        callback: function () {
            $(this).css({
                color: '#fff',
                transition: '1s',
            });
        }
    });
});


//腳踏車動畫
TweenMax.to('.tire01', 6, {
    rotation: 10000,
    repeat: -1,
});
TweenMax.to('.tire02', 6, {
    rotation: 10000,
    repeat: -1,
});
TweenMax.fromTo('.bike', 15, {
    x: -127,
}, {
    x: 1700,
    repeat: -1,
});