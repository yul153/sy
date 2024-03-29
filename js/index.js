$(document).ready(function () {
  /* Body____________________________________ */
  /* 스크롤 풀 페이지 */
  //브라우저 높이 가져오기
  let wh = $(window).height();

  /*브라우저 창 사이즈 변경시___________ */
  $(window).resize(function () {
    location.reload();  //새로고침
    let wh = $(window).height();
    $("html,body").stop().animate({ scrollTop: wh * a }, 500);
  });

  /* 인디케이터, gnb, 홈메뉴 클릭시______________________ */
  $(".mainIndicator>p, #gnb>li, .home_menu>li").click(function () {
    let num = $(this).index();
    $(".mainIndicator>p").eq(num).addClass("active");
    $(".mainIndicator>p").eq(num).siblings().removeClass("active");
    $("#gnb>li").eq(num).addClass("active");
    $("#gnb>li").eq(num).siblings().removeClass("active");
    $(".home_menu>li").eq(num).addClass("active");
    $(".home_menu>li").eq(num).siblings().removeClass("active");

    $("html,body").stop().animate({ scrollTop: wh * num }, 500);
  });

  /* 마우스휠__________________________ */
  let a = 0;  //페이지번호
  let area_n = $(".area").length;  //섹션개수
  let wheel = true;

  $(".area").on("mousewheel DOMMouseScroll", function (e, delta) {
    if (wheel) {
      let n = $(this).index();

      if (delta < 0) { //휠을 아래로 돌렸다면
        a = n + 1;
      } else { //휠을 위로 돌렸다면
        a = n - 1;
      }

      if (a <= 0) { a = 0; }
      if (a >= area_n - 1) { a = area_n - 1; }

      $(".mainIndicator>p").eq(a).addClass("active");
      $(".mainIndicator>p").eq(a).siblings().removeClass("active");
      $("#gnb li").eq(a).addClass("active");
      $("#gnb li").eq(a).siblings().removeClass("active");
      $("html,body").stop().animate({ scrollTop: wh * a }, 500);
    }
  });

  $(".wpContent").on("mouseenter DOMMouseScroll", function () {
    wheel = false;
  });
  $(".wpContent").on("mouseleave DOMMouseScroll", function () {
    wheel = true;
  });
  $(".wplImage").on("mouseenter DOMMouseScroll", function () {
    wheel = false;
  });
  $(".wplImage").on("mouseleave DOMMouseScroll", function () {
    wheel = true;
  });


  /*스크롤이벤트______________________ */
  $(window).scroll(function () {
    let sc = $(document).scrollTop();

    //한영역 높이가 wh임 
    if ((sc >= 0) && (sc < wh)) {
      a = 0;
    };

    if ((sc >= wh) && (sc < wh * 2)) {
      a = 1;
    };

    if ((sc >= wh * 2) && (sc < wh * 3)) {
      a = 2;
    };

    if ((sc >= wh * 3) && (sc < wh * 4)) {
      a = 3;
    };

    if ((sc >= wh * 4) && (sc < wh * 5)) {
      a = 4;
    };

    if (sc >= wh * 5) {
      a = 5;
    };

    // 헤더 보이기
    let hd = $(window).scrollTop();

    if (hd < 700) {
      $("header").addClass('active');
    } else {
      $("header").removeClass('active');
    };
  });

  /* Header____________________________________ */
  let hd = $(window).scrollTop();

  if (hd < 700) {
    $("header").addClass('active');
  } else {
    $("header").removeClass('active');
  };

  /* Home____________________________________ */
  let $himage = $(".home_view_img");
  let $htext = $(".home_text");
  let $hlbtn = $(".home_left_btn");
  let $hrbtn = $(".home_right_btn");
  let hBtnTxt;
  let oldImage = 0;
  let newImage = 0;
  let oldText = 0;
  let newText = 0;
  let count = $himage.length;

  //이미지 전환효과 함수
  function changeImage(newImage) {
    if (oldImage != newImage) {
      $himage.eq(oldImage).removeClass("himgVisible");
      $himage.eq(newImage).addClass("himgVisible");
      $himage.eq(oldImage).siblings(".home_rod").find(".home_rod_ani").removeClass("hr_ani");
      $himage.eq(newImage).siblings(".home_rod").find(".home_rod_ani").addClass("hr_ani");
    }
    oldImage = newImage;
  };

  //텍스트 전환효과 함수
  function changeText(newText) {
    if (oldText != newText) {
      $htext.eq(oldText).removeClass("htxtVisible")
      $htext.eq(newText).addClass("htxtVisible");
    }
    oldText = newText;
  };

  //자동함수-이미지
  function autoHimage() {
    newImage++;
    if (newImage > count - 1) {
      newImage = 0;
    }
    changeImage(newImage);
    hBtnTxt = newImage;
    pageNum();
  };
  //자동함수-텍스트
  function autoHtext() {
    newText++;
    if (newText > count - 1) {
      newText = 0;
    }
    changeText(newText);
  };

  let timer1 = setInterval(autoHimage, 3000);
  let timer2 = setInterval(autoHtext, 3000);

  //좌우버튼
  $hlbtn.click(function () {
    clearInterval(timer1);
    clearInterval(timer2);
    $(".home_play").hide();
    $(".home_pause").show();

    newImage--;
    if (newImage < 0) {
      newImage = count - 1;
    }
    changeImage(newImage);

    newText--;
    if (newText < 0) {
      newText = count - 1;
    }
    changeText(newText);
    hBtnTxt = newImage;
    pageNum();

    timer1 = setInterval(autoHimage, 3000);
    timer2 = setInterval(autoHtext, 3000);
  });

  $hrbtn.click(function () {
    clearInterval(timer1);
    clearInterval(timer2);
    $(".home_play").hide();
    $(".home_pause").show();

    newImage++;
    if (newImage > count - 1) {
      newImage = 0;
    }
    changeImage(newImage);

    newText++;
    if (newText >= count - 1) {
      newText = 0;
    }
    changeText(newText);
    hBtnTxt = newImage;
    pageNum();

    timer1 = setInterval(autoHimage, 3000);
    timer2 = setInterval(autoHtext, 3000);
  });

  //페이지 번호 표시 함수
  function pageNum() {
    $(".home_btn_txt>span").text(hBtnTxt + 1);
  };

  //정지재생버튼
  $(".home_play").hide();

  $(".home_pause").click(function () {
    clearInterval(timer1);
    clearInterval(timer2);
    $himage.eq(newImage).siblings(".home_rod").find(".home_rod_ani").removeClass("hr_ani");
    $(".home_pause").hide();
    $(".home_play").show();
  });

  //재생막대
  $himage.eq(newImage).siblings(".home_rod").find(".home_rod_ani").addClass("hr_ani");

  //재생버튼
  $(".home_play").click(function () {
    timer1 = setInterval(autoHimage, 3000);
    timer2 = setInterval(autoHtext, 3000);
    $himage.eq(newImage).siblings(".home_rod").find(".home_rod_ani").addClass("hr_ani");
    $(".home_play").hide();
    $(".home_pause").show();
  });

  /* Profile____________________________________ */
  // 프로필 스킬그래프 순차 재생(API)
  const graphs = document.querySelectorAll('.sGraph');

  const keyframes = [
    { transform: 'scaleX(0)' },
    { transform: 'scaleX(1)' }
  ];

  const options = {
    duration: 500,
    direction: 'alternate',
    fill: 'both',
    easing: 'ease-in'
  };

  const effects = [];

  graphs.forEach((graph, index) => {
    const effect = new KeyframeEffect(graph, keyframes, options);
    effects.push(effect);
  });

  const sequenceEffect = new SequenceEffect(effects);
  const animation = document.timeline.play(sequenceEffect);

  /* Web Design____________________________________ */
  // 웹디자인 탭메뉴
  $(".wdTabmenu>a").click(function () {
    $(this).addClass("active").siblings().removeClass("active");

    let wdtab = $(this).attr("data-tab");
    $(".wdTab>div").removeClass("active");
    $("#" + wdtab).addClass("active").hide().fadeIn();
  });

  // 웹디자인 2d 모달
  $(".wdTabImg").click(function () {
    wheel = false;
    wd_pop = $(this).index();
    $(".wd2dBtn_page span:nth-child(1)").text(wd_pop + 1);
    $("html").css({ "overflow-y": "hidden" });
    $(".wd2dPop>div").eq(wd_pop).show();
    $(".wd2dTabPop").stop().fadeIn();
  });

  $(".wd2dBtn_leftBtn").click(function () {
    wheel = false;
    if (wd_pop > 0) {
      $(".wd2dPop>div").eq(wd_pop).stop().fadeOut();
      wd_pop--;
      $(".wd2dBtn_page span:nth-child(1)").text(wd_pop + 1);
      $(".wd2dPop>div").eq(wd_pop).stop().fadeIn();

      $('.wd2dTabPop').animate({ scrollTop: 0 }, 500);
    };
  });

  $(".wd2dBtn_rightBtn").click(function () {
    wheel = false;
    if (wd_pop < 7) {
      $(".wd2dPop>div").eq(wd_pop).stop().fadeOut();
      wd_pop++;
      $(".wd2dBtn_page span:nth-child(1)").text(wd_pop + 1);
      $(".wd2dPop>div").eq(wd_pop).stop().fadeIn();

      $('.wd2dTabPop').animate({ scrollTop: 0 }, 500);
    };
  });

  $(".wd2dBtn_close").click(function () {
    wheel = true;
    $("html").css({ "overflow-y": "scroll" });
    $(".wd2dTabPop").stop().fadeOut();
    $(".wd2dPop>div").stop().hide();
  });

  // 웹디자인 uiux 모달
  $("#wdTab2>div").click(function () {
    wheel = false;
    wdui_pop = $(this).index();

    $(".wduiBtn_page span:nth-child(1)").text(wdui_pop + 1);
    $("html").css({ "overflow-y": "hidden" });
    $(".wduiPop>div").eq(wdui_pop).show();
    $(".wduiTabPop").stop().fadeIn();
  });

  $(".wduiBtn_leftBtn").click(function () {
    wheel = false;
    if (wdui_pop > 0) {
      $(".wduiPop>div").eq(wdui_pop).stop().fadeOut();
      wdui_pop--;
      $(".wduiBtn_page span:nth-child(1)").text(wdui_pop + 1);
      $(".wduiPop>div").eq(wdui_pop).stop().fadeIn();

      $('.wduiTabPop').animate({ scrollTop: 0 }, 500);
    };
  });

  $(".wduiBtn_rightBtn").click(function () {
    wheel = false;
    if (wdui_pop < 7) {
      $(".wduiPop>div").eq(wdui_pop).stop().fadeOut();
      wdui_pop++;
      $(".wduiBtn_page span:nth-child(1)").text(wdui_pop + 1);
      $(".wduiPop>div").eq(wdui_pop).stop().fadeIn();

      $('.wduiTabPop').animate({ scrollTop: 0 }, 500);
    };
  });

  $(".wduiBtn_close").click(function () {
    wheel = true;
    $("html").css({ "overflow-y": "scroll" });
    $(".wduiTabPop").stop().fadeOut();
    $(".wduiPop>div").stop().hide();
  });


  /* Web Publishing____________________________________ */
  /* 안씀 const wpContent = document.querySelector('.wpContentsList');
  const wpContentTimeline = document.querySelector('.wpContentsWrapper');
  
  wpContent.animate(
    [
      { transform: 'translateX(0)'},
      { transform: 'translateX(calc(-100% + 100vw))'}
    ],
    {
      fill: 'both',
      timeline: new ScrollTimeline({
        scrollOffsets: [
          { target: wpContentTimeline, edge: 'start', threshold: 1 },
          { target: wpContentTimeline, edge: 'end', threshold: 1 }
        ]
      })
    }
  ); */
  /*  안씀 let container = $("#scroll");
    let boxes = $(".wpContents");
    let currentIndex = 0;
  
    $(window).on("wheel", function (event) {
      event.preventDefault();
      let deltah = event.originalEvent.daltaY;
  
      if (deltah > 0 && currentIndex < boxes.length - 1) {
        currentIndex++;
      } else if (deltah < 0 && currentIndex > 0) {
        currentIndex--;
      }
  
      let scrollTo = currentIndex * $(window).width();
      container.animate({ scrollLeft: scrollTo }, 500);
    });
  
    $(window).on("resize", function () {
      let scrollTo = currentIndex * $(window).width();
      container.scrollLeft(scrollTo);
    });
   */
  /*  안씀 const cont_2 = document.querySelector('.wpContentsWrapper');
    const slider = document.getElementById('scroll');
    const s_wid = slider.offsetWidth;
    let win_wid = window.innerWidth;
    let s_move_max = (s_wid - (win_wid / 2)) * -1;
    let s_pos = 0;
  
    cont_2.addEventListener('wheel', function (ev) {
      ev.preventDefault;
      if (ev.deltaY < 0 && s_pos >= 0) {
        setTimeout(() => {
          cont_2.style.top = `100%`;
        }, 500);
        return;
      }
      move_slider(ev.deltaY);
    });
  
    function move_slider(amount) {
      s_pos -= amount;
      if (s_pos < s_move_max) {
        s_pos = s_move_max;
        return;
      } else if (s_pos > 0) {
        s_pos = 0;
        return;
      }
      slider.style.transform = `translateX(${s_pos}px)`;
      li_upDown(amount);
    } */
  /* 안씀 const sliderContainer = document.querySelector('.wpContentsWrapper');
   const slider = document.getElementById('scroll');
   const sliderWidth = slider.offsetWidth;
   let windowWidth = window.innerWidth;
   let maxSliderMove = (sliderWidth - (windowWidth / 2)) * -1;
   let sliderPosition = 0;
 
   sliderContainer.addEventListener('wheel', function (ev) {
     ev.preventDefault();
     if (ev.deltaY < 0 && sliderPosition >= 0) {
       setTimeout(() => {
         sliderContainer.style.top = `100%`;
       }, 500);
       return;
     }
     moveSlider(ev.deltaY);
   });
 
   function moveSlider(amount) {
     sliderPosition -= amount;
     if (sliderPosition < maxSliderMove) {
       sliderPosition = maxSliderMove;
     } else if (sliderPosition > 0) {
       sliderPosition = 0;
     }
     slider.style.transform = `translateX(${sliderPosition}px)`;
   }; */
  /* 안씀   export default function initHorizontalScroll() {
      document.querySelectorAll(".wpContentsList").forEach(el => {
          el.addEventListener("wheel", e => {
              // 스크롤이 왼쪽 또는 오른쪽 끝에 도달했는지 확인
              const atLeftEnd = (el.scrollLeft === 0);
              const atRightEnd = (el.scrollLeft + el.offsetWidth >= el.scrollWidth);
  
              // 휠 이벤트가 위로 가는 것인지 아래로 가는 것인지 확인
              const scrollingUp = (e.deltaY < 0);
              const scrollingDown = (e.deltaY > 0);
  
              if ((atLeftEnd && scrollingUp) || (atRightEnd && scrollingDown)) {
                  // 스크롤이 양 끝에 있고 사용자가 해당 방향으로 계속 스크롤하려고 하면,
                  // 이벤트의 기본 동작을 수행하여 수직 스크론을 허용합니다.
                  return;
              }
  
              // 그렇지 않으면, 가로 스크롤을 진행합니다.
              e.preventDefault();
              // noinspection JSSuspiciousNameCombination
              el.scrollLeft += e.deltaY;
          })
      });
  } */
  /* 안씀 document.querySelectorAll("#scroll").forEach(el => {

    let isScrolling = false;
    let scrollTarget = 0;

  el.addEventListener("wheel", e => {
    e.preventDefault();

    const delta = e.deltaY;
    scrollTarget += delta;

    if (!isScrolling) {
      requestAnimationFrame(function animateScroll() {
        el.scrollLeft += (scrollTarget - el.scrollLeft) * 0.1;
        isScrolling = Math.abs(scrollTarget - el.scrollLeft) > 0.5;

        if (isScrolling) {
          requestAnimationFrame(animateScroll);
        }
      });
    }
  });
}); */
  /*   $(".wpContent").mouseenter(function () {
      $(this).css("backgroundPosition", "0 100%");
    });
  
    $(".wpContent").mouseleave(function () {
      $(this).css("backgroundPosition", "0 0");
    }); */

  $('.wpContentsList').slick({
    arrows: true,
    speed: 500,
  });

  $(".slick-prev").click(function () {
    $('.wpContent').animate({ scrollTop: 0 }, 1000);
  });

  $(".slick-next").click(function () {
    $('.wpContent').animate({ scrollTop: 0 }, 1000);
  });


  /* Responsive Web____________________________________ */
  $(".up").mouseenter(function () {
    $(this).css("backgroundPosition", "0 100%");
  });

  $(".up").mouseleave(function () {
    $(this).css("backgroundPosition", "0 0");
  });

  $(".btnView").click(function () {//각 메뉴를 클릭했을때
    $(this).next().show(); //다음 형제인 .pop을 보이게함
    $("html").css({ overflowY: "hidden" });//body스크롤없앰
    return false;
  });

  $(".resPopClose").click(function () {//close눌렀을때
    $(".resPop").hide(); //.pop을 안보이게함
    $("html").css({ "overflow-y": "scroll" });//body스크롤생김	
  });

  // 검정 배경 클릭시 닫기
  $(".resPop").click(function () {
    $("html").css({ "overflow-y": "scroll" });
    $(".resPop").hide();
  });



  /* Web Planning____________________________________ */
  // 웹기획 메인탭메뉴
  $(".wplTab>li").click(function () {
    $(this).addClass("active");
    $(this).siblings().removeClass("active");

    let tabId = $(this).attr("data-wpl");
    $(".wplcontentList li").removeClass("active");
    $("#" + tabId).addClass("active").fadeIn();
  });

  //해당 탭메뉴를 클릭할때 해당 첫 썸네일을 클릭시킴
  $(".wplTab>li:first-child").click(function () {
    $(".wplContent1 .wplMenu li:first-child").click();
  });
  $(".wplTab>li:nth-child(2)").click(function () {
    $(".wplContent2 .wplMenu li:first-child").click();
  });
  $(".wplTab>li:nth-child(3)").click(function () {
    $(".wplContent3 .wplMenu li:first-child").click();
  });
  $(".wplTab>li:nth-child(4)").click(function () {
    $(".wplContent4 .wplMenu li:first-child").click();
  });

  //탭메뉴별 이미지갤러리

  //tab-1
  let wploldidxA = 0;
  let wplidxA = 0;

  function wplImgA(wplidxA) {
    if (wploldidxA != wplidxA) {
      $(".wplContent1 .wplMenu p").eq(wploldidxA).css({ "color": "#333", "background-color": "#f2dabb" });
      $(".wplContent1 .wplMenu p").eq(wplidxA).css({ "color": "#fff", "background-color": "#0086aa" });
      $(".wplContent1 .wplImage li").eq(wploldidxA).stop().fadeOut(100);
      $(".wplContent1 .wplImage li").eq(wplidxA).stop().fadeIn(100);
    };
    wploldidxA = wplidxA;
  };

  $(".wplContent1 .wplMenu p").click(function () {
    wplidxA = $(this).index();
    wplImgA(wplidxA)
  });

  //tab-2
  let wploldidxB = 0;
  let wplidxB = 0;

  function wplImgB(wplidxB) {
    if (wploldidxB != wplidxB) {
      $(".wplContent2 .wplMenu p").eq(wploldidxB).css({ "color": "#333", "background-color": "#f2dabb" });
      $(".wplContent2 .wplMenu p").eq(wplidxB).css({ "color": "#fff", "background-color": "#0086aa" });
      $(".wplContent2 .wplImage li").eq(wploldidxB).stop().fadeOut(100);
      $(".wplContent2 .wplImage li").eq(wplidxB).stop().fadeIn(100);
    };
    wploldidxB = wplidxB;
  };

  $(".wplContent2 .wplMenu p").click(function () {
    wplidxB = $(this).index();
    wplImgB(wplidxB)
  });

  //tab-3
  let wploldidxC = 0;
  let wplidxC = 0;

  function wplImgC(wplidxC) {
    if (wploldidxC != wplidxC) {
      $(".wplContent3 .wplMenu p").eq(wploldidxC).css({ "color": "#333", "background-color": "#f2dabb" });
      $(".wplContent3 .wplMenu p").eq(wplidxC).css({ "color": "#fff", "background-color": "#0086aa" });
      $(".wplContent3 .wplImage li").eq(wploldidxC).stop().fadeOut(100);
      $(".wplContent3 .wplImage li").eq(wplidxC).stop().fadeIn(100);
    };
    wploldidxC = wplidxC;
  };

  $(".wplContent3 .wplMenu p").click(function () {
    wplidxC = $(this).index();
    wplImgC(wplidxC)
  });

  //tab-4
  let wploldidxD = 0;
  let wplidxD = 0;

  function wplImgD(wplidxD) {
    if (wploldidxD != wplidxD) {
      $(".wplContent4 .wplMenu p").eq(wploldidxD).css({ "color": "#333", "background-color": "#f2dabb" });
      $(".wplContent4 .wplMenu p").eq(wplidxD).css({ "color": "#fff", "background-color": "#0086aa" });
      $(".wplContent4 .wplImage li").eq(wploldidxD).stop().fadeOut(100);
      $(".wplContent4 .wplImage li").eq(wplidxD).stop().fadeIn(100);
    };
    wploldidxD = wplidxD;
  };

  $(".wplContent4 .wplMenu p").click(function () {
    wplidxD = $(this).index();
    wplImgD(wplidxD)
  });
});


