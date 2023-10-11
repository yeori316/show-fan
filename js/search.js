import { handleXhttps, backURL } from "./util.js";

$(() => {
  const queryStr = location.search.substring(1); // v=value
  const value = queryStr.substring(2); // value

  handleXhttps("GET", "../html/header.html", $("header"));
  handleXhttps("GET", "../html/navigation.html", $("nav"));
  handleXhttps("GET", "../html/footer.html", $("footer"));

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
  $("#header-search-input").attr("value", value);
  console.log($("#header-search-input").val());

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

  var showCnt;
  var showList;

  // 검색 기능
  function ajaxHandler(value) {
    // ajax 요청
    $.ajax({
      url: `${backURL}/search?${queryStr}`,
      method: "GET",
      success: (responseJSONObj) => {
        showCnt = responseJSONObj.showCnt;
        showList = responseJSONObj.show;

        // if (showCnt != 0) {
        showListHandler(showCnt, showList);
        // } else {
        //   $("#showCardList").html(
        //     '<div id="search-result-count" class="container text-right"><b>검색된 공연이 없습니다.</b></div>'
        //   );
        // }
      },
      error: (xhr, textStatus) => {
        alert("err: " + xhr.status);
      },
    });
    // ajax 요청 끝

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
  }
  // 검색 기능 종료

  // 검색 기능 호출
  ajaxHandler(value);
  // 검색 기능 호출 끝

  // $("#theater").prop("checked", true);
  // $("#musical").prop("checked", true);
  // $("#classic").prop("checked", true);
  // $("#concert").prop("checked", true);
  // $("#festival").prop("checked", true);

  $("#theater").click((e) => {
    if ($("#theater").is(":checked")) {
      showListHandler(showCnt, showList);
    } else {
      var notTheaterShowList = showList.filter(function (show) {
        return show.genreId != 1;
      });
      console.log(notTheaterShowList.length);

      $("#search-result-container").html(
        showListHandler(notTheaterShowList.length, notTheaterShowList)
      );
    }
  });

  // 필터 전체 체크 함수 시작
  function allChkHandler($allChk, name) {
    if ($allChk.is(":checked")) {
      $(`input[name=${name}]`).prop("checked", true);
    } else {
      $(`input[name=${name}]`).prop("checked", false);
    }
  }
  // 필터 전체 체크 함수 끝

  // show list handler
  function showListHandler(showCnt, showList) {
    if (showCnt == 0) {
      $("#showCardList").html(
        '<div id="search-result-count" class="container text-right"><b>검색된 공연이 없습니다.</b></div>'
      );
    } else {
      const $resultCnt = $("#search-result-count > b");
      $resultCnt.html(`검색 결과 (${showCnt})`);

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
        } else if (showAddress.indexOf("인천")) {
          $("#incheon").prop("checked", true);
        } else if (showAddress.indexOf("대전")) {
          $("#daejeon").prop("checked", true);
        } else if (showAddress.indexOf("대구")) {
          $("#daegu").prop("checked", true);
        } else if (showAddress.indexOf("광주")) {
          $("#gwangju").prop("checked", true);
        } else if (showAddress.indexOf("울산")) {
          $("#ulsan").prop("checked", true);
        } else if (showAddress.indexOf("부산")) {
          $("#busan").prop("checked", true);
        } else if (showAddress.indexOf("제주")) {
          $("#jeju").prop("checked", true);
        } else {
          $("#etc").prop("checked", true);
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

  // show list filter genre handler 시작
  function showListFilterGenreHandler(showCnt, showList, genre) {
    const $resultCnt = $("#search-result-count > b");
    $resultCnt.html(`검색 결과 (${showCnt})`);

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
      } else if (showAddress.indexOf("인천")) {
        $("#incheon").prop("checked", true);
      } else if (showAddress.indexOf("대전")) {
        $("#daejeon").prop("checked", true);
      } else if (showAddress.indexOf("대구")) {
        $("#daegu").prop("checked", true);
      } else if (showAddress.indexOf("광주")) {
        $("#gwangju").prop("checked", true);
      } else if (showAddress.indexOf("울산")) {
        $("#ulsan").prop("checked", true);
      } else if (showAddress.indexOf("부산")) {
        $("#busan").prop("checked", true);
      } else if (showAddress.indexOf("제주")) {
        $("#jeju").prop("checked", true);
      } else {
        $("#etc").prop("checked", true);
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
      $copyShow.find("#grade").html("별 " + gradeAvg + " (" + reviewCnt + ")");

      $("#showCardList").append($copyShow);
    });

    $originShow.hide();
  }
  // show list filter genre handler 끝
});
