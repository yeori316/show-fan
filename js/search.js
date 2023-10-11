import { handleXhttps, backURL } from "./util.js";

$(() => {
  const theaterId = 1;
  const musicalId = 2;
  const classicId = 3;
  const concertId = 4;
  const festivalId = 5;

  const queryStr = location.search.substring(1); // v=value
  const value = queryStr.substring(2); // value

  var showCnt;
  var showList;

  handleXhttps("GET", "../html/header.html", $("header"));
  handleXhttps("GET", "../html/navigation.html", $("nav"));
  handleXhttps("GET", "../html/footer.html", $("footer"));

  // $(document).ready(function () {
  // $("#header-search-input").val(value);
  // $("#header-search-input").attr("value", value);
  // $("#header-search-input").prop("value", value);
  $("#header-search-input").prop("defaultValue", value);
  // });

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

  console.log(value);
  // $("#header-search-input").attr("value", value);
  $("#header-search-input").prop("value", value);
  console.log($("#header-search-input").val());

  // 검색 시
  $("body").on("click", "#header-search-button", function (e) {
    e.preventDefault();
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

  // 장르 전체 선택
  $("#genreAll").click((e) => {
    allChkHandler($("#genreAll"), "genre");
  });
  // 장르 전체 선택 끝

  // 공연상태 전체 선택
  $("#statusAll").click((e) => {
    allChkHandler($("#statusAll"), "status");
  });
  // 공연상태 전체 선택 끝

  // 지역 전체 선택
  $("#localAll").click((e) => {
    allChkHandler($("#localAll"), "local");
  });
  // 지역 전체 선택 끝

  // 체크박스 필터
  $(".form-check-input").click((e) => {
    showListFilterHandler(showList);
  });
  // 체크박스 필터 끝

  // 검색 기능 호출
  ajaxHandler(value);
  // 검색 기능 호출 끝

  // 검색 기능
  function ajaxHandler(value) {
    $.ajax({
      url: `${backURL}/search?${queryStr}`,
      method: "GET",
      success: (responseJSONObj) => {
        showCnt = responseJSONObj.showCnt;
        showList = responseJSONObj.show;
        showListHandler(showCnt, showList);
      },
      error: (xhr, textStatus) => {
        alert("err: " + xhr.status);
      },
    });
  }
  // 검색 기능 종료

  // 필터 전체 체크 함수 시작
  function allChkHandler($allChk, name) {
    if ($allChk.is(":checked")) {
      $(`input[name=${name}]`).prop("checked", true);
    } else {
      $(`input[name=${name}]`).prop("checked", false);
    }
  }
  // 필터 전체 체크 함수 끝

  // show list 장르체크 필터
  function showListFilterGenreHandler(showList, $filterChk, genreId) {
    var showFilterList = showList;

    if (!$filterChk.is(":checked")) {
      showFilterList = showFilterList.filter(function (show) {
        return show.genreId != genreId;
      });
    }
    return showFilterList;
  }
  // show list 장르체크 필터 끝

  // show list 상태체크 필터
  function showListFilterStatusHandler(showList, $filterChk, status) {
    var showFilterList = showList;

    if (!$filterChk.is(":checked")) {
      showFilterList = showFilterList.filter(function (show) {
        return show.showStatus != status;
      });
    }
    return showFilterList;
  }
  // show list 상태체크 필터 끝

  // show list 지역체크 필터
  function showListFilterLocalHandler(showList, $filterChk, local) {
    var showFilterList = showList;

    if (!$filterChk.is(":checked")) {
      showFilterList = showFilterList.filter(function (show) {
        return show.showAddress.indexOf(local) == -1;
      });
    }
    return showFilterList;
  }
  // show list 지역체크 필터 끝

  // show list 체크 필터
  function showListFilterHandler(showList) {
    var showFilterList;

    // show list 장르체크 필터
    showFilterList = showListFilterGenreHandler(
      showList,
      $("#theater"),
      theaterId
    );
    showFilterList = showListFilterGenreHandler(
      showFilterList,
      $("#musical"),
      musicalId
    );
    showFilterList = showListFilterGenreHandler(
      showFilterList,
      $("#classic"),
      classicId
    );
    showFilterList = showListFilterGenreHandler(
      showFilterList,
      $("#concert"),
      concertId
    );
    showFilterList = showListFilterGenreHandler(
      showFilterList,
      $("#festival"),
      festivalId
    );
    // show list 장르체크 필터 끝

    // show list 상태체크 필터
    showFilterList = showListFilterStatusHandler(
      showFilterList,
      $("#coming"),
      "공연예정"
    );
    showFilterList = showListFilterStatusHandler(
      showFilterList,
      $("#during"),
      "공연중"
    );
    showFilterList = showListFilterStatusHandler(
      showFilterList,
      $("#end"),
      "공연완료"
    );
    // show list 상태체크 필터 끝

    // show list 지역체크 필터
    showFilterList = showListFilterLocalHandler(
      showFilterList,
      $("#seoul"),
      "서울"
    );
    showFilterList = showListFilterLocalHandler(
      showFilterList,
      $("#incheon"),
      "인천"
    );
    showFilterList = showListFilterLocalHandler(
      showFilterList,
      $("#daejeon"),
      "대전"
    );
    showFilterList = showListFilterLocalHandler(
      showFilterList,
      $("#daegu"),
      "대구"
    );
    showFilterList = showListFilterLocalHandler(
      showFilterList,
      $("#gwangju"),
      "광주"
    );
    showFilterList = showListFilterLocalHandler(
      showFilterList,
      $("#ulsan"),
      "울산"
    );
    showFilterList = showListFilterLocalHandler(
      showFilterList,
      $("#busan"),
      "부산"
    );
    showFilterList = showListFilterLocalHandler(
      showFilterList,
      $("#gyeonggi"),
      "경기"
    );
    showFilterList = showListFilterLocalHandler(
      showFilterList,
      $("#gangwon"),
      "강원"
    );
    showFilterList = showListFilterLocalHandler(
      showFilterList,
      $("#gyeongsang"),
      "경상"
    );
    showFilterList = showListFilterLocalHandler(
      showFilterList,
      $("#chungcheong"),
      "충청"
    );
    showFilterList = showListFilterLocalHandler(
      showFilterList,
      $("#jeolla"),
      "전라"
    );
    showFilterList = showListFilterLocalHandler(
      showFilterList,
      $("#jeju"),
      "제주"
    );
    // show list 지역체크 필터

    $("#search-result-container").html(
      showListHandler(showFilterList.length, showFilterList)
    );
  }
  // show list 체크 필터 끝

  // show list handler
  function showListHandler(showCnt, showList) {
    if (showCnt == 0) {
      $("#search-result-count > b").html(`검색 결과 (${showCnt})`);
      $("#showCardList").html(
        '<div class="col"><div class="card h-100"><img class="card-img-top" src="https://showfan.s3.ap-northeast-2.amazonaws.com/PF154190.jpg" alt="..."/><div class="status"><b>공연중</b></div><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text"><div id="period">2023.01.01 ~ 2023.01.01</div><div id="venues">예술의 전당</div><br><div id="grade">평점 3.5 (리뷰갯수)</div></p></div></div></div><div id="search-result-count" class="container text-right"><b>검색된 공연이 없습니다.</b></div>'
      );
      $("div.col").first().hide();
    } else {
      $("#search-result-count > b").html(`검색 결과 (${showCnt})`);

      const $originShow = $("div.col").first();
      $originShow.siblings().remove();
      $originShow.show();

      $(showList).each((index, s) => {
        const $copyShow = $originShow.clone();

        const showId = s.showId;
        // const showImage = s.showPoster;
        const showImage =
          "https://showfan.s3.ap-northeast-2.amazonaws.com/PF154190.jpg";
        const genreId = s.genreId;
        const showName = s.showName;
        const showVenues = s.showVenues;
        const showStartDay = s.showStartDay;
        const showEndDay = s.showEndDay;
        const showAddress = s.showAddress;
        const showStatus = s.showStatus;
        const reviewCnt = s.reviewCnt;
        const gradeAvg = s.gradeAvg;

        if (genreId == 1) {
          $("#theater").prop("checked", true);
        } else if (genreId == 2) {
          $("#musical").prop("checked", true);
        } else if (genreId == 3) {
          $("#classic").prop("checked", true);
        } else if (genreId == 4) {
          $("#concert").prop("checked", true);
        } else if (genreId == 5) {
          $("#festival").prop("checked", true);
        }

        if (showStatus == "공연예정") {
          $("#coming").prop("checked", true);
        } else if (showStatus == "공연중") {
          $("#during").prop("checked", true);
        } else if (showStatus == "공연완료") {
          $("#end").prop("checked", true);
        }

        if (showAddress.indexOf("서울") != -1) {
          $("#seoul").prop("checked", true);
        } else if (showAddress.indexOf("인천") != -1) {
          $("#incheon").prop("checked", true);
        } else if (showAddress.indexOf("대전") != -1) {
          $("#daejeon").prop("checked", true);
        } else if (showAddress.indexOf("대구") != -1) {
          $("#daegu").prop("checked", true);
        } else if (showAddress.indexOf("광주") != -1) {
          $("#gwangju").prop("checked", true);
        } else if (showAddress.indexOf("울산") != -1) {
          $("#ulsan").prop("checked", true);
        } else if (showAddress.indexOf("부산") != -1) {
          $("#busan").prop("checked", true);
        } else if (showAddress.indexOf("경기") != -1) {
          $("#gyeonggi").prop("checked", true);
        } else if (showAddress.indexOf("강원") != -1) {
          $("#gangwon").prop("checked", true);
        } else if (showAddress.indexOf("경상") != -1) {
          $("#gyeongsang").prop("checked", true);
        } else if (showAddress.indexOf("충청") != -1) {
          $("#chungcheong").prop("checked", true);
        } else if (showAddress.indexOf("전라") != -1) {
          $("#jeolla").prop("checked", true);
        } else if (showAddress.indexOf("제주") != -1) {
          $("#jeju").prop("checked", true);
        }

        $copyShow.find("img").attr("src", showImage).attr("alt", showName);
        if (showStatus == "공연완료") {
          $copyShow.find(".status > b").html("공연종료");
        } else {
          $copyShow.find(".status > b").html(showStatus);
        }
        $copyShow.find(".card-title").html(showName);
        $copyShow.find("#period").html(showStartDay + " ~ " + showEndDay);
        $copyShow.find("#venues").html(showVenues);
        $copyShow
          .find("#grade")
          .html("별 " + gradeAvg + " (" + reviewCnt + ")");

        $("#showCardList").append($copyShow);
      });

      $originShow.hide();
    }
  }
  // show list handler 끝
});
