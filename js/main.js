$(document).ready(function () {
  // 슬라이드 관련 변수 설정
  let currentIndex = 0;
  const slides = $(".left ul li");
  const rightItems = $(".right li");
  const totalSlides = slides.length;
  const txt1 = $(".cont .txt1");
  const txtImg = $(".txt-img");
  const fixedMain = $(".fixed-main"); // fixed-main 요소 선택
  const bgElements = $(".bg"); // bg 요소들 선택
  const scrollBgElements = $(".main-scroll-bg01, .main-scroll-bg02, .main-scroll-bg03, .main-scroll-bg04"); // 스크롤 배경들

  // 슬라이드를 업데이트하는 함수
  function updateSlide() {
    slides.each(function (index) {
      if (index === currentIndex) {
        $(this).css({
          top: "0",
          transition: "top 1s ease-in-out", // 슬라이드 애니메이션 시간 설정
        });
      } else {
        $(this).css({
          top: "100%",
          transition: "top 1s ease-in-out", // 슬라이드 애니메이션 시간 설정
        });
      }
    });

    rightItems.each(function (index) {
      $(this).css("opacity", index === currentIndex ? "1" : "0");
    });

    txt1.text(String(currentIndex + 1).padStart(2, "0"));

    // 배경 업데이트
    bgElements.each(function (index) {
      if (index === currentIndex) {
        $(this).css({
          "background-image": `url('img/slide${index + 1}.png')`, // 각 슬라이드에 맞는 bg 이미지 적용
          opacity: 1,
          transition: "opacity 500ms", // 부드럽게 fade-in
        });
      } else {
        $(this).css({
          opacity: 0,
        });
      }
    });
  }

  // 슬라이드가 시작될 때 fixed로 설정
  function setFixedPosition() {
    fixedMain.addClass("fixed-on"); // 슬라이드 시작 시 fixed-on 클래스 추가
    fixedMain.removeClass("fixed-end"); // fixed-end 클래스 제거
  }

  // 스크롤 이벤트 처리 (배경에 도달할 때마다 슬라이드 변경)
  $(window).on("scroll", function () {
    let scrollTop = $(window).scrollTop();

    scrollBgElements.each(function (index) {
      // 각 배경에 대해 현재 스크롤 위치가 해당 배경에 도달했을 때 슬라이드 변경
      let elementOffsetTop = $(this).offset().top;

      if (scrollTop >= elementOffsetTop - $(window).height() / 2 && scrollTop < elementOffsetTop + $(this).outerHeight()) {
        currentIndex = index; // 해당하는 배경에 도달하면 해당 인덱스의 슬라이드로 변경
        setFixedPosition(); // 슬라이드가 시작될 때 고정 위치로 설정
        updateSlide();
      }
    });

    // bg04 끝에 도달할 때 fixed-on 제거, fixed-end 추가
    let bg4OffsetTop = $(".main-scroll-bg04").offset().top;
    let bg4Height = $(".main-scroll-bg04").outerHeight();
    let scrollBottom = scrollTop + $(window).height();

    if (scrollBottom >= bg4OffsetTop + bg4Height) {
      fixedMain.removeClass("fixed-on"); // bg4 끝에 도달하면 fixed-on 제거
      fixedMain.addClass("fixed-end"); // fixed-end 클래스 추가
    } else {
      // bg4가 끝나지 않았으면 fixed-on 클래스를 유지
      fixedMain.addClass("fixed-on");
      fixedMain.removeClass("fixed-end"); // fixed-end 클래스 제거
    }

    // bg1에 도달하면 fixed-on 제거
    let bg1OffsetTop = $(".main-scroll-bg01").offset().top;
    if (scrollTop < bg1OffsetTop) {
      fixedMain.removeClass("fixed-on"); // bg1 이전에 올라가면 fixed-on 제거
    }
  });

  updateSlide();

  // logo 무한루프 이동 함수
  function startMarquee($element, direction) {
    let width = $element.width();

    // 리스트 복제하여 무한 루프 효과 만들기
    $element.append($element.html());

    if (direction === "right") {
      $element.css("margin-left", -width); // 오른쪽 시작 위치 설정
    }

    function animateLogos() {
      let animationProps =
        direction === "left"
          ? { marginLeft: -width } // 왼쪽으로 이동
          : { marginLeft: 0 }; // 오른쪽으로 이동 (초기 위치로)

      $element.animate(animationProps, 40_000, "linear", function () {
        if (direction === "right") {
          $element.css("margin-left", -width); // 다시 오른쪽으로 이동
        } else {
          $element.css("margin-left", "0"); // 다시 왼쪽으로 이동
        }
        animateLogos();
      });
    }
    animateLogos();
  }

  startMarquee($(".logo-wrap ul:first-child"), "left"); // 첫 번째 ul: 왼쪽으로 이동
  startMarquee($(".logo-wrap ul:last-child"), "right"); // 두 번째 ul: 오른쪽으로 이동

  // 우클릭 막기
  $(document).on("contextmenu", function (event) {
    event.preventDefault(); // 우클릭 기본 메뉴를 비활성화
  });

  const $navBtn = $(".nav-btn");
  const $overlay = $(".overlay");
  const $body = $("body");
  const $menuBars = $(".m-btn div");

  // 창 크기 체크 함수
  function handleWindowResize() {
    if ($(window).width() > 1024) {
      // 화면이 1024px 이상이면 오버레이 숨기기
      $overlay.hide();
      $body.css("overflow", "auto");

      // 햄버거 버튼 원래대로 복구
      $menuBars.eq(0).css("opacity", "1");
      $menuBars.eq(1).css({
        transform: "none",
        top: "7px",
        width: "15px",
      });
      $menuBars.eq(2).css({
        transform: "translate(-7px, 0)",
        top: "auto",
        bottom: "9px",
        width: "20px",
      });
    }
  }

  // 페이지 로딩 시 크기 체크
  handleWindowResize();

  // 창 크기 변경 시 크기 체크
  $(window).resize(function () {
    handleWindowResize();
  });

  // 내비게이션 버튼 클릭 시 오버레이 토글
  $navBtn.on("click", function () {
    const isOpen = $overlay.is(":visible");

    if (isOpen) {
      // 메뉴 닫기
      $overlay.fadeOut(300);
      $body.css("overflow", "auto");

      // 햄버거 버튼 원래대로 복구
      $menuBars.eq(0).css("opacity", "1");
      $menuBars.eq(1).css({
        transform: "none",
        top: "7px",
        width: "15px",
      });
      $menuBars.eq(2).css({
        transform: "translate(-7px, 0)",
        top: "auto",
        bottom: "9px",
        width: "20px",
      });
    } else {
      // 메뉴 열기
      $overlay.fadeIn(300);

      // 햄버거 버튼 → X자 모양
      $menuBars.eq(0).css("opacity", "0");
      $menuBars.eq(1).css({
        transform: "rotate(45deg)",
        top: "50%",
        width: "27px",
      });
      $menuBars.eq(2).css({
        transform: "rotate(-45deg)",
        top: "50%",
        width: "27px",
      });
    }
  });
});
