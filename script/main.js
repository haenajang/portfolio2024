$(document).ready(function() {
    let progressAnimated = false; // 플래그 추가

    //스플래쉬
    let splash = $('.splash'),
        o = splash.find('.o'),
        l = o.find('.l'),
        r = o.find('.r'),
        singlebar = splash.find('.singlebar'),
        barcode2 = splash.find('.barcode2'),
        port = splash.find('.port');
    
    l.css({ 'transform': 'translateX(-100px)' }).animate({ opacity: 1 }, 1000);
    r.css({ 'transform': 'translateX(100px)' }).animate({ opacity: 1 }, 1000);
    setTimeout(function() {
        singlebar.fadeIn(1000, function() {
            // fadeIn이 완료된 후 fadeOut 실행
            $(this).fadeOut();
            // fadeOut과 동시에 실행될 애니메이션
            l.css({ 'transform': 'translateX(-140px)' }).animate({ opacity: 1 }, 1000);
            r.css({ 'transform': 'translateX(140px)' }).animate({ opacity: 1 }, 1000);
            barcode2.animate({ opacity: 1 }, 1000, function() {
                o.css('left', '57%');
                barcode2.css('left', '58%');
                l.fadeOut(1000);
                r.fadeOut(1000);
                barcode2.fadeOut(1000);
                port.animate({ opacity: 1 }, 1000, function() {
                    $(this).animate({ 'bottom': '10%', 'right': '46%' }, 1000, function(){
                        splash.fadeOut(1000);
                    });
                });                
            });
        });
    }, 500);


    //로고 클릭 이벤트
    $('h1').click(function() {
        $('html, body').animate({'scrollTop': 0}, 1000);
    });

    // 1. 섹션별 헤더 서식 변경
    $(window).scroll(function() {
        let sposL = $(this).scrollTop();
        let projectsOffset = $('.projects').offset().top;
        let contactOffset = $('.contact').offset().top;

        if (sposL >= projectsOffset && sposL < contactOffset) {
            $('h1 .barcode .bar').css({background: '#fff'});
            $('#gnb li a').css({color: '#fff'});
        } else {
            $('h1 .barcode .bar').css({background: '#000'});
            $('#gnb li a').css({color: '#000'});
        }

        // 프로필섹션 진입 시 프로그레스바 애니메이션 실행
        let profileOffset = $('.profile').offset().top;
        if (sposL >= profileOffset && !progressAnimated) {
            progressAnimated = true; // 애니메이션 시작
            $(".circle_percent").each(function() {
                var $this = $(this),
                $dataV = $this.data("percent"),
                $dataDeg = $dataV * 3.6,
                $round = $this.find(".round_per");
                $round.css("transform", "rotate(" + parseInt($dataDeg + 180) + "deg)"); 
                $this.append('<div class="circle_inbox"><span class="percent_text"></span></div>');
                $this.prop('Counter', 0).animate({Counter: $dataV},
                {
                  duration: 2000, 
                  easing: 'swing', 
                  step: function (now) {
                          $this.find(".percent_text").text(Math.ceil(now)+"%");
                      }
                  });
                if($dataV >= 51){
                  $round.css("transform", "rotate(" + 360 + "deg)");
                  setTimeout(function(){
                    $this.addClass("percent_more");
                  },1000);
                  setTimeout(function(){
                    $round.css("transform", "rotate(" + parseInt($dataDeg + 180) + "deg)");
                  },1000);
                } 
              });
        }
    });

    // 2. 메뉴 클릭시 해당 section이 부드럽게 애니메이션 되면서 스크롤
    $('#gnb li a').click(function() {
        let name = $(this).attr('href');
        let secOffset = $('.' + name).offset().top;
        $('html, body').animate({'scrollTop': secOffset}, 500);
        return false;
    });

    // 3. 마우스 휠 돌리면 한페이지씩 이동하기
    $('main section').each(function() {
        $(this).on('mousewheel', function(e) {
            var delta = 0;
            var moveTop = null;
            var boxMax = $("main section").length - 1;
            var winEvent = window.event;

            if (winEvent.wheelDelta) {
                delta = winEvent.wheelDelta / 120;
                if (window.opera) {
                    delta = -delta;
                }
            } else if (winEvent.detail) {
                delta = -winEvent.detail / 3;
            }

            // 마우스휠 이동 처리
            if (delta < 0) {
                if ($(this).index() < boxMax) {
                    moveTop = $(this).next().offset().top;
                } else {
                    return false;
                }
            } else {
                if ($(this).index() > 0) {
                    moveTop = $(this).prev().offset().top;
                } else {
                    return false;
                }
            }

            $("html,body").stop().animate({scrollTop: moveTop + "px"}, 300);
        });
    });


    //카드 뒤집기
    $('.card_box .card .side, .card_box .card .back').off('mouseenter mouseleave').on('mouseenter', function() {
        $(this).parent().css("transform", "rotateY(180deg)");
    }).on('mouseleave', function() {
        $(this).parent().css("transform", "rotateY(0deg)");
    });

    //비디오 재생
    $(window).on('scroll', function() {
        var videoSection = $('project');
        var video = $('video');
        var rect = videoSection[0].getBoundingClientRect();

        // 비디오 섹션이 뷰포트에 들어오면 재생
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            video.play();
        } else {
            video.pause(); // 섹션을 벗어나면 정지 (선택 사항)
        }
    });
});
