import { handleXhttps } from "./util.js";

$(() => {
  handleXhttps("GET", "../html/header.html", $("header"));
  handleXhttps("GET", "../html/navigation.html", $("nav"));
  handleXhttps("GET", "../html/footer.html", $("footer"));

  handleXhttps("GET", "../html/main.html", $("main"));

  // 회원가입 클릭 시
  $("body").on("click", '.header-menu-link[href="signup.html"]', function (e) {
    e.preventDefault();
    handleXhttps("GET", "../html/signup.html", $("main"));
  });

  // 로그인 클릭 시
  $("body").on("click", '.header-menu-link[href="login.html"]', function (e) {
    e.preventDefault();
    handleXhttps("GET", "../html/login.html", $("main"));
  });

  // if 마이페이지 link clicked
  // handleXhttps("GET", "../html/mypage.html", $("main"));

  // 내 정보 수정 클릭 시
  $("body").on("click", '.mypage-main-text[href="modify.html"]', function (e) {
    e.preventDefault();
    handleXhttps("GET", "../html/modify.html", $("main"));
  });

  // 검색 시
  $("body").on("click", "#header-search-button", function (e) {
    const value = $("#header-search-input").val();
    location.href = `../html/search.html?v=${value}`;
  });

  // 캘린더 조회 시
  $("body").on("click", "#navigation-calendar-button", function (e) {
    e.preventDefault();
    $("main").html("");

    var calendar = new FullCalendar.Calendar(document.querySelector("main"), {
      initialView: "dayGridMonth",

      // events: JSON.parse(data),
      eventClick: function (info) {},
    });
    calendar.render();
  });
});
