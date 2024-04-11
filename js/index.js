$(document).ready(function () {
  /* Body____________________________________ */
  /* 스크롤 풀 페이지 */
  //브라우저 높이 가져오기
  let wh = $(window).height();

  /*브라우저 창 사이즈 변경시___________ */
  $(window).resize(function () {
    wh = $(window).height();
    $("html,body").stop().animate({ scrollTop: wh * a }, 500);
  });

  /* 인디케이터, gnb, 홈메뉴 클릭시______________________ */
  $(".mainIndicator p, #gnb>li").click(function () {
    let num = $(this).index();
    $(".mainIndicator p").eq(num).addClass("active");
    $(".mainIndicator p").eq(num).siblings().removeClass("active");
    $("#gnb>li").eq(num).addClass("active");
    $("#gnb>li").eq(num).siblings().removeClass("active");

    $("html,body").stop().animate({ scrollTop: wh * num }, 500);
  });

  $(".home_menu ul li").click(function () {
    let num = $(this).index() + 1;
    $(".mainIndicator p").eq(num).addClass("active");
    $(".mainIndicator p").eq(num).siblings().removeClass("active");
    $("#gnb>li").eq(num).addClass("active");
    $("#gnb>li").eq(num).siblings().removeClass("active");

    $("html,body").stop().animate({ scrollTop: wh * num }, 500);
  });

  $(".topBtn").click(function () {
    $(".gnb li:first-child").addClass("active").siblings().removeClass("active");
    $(".mainIndicator .mi1").addClass("active").siblings().removeClass("active");

    let num = $(".home").offset().top;
    $("html,body").stop().animate({ scrollTop: num }, 500);
  });

  /* 마우스휠__________________________ */
  let a = 0;
  let area_n = $(".area").length;
  let wheel = true;

  $(".area").on("mousewheel DOMMouseScroll", function (e, delta) {
    if (wheel) {
      let n = $(this).index();

      if (delta < 0) {
        a = n + 1;
      } else {
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

  $(".wplImage").on("mouseenter DOMMouseScroll", function () {
    wheel = false;
  });
  $(".wplImage").on("mouseleave DOMMouseScroll", function () {
    wheel = true;
  });


  /*스크롤이벤트______________________ */
  $(window).scroll(function () {
    let sc = $(document).scrollTop();

    // 헤더 보이기
    let hd = $(window).scrollTop();

    if (hd < 700) {
      $("header").addClass('active');
    } else {
      $("header").removeClass('active');
    };

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
  /* 슬릭슬라이더 */
  $('.wpContentsList').slick({
    arrows: true,
    speed: 500,
  });

  /* 어바웃디자인 모달창 */
  $(".wpViewAboutBtn1").click(function () {
    wheel = false;
    $("html").css({ "overflow-y": "hidden" });
    $(".wpConTextModal1").fadeIn();
  });
  $(".wpViewAboutBtn2").click(function () {
    wheel = false;
    $("html").css({ "overflow-y": "hidden" });
    $(".wpConTextModal2").fadeIn();
  });
  $(".wpViewAboutBtn3").click(function () {
    wheel = false;
    $("html").css({ "overflow-y": "hidden" });
    $(".wpConTextModal3").fadeIn();
  });

  $(".wpConTextPopClose, .wpConTextModal").click(function () {
    wheel = true;
    $("html").css({ "overflow-y": "scroll" });
    $(".wpConTextModal").fadeOut();
  });

  /* Responsive Web____________________________________ */
  $(".up").mouseenter(function () {
    $(this).css("backgroundPosition", "0 100%");
  });

  $(".up").mouseleave(function () {
    $(this).css("backgroundPosition", "0 0");
  });

  $(".btnView").click(function () {
    $(this).next().show();
    $("html").css({ "overflow-y": "hidden" });
    return false;
  });

  $(".resPopClose").click(function () {
    $(".resPop").hide();
    $("html").css({ "overflow-y": "scroll" });
  });

  $(".resPop").click(function () {
    $("html").css({ "overflow-y": "scroll" });
    $(".resPop").hide();
  });

  /* about modal */
  $(".resAboutBtn").click(function () {
    wheel = false;
    $("html").css({ "overflow-y": "hidden" });
    $(".resModal").fadeIn();
  });

  $(".resClose, .resModal").click(function () {
    wheel = true;
    $("html").css({ "overflow-y": "scroll" });
    $(".resModal").fadeOut();
  });

  /* Web Planning____________________________________ */
  // 웹기획 메인탭메뉴
  $(".wplTab>li").click(function () {
    $(this).addClass("active");
    $(this).siblings().removeClass("active");

    let tabId = $(this).attr("data-wpl");
    $(".wplcontentList li").removeClass("active");
    $("#" + tabId).addClass("active").fadeIn();

    let wplview = $(".wplView").index();
    $(".wplView").removeClass("active");
    $("." + wplview).addClass("active").fadeIn();

    $(".wplImage>li").animate({ scrollTop: 0 }, 300);
  });

  $(".wplTab>li:first-child").click(function () {
    $(".wplContent1 .wplMenu p:first-child").click();
  });
  $(".wplTab>li:nth-child(2)").click(function () {
    $(".wplContent2 .wplMenu p:first-child").click();
  });
  $(".wplTab>li:nth-child(3)").click(function () {
    $(".wplContent3 .wplMenu p:first-child").click();
  });
  $(".wplTab>li:nth-child(4)").click(function () {
    $(".wplContent4 .wplMenu p:first-child").click();
  });

  //탭메뉴별 이미지갤러리
  $(".wplImage li").mouseenter(function () {
    wheel = false;
  });

  $(".wplImage li").mouseleave(function () {
    wheel = true;
  });
  $(".wplView").mouseenter(function () {
    wheel = false;
  });

  $(".wplView").mouseleave(function () {
    wheel = true;
  });

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

    $(".wplImage>li").animate({ scrollTop: 0 }, 300);
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

    $(".wplImage>li").animate({ scrollTop: 0 }, 500);
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

    $(".wplImage>li").animate({ scrollTop: 0 }, 300);
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

    $(".wplImage>li").animate({ scrollTop: 0 }, 300);
  });


  /* wpl view scroll */
  $(".up").mouseenter(function () {
    $(this).css("backgroundPosition", "0 100%");
  });
  $(".wplPcImImg").mouseleave(function () {
    $(this).css("backgroundPosition", "0 0");
  });

  /* popup */
  $(".wplAboutBtn").click(function () {
    wheel = false;
    $(".wplAboutPopbg").stop().fadeIn();

    $("html").css("overflow-y", "hidden");
  });

  $(".wplClose").click(function () {
    wheel = true;
    $('.wplAboutPopbg').animate({ scrollTop: 0 }, 100, function () {
      $(".wplAboutPopbg").stop().fadeOut();
      $("html").css("overflow-y", "scroll");
    });
  });
});


