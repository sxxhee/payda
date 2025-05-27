$(document).ready(function () {
  // 스크롤 이벤트 처리
  $(window).on("scroll", function () {
    let scrollTop = $(window).scrollTop();
    let windowHeight = $(window).height();

    // home-left가 보일 때 fade-left 애니메이션 적용
    $(".home-left").each(function () {
      let elementOffsetTop = $(this).offset().top;
      if (scrollTop + windowHeight > elementOffsetTop && !$(this).hasClass("fade-left")) {
        $(this).addClass("fade-left");
      } else if (scrollTop + windowHeight < elementOffsetTop && $(this).hasClass("fade-left")) {
        $(this).removeClass("fade-left");
      }
    });

    // home-right가 보일 때 fade-right 애니메이션 적용
    $(".home-right").each(function () {
      let elementOffsetTop = $(this).offset().top;
      if (scrollTop + windowHeight > elementOffsetTop && !$(this).hasClass("fade-right")) {
        $(this).addClass("fade-right");
      } else if (scrollTop + windowHeight < elementOffsetTop && $(this).hasClass("fade-right")) {
        $(this).removeClass("fade-right");
      }
    });

    // download-left가 보일 때 fade-left 애니메이션 적용
    $(".download-left").each(function () {
      let elementOffsetTop = $(this).offset().top;
      if (scrollTop + windowHeight > elementOffsetTop && !$(this).hasClass("fade-left")) {
        $(this).addClass("fade-left");
      } else if (scrollTop + windowHeight < elementOffsetTop && $(this).hasClass("fade-left")) {
        $(this).removeClass("fade-left");
      }
    });

    // download-left 아래에 있는 div (폰 이미지) fade-right 애니메이션 적용
    $(".download-wrap > div:not(.download-left)").each(function () {
      let elementOffsetTop = $(this).offset().top;
      if (scrollTop + windowHeight > elementOffsetTop && !$(this).hasClass("fade-right")) {
        $(this).addClass("fade-right");
      } else if (scrollTop + windowHeight < elementOffsetTop && $(this).hasClass("fade-right")) {
        $(this).removeClass("fade-right");
      }
    });
  });

  // 처음 로드될 때 스크롤 감지
  $(window).trigger("scroll");
});

$(document).ready(function () {
  // 스크롤 이벤트 처리
  $(window).on("scroll", function () {
    let scrollTop = $(window).scrollTop();
    let windowHeight = $(window).height();

    // main-left와 main-right의 요소들이 보일 때 애니메이션 적용
    $(".main-left, .main-right .box").each(function () {
      let elementOffsetTop = $(this).offset().top;

      // 요소가 화면에 보일 때 fade-in 애니메이션을 추가
      if (scrollTop + windowHeight > elementOffsetTop) {
        $(this).addClass("fade-up");
      }
    });
  });

  // 처음 로드될 때 스크롤 감지
  $(window).trigger("scroll");
});
