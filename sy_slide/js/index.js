$(document).ready(function () {
  /* Body____________________________________ */
  /* 스크롤 풀 페이지 */
  /*  안씀 let wh = $(window).height();
  
    $(window).resize(function () {
      let wh = $(window).height();
      $("html,body").stop().animate({ scrollTop: wh * a }, 500);
    });
  
    $("#gnb li, .mainIndicator>div").click(function () {
      let num = $(this).index();
      $("#tt").text(num);
      $(".mainIndicator>div").eq(num).addClass("active").siblings().removeClass("active");
      $("html, body").stop().animate({ scrollTop: wh * num }, 500);
    });
  
    let a = 0;
    let area_n = $(".area").length;
    let wheel = true;
  
    $(".area").on("mousewheel DOMMouseScroll", function (e, delta) {
      e.preventDefault();
  
      if (wheel) {
        let n = $(this).index();
        if (delta < 0) {
          a = n + 1;
        } else {
          a = n - 1;
        };
  
        if (a <= 0) { a = 0; }
        if (a >= area_n - 1) { a = area_n - 1; }
  
        $(".mainIndicator>div").eq(a).addClass("active");
        $(".mainIndicator>div").eq(a).siblings().removeClass("active");
        $("html, body").stop().animate({ scrollTop: wh * a }, 500);
      };
    });
  
    $(window).scroll(function () {
      let sc = $(document).scrollTop();
  
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
  
      if ((sc >= wh * 4)) {
        a = 4;
      };
    }); */
  /*  안씀 $(function () {
      const sectionHeight = $(window).height();
      let wheelEnabled = true;
      const numSections = $(".area").length;
      let currentSectionIndex = 0;
  
      $(window).resize(function () {
        // scrollToSection(currentSectionIndex);
      });
  
      $("#gnb li, .mainIndicator>div").click(function () {
        const num = $(this).index();
        $(".mainIndicator>div").eq(num).addClass("active").siblings().removeClass("active");
        scrollToSection(num);
      });
  
      $(".area").on("mousewheel DOMMouseScroll", function (e, delta) {
        e.preventDefault();
  
        if (wheelEnabled) {
          let newIndex = $(this).index() + (delta < 0 ? 1 : -1);
          newIndex = Math.max(0, Math.min(newIndex, numSections - 1));
  
          currentSectionIndex = newIndex;
  
          $(".mainIndicator>div").eq(currentSectionIndex).addClass("active").siblings().removeClass("active");
          scrollToSection(currentSectionIndex);
        }
      });
  
      $(window).scroll(function () {
        const scrollTop = $(document).scrollTop();
        currentSectionIndex = Math.floor(scrollTop / sectionHeight);
      });
  
      function scrollToSection(indext) {
        const scrollTop = sectionHeight * indext;
        $("html, body").stop().animate({ scrollTop: scrollTop }, 500);
      }
    }); */

  //브라우저 높이 가져오기
  let wh = $(window).height();

  /*브라우저 창 사이즈 변경시___________ */
  $(window).resize(function () {
    location.reload();  //새로고침
    let wh = $(window).height();
    $("html,body").stop().animate({ scrollTop: wh * a }, 500);
  });

  /* 탑메뉴 클릭시______________________ */
  $("#gnb li,.mainIndicator>div").click(function () {
    let num = $(this).index();
    $(".mainIndicator>div").eq(num).addClass("active");
    $(".mainIndicator>div").eq(num).siblings().removeClass("active");
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

      $(".mainIndicator>div").eq(a).addClass("active");
      $(".mainIndicator>div").eq(a).siblings().removeClass("active");
      $("html,body").stop().animate({ scrollTop: wh * a }, 500);
    }
  });

  $(".wpContent").on("mouseenter DOMMouseScroll", function (e, delta) {
    wheel = false;
  });
  $(".wpContent").on("mouseleave DOMMouseScroll", function (e, delta) {
    wheel = true;
  });
  $(".wplInner").on("mouseenter DOMMouseScroll", function (e, delta) {
    wheel = false;
  });
  $(".wplInner").on("mouseleave DOMMouseScroll", function (e, delta) {
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
  });

  /* Header____________________________________ */
  /* 햄버거메뉴 */
  $(".hamburger").click(function () {
    $(this).toggleClass("active");
    $("#gnb").stop(true, true).animate({ width: 'toggle' }, 300);
  });


  /* Profile____________________________________ */
  /* 프로필 스킬그래프 순차 재생(API) */
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
  /* 웹디자인 탭메뉴 */
  $(".wdTabmenu li").click(function () {
    $(this).addClass("active");
    $(this).siblings().removeClass("active");

    let wdtab = $(this).attr("data-tab");
    $(".wdTab li").removeClass("active");
    $("#" + wdtab).addClass("active").hide().fadeIn();
  });

  /* 웹디자인 2d 모달 */
  $("#wdTab1 ul").click(function () {
    wheel = false;
    wd_pop = $(this).index();
    $(".wd2dBtn_page span:nth-child(1)").text(wd_pop + 1);
    $("html").css({ "overflow-y": "hidden" });
    $(".wd2dPop li").eq(wd_pop).show();
    $(".wd2dTabPop").stop().fadeIn();
  });

  $(".wd2dBtn_leftBtn").click(function () {
    wheel = false;
    if (wd_pop > 0) {
      $(".wd2dPop>li").eq(wd_pop).stop().fadeOut();
      wd_pop--;
      $(".wd2dBtn_page span:nth-child(1)").text(wd_pop + 1);
      $(".wd2dPop li").eq(wd_pop).stop().fadeIn();

      $('.wd2dTabPop').animate({ scrollTop: 0 }, 500);
    };
  });

  $(".wd2dBtn_rightBtn").click(function () {
    wheel = false;
    if (wd_pop < 7) {
      $(".wd2dPop li").eq(wd_pop).stop().fadeOut();
      wd_pop++;
      $(".wd2dBtn_page span:nth-child(1)").text(wd_pop + 1);
      $(".wd2dPop li").eq(wd_pop).stop().fadeIn();

      $('.wd2dTabPop').animate({ scrollTop: 0 }, 500);
    };
  });

  $(".wd2dBtn_close").click(function () {
    wheel = true;
    $("html").css({ "overflow-y": "scroll" });
    $(".wd2dTabPop").stop().fadeOut();
    $(".wd2dPop li").stop().hide();
  });

  /* 웹디자인 uiux 모달 */
  $("#wdTab2 ul").click(function () {
    wheel = false;
    wdui_pop = $(this).index();

    $(".wduiBtn_page span:nth-child(1)").text(wdui_pop + 1);
    $("html").css({ "overflow-y": "hidden" });
    $(".wduiPop>li").eq(wdui_pop).show();
    $(".wduiTabPop").stop().fadeIn();
  });

  $(".wduiBtn_leftBtn").click(function () {
    wheel = false;
    if (wdui_pop > 0) {
      $(".wduiPop>li").eq(wdui_pop).stop().fadeOut();
      wdui_pop--;
      $(".wduiBtn_page span:nth-child(1)").text(wdui_pop + 1);
      $(".wduiPop>li").eq(wdui_pop).stop().fadeIn();

      $('.wduiTabPop').animate({ scrollTop: 0 }, 500);
    };
  });

  $(".wduiBtn_rightBtn").click(function () {
    wheel = false;
    if (wdui_pop < 7) {
      $(".wduiPop>li").eq(wdui_pop).stop().fadeOut();
      wdui_pop++;
      $(".wduiBtn_page span:nth-child(1)").text(wdui_pop + 1);
      $(".wduiPop>li").eq(wdui_pop).stop().fadeIn();

      $('.wduiTabPop').animate({ scrollTop: 0 }, 500);
    };
  });

  $(".wduiBtn_close").click(function () {
    wheel = true;
    $("html").css({ "overflow-y": "scroll" });
    $(".wduiTabPop").stop().fadeOut();
    $(".wduiPop li").stop().hide();
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

  $('.wpContentsList').slick({
    arrows: true,
    speed: 500,
  });
  // $('.wpContentsList').animate({ scrollTop: 0 }, 500);

  /*   $(".wpContent").mouseenter(function () {
      $(this).css("backgroundPosition", "0 100%");
    });
  
    $(".wpContent").mouseleave(function () {
      $(this).css("backgroundPosition", "0 0");
    }); */

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

  /*검정 배경 클릭시 닫기*/
  $(".resPop").click(function () {
    $("html").css({ "overflow-y": "scroll" });
    $(".resPop").hide();
  });


  /* Web Planning____________________________________ */
  /* 웹기획 메인탭메뉴 */
  /* 안씀  $(".wplcontentTitle li").click(function () {
      $(this).addClass("active").siblings().removeClass("active");
  
      let tabIdt = $(this).attr("data-wpl");
      $(".wplcontentList li").removeClass("active");
      $("#" + tabIdt).addClass("active").hide().fadeIn();
  
      $("#" + tabIdt + " .wplMenu>li:first-child").click();
    });
  
    $(".wplMenu li").click(function () {
      $(this).addClass("active").siblings().removeClass("active");
  
      if ($(this).attr("data-imbtn")) {
        let tabId = $(this).attr("data-imbtn");
        $(".wplInner li").removeClass("active");
        $("#" + tabId).addClass("active").hide().fadeIn();
      } else if ($(this).attr("data-yobtn")) {
          let tabId = $(this).attr("data-yobtn");
          $(".wplInner li").removeClass("active");
          $("#" + tabId).addClass("active").hide().fadeIn();
      } else if ($(this).attr("data-webbtn")) {
          let tabId = $(this).attr("data-webbtn");
          $(".wplInner li").removeClass("active");
          $("#" + tabId).addClass("active").hide().fadeIn();
      } else if ($(this).attr("data-thebtn")) {
          let tabId = $(this).attr("data-thebtn");
          $(".wplInner li").removeClass("active");
          $("#" + tabId).addClass("active").hide().fadeIn();
      }
    }); */
  /* 안씀 const subTabNav = $(".wplMenu>li>a");
  const tabNav = $(".wplcontentTitle>li>a");
  const tabNavLi = $(".wplcontentList>li>a");

  subTabNav.on("click", function (e) {
    e.preventDefault();
    const target = $(this).attr("href");

    $(target).addClass("active").siblings('.active').removeClass("active");
    $(this).closest('li>a').addClass("active").siblings().removeClass("active");
});

// 메인 탭 클릭 이벤트 핸들러
tabNav.on("click", function (e) {
  e.preventDefault();
  const target = $(this).attr("href");

  // 해당 메인 탭 활성화
  $(target).addClass("active").siblings('.active').removeClass("active");
  $(this).closest('li').addClass("active").siblings().removeClass("active");

  // 서브 탭 유지 또는 첫 번째 서브 탭 활성화
  const subTabActive = $(target).find('.wplMenu>li>a.active');
  if (!subTabActive.length) {
      $(target).find('.wplMenu>li:first-child>a').trigger('click');
  } else {
      subTabActive.find('a').trigger('click');
  }
});

// 페이지 로드 시 첫 번째 탭 활성화
const mainTabActive = tabNavLi.filter('.active');
if (!mainTabActive.length) {
  tabNavLi.first().find('a').trigger('click');
} else {
  mainTabActive.find('a').trigger('click');
}
 */

  /* $(".wplcontentTitle>li").click(function () {
    $(this).addClass("active").siblings().removeClass("active");

    let tabId1 = $(this).attr("data-wpl");
    $("#" + tabId1).addClass("active").fadeIn().siblings().removeClass("active");

    $("#" + tabId1 + " .wplMenu>li:first-child").click();
  });

  $("#wpl1").click(function () {
    $(this).addClass("active").siblings().removeClass("active");

    let tab2Id1 = $(this).attr("data-imbtn");
    $("#" + tab2Id1).addClass("active").fadeIn().siblings().removeClass("active");
  }); */

  // $(".wplcontent.active").find(".wplMenu li.active").trigger("click");

  $(".wplcontentTitle>li").click(function () {
    $(this).addClass("active").siblings().removeClass("active");

    var tabId1 = $(this).attr('data-wpl');
    $(this).addClass('active').siblings().removeClass('active');
    $("#" + tabId1).addClass('active').siblings().removeClass('active');

    // $("#" + tabId1 + " .wplMenu>li:first-child").click();
  });

  // 탭 메뉴 클릭 이벤트 처리
  $(".wplMenu li").click(function () {
    $(this).addClass("active").siblings().removeClass("active");

    var tab_id = $(this).attr('data-imbtn') || $(this).attr('data-yobtn') || $(this).attr('data-webbtn') || $(this).attr('data-thebtn');
    // 해당 탭을 활성화하고 다른 탭은 비활성화합니다.
    $(this).addClass('active').siblings().removeClass('active');
    $("#" + tab_id).addClass('active').siblings().removeClass('active');
  });

  /* 웹기획 이미지 */
  /* 안씀 function wplImgList(sbtnLeft, sbtnRight, wplImage, totalImages) {
    let wploldidx = 0;
    let wplidx = 0;

    function wplImg(wplidx) {
      $(wplImage).stop().hide();
      $(wplImage).eq(wplidx).stop().show();
      wploldidx = wplidx;
    }

    $(sbtnLeft).click(function () {
      wplidx--;
      if (wplidx < 0) {
        wplidx = totalImages - 1;
      }
      wplImg(wplidx);
    });

    $(sbtnRight).click(function () {
      wplidx++;
      if (wplidx > totalImages - 1) {
        wplidx = 0;
      }
      wplImg(wplidx);
    });
    wplImg(wplidx);
  };

  $(".wplImage").each(function () {
    $(this).find("li").hide().first().show();
  });

  wplImgList(".s1btnLeft", ".s1btnRight", ".wpl1Image li", 15);
  wplImgList(".s3btnLeft", ".s3btnRight", ".wpl3Image li", 7);
  wplImgList(".s5btnLeft", ".s5btnRight", ".wpl5Image li", 4);
  wplImgList(".sbtnyo1Left", ".sbtnyo1Right", ".wplyo1Image li", 8);
  wplImgList(".sbtnyo2Left", ".sbtnyo2Right", ".wplyo2Image li", 2);
  wplImgList(".sbtnwt1Left", ".sbtnwt1Right", ".wplwt1Image li", 13); */
  /* let wploldidx = 0;
  let wplidx = 0;

  function wplImg1(wplidx) {
    if (wploldidx != wplidx) {
      $(".wpl1Image>li").eq(wploldidx).stop().fadeOut(100);
      $(".wpl1Image>li").eq(wplidx).stop().fadeIn(100);
    };
    wploldidx = wplidx;
  };

  $(".s1btnLeft").click(function () {
    wplidx--;
    if (wplidx < 0) {
      wplidx = 14;
    }
    wplImg1(wplidx);
  });

  $(".s1btnRight").click(function () {
    wplidx++;
    if (wplidx > 14) {
      wplidx = 0;
    }
    wplImg1(wplidx);
  });

  function wplImg2(wplidx) {
    if (wploldidx != wplidx) {
      $(".wpl3Image li").eq(wploldidx).stop().fadeOut(300);
      $(".wpl3Image li").eq(wplidx).stop().fadeIn(300);
    };
    wploldidx = wplidx;
  };

  $(".s3btnLeft").click(function () {
    wplidx--;
    if (wplidx < 0) {
      wplidx = 6;
    }
    wplImg2(wplidx);
  });

  $(".s3btnRight").click(function () {
    wplidx++;
    if (wplidx > 6) {
      wplidx = 0;
    }
    wplImg2(wplidx);
  });

  function wplImg3(wplidx) {
    if (wploldidx != wplidx) {
      $(".wpl5Image li").eq(wploldidx).stop().fadeOut(300);
      $(".wpl5Image li").eq(wplidx).stop().fadeIn(300);
    };
    wploldidx = wplidx;
  };

  $(".s5btnLeft").click(function () {
    wplidx--;
    if (wplidx < 0) {
      wplidx = 3;
    }
    wplImg3(wplidx);
  });

  $(".s5btnRight").click(function () {
    wplidx++;
    if (wplidx > 3) {
      wplidx = 0;
    }
    wplImg3(wplidx);
  });

  function wplImg4(wplidx) {
    if (wploldidx != wplidx) {
      $(".wplyo1Image li").eq(wploldidx).stop().fadeOut(300);
      $(".wplyo1Image li").eq(wplidx).stop().fadeIn(300);
    };
    wploldidx = wplidx;
  };

  $(".sbtnyo1Left").click(function () {
    wplidx--;
    if (wplidx < 0) {
      wplidx = 7;
    }
    wplImg4(wplidx);
  });

  $(".sbtnyo1Right").click(function () {
    wplidx++;
    if (wplidx > 7) {
      wplidx = 0;
    }
    wplImg4(wplidx);
  }); */
  /* function createImageSlider(sbtnLeft, sbtnRight, wplImage, totalImages) {
    let wploldidx = 0;
    let wplidx = 0;

    function wplImg(wplidx) {
      if (wploldidx != wplidx) {
        $(wplImage).eq(wploldidx).stop().fadeOut(300);
        $(wplImage).eq(wplidx).stop().fadeIn(300);
      }
      wploldidx = wplidx;
    }

    $(sbtnLeft).click(function () {
      wplidx--;
      if (wplidx < 0) {
        wplidx = totalImages - 1;
      }
      wplImg(wplidx);
    });

    $(sbtnRight).click(function () {
      wplidx++;
      if (wplidx >= totalImages) {
        wplidx = 0;
      }
      wplImg(wplidx);
    });
  };
  createImageSlider(".s1btnLeft", ".s1btnRight", ".wpl1Image li", 15);
  createImageSlider(".s3btnLeft", ".s3btnRight", ".wpl3Image li", 7);
  createImageSlider(".s5btnLeft", ".s5btnRight", ".wpl5Image li", 4);
  createImageSlider(".sbtnyo1Left", ".sbtnyo1Right", ".wplyo1Image li", 8);
  createImageSlider(".sbtnyo2Left", ".sbtnyo2Right", ".wplyo2Image li", 2);
  createImageSlider(".sbtnwt1Left", ".sbtnwt1Right", ".wplwt1Image li", 13); */
});


