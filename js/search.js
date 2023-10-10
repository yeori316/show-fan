import { backURL } from "./util.js";

$(() => {
  console.log("js");

  // const $searchBt = $("#header-search-button");

  // $searchBt.click((e) => {
  // 장르 체크박스 숨김
  $("#concert").parent().hide();
  $("#musical").parent().hide();
  $("#theater").parent().hide();
  $("#festival").parent().hide();
  $("#classic").parent().hide();

  // 공연 상태 체크박스 숨김
  $("#coming").parent().hide();
  $("#during").parent().hide();
  $("#end").parent().hide();

  // 지역 체크박스 숨김
  $("#seoul").parent().hide();
  $("#incheon").parent().hide();
  $("#daejeon").parent().hide();
  $("#daegu").parent().hide();
  $("#gwangju").parent().hide();
  $("#ulsan").parent().hide();
  $("#busan").parent().hide();
  $("#jeju").parent().hide();

  const value = $("#header-search-input").val();
  const search = `v=${value}`;

  $.ajax({
    url: `${backURL}/search?${search}`,
    method: "GET",
    success: (responseJSONObj) => {
      const showCnt = responseJSONObj.showCnt;
      const showList = responseJSONObj.show;

      const $resultCnt = $("#search-result-count > b");
      $resultCnt.html(`검색 결과 (${showCnt})`);

      const $originShow = $("div.col").first();
      // $originShow.siblings().remove();
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
          $("#theater").parent().show();
        } else if (genreId == 2) {
          $("#musical").parent().show();
        } else if (genreId == 3) {
          $("#classic").parent().show();
        } else if (genreId == 4) {
          $("#concert").parent().show();
        } else if (genreId == 5) {
          $("#festival").parent().show();
        }

        if (showStatus == "공연예정") {
          $("#coming").parent().show();
        } else if (showStatus == "공연중") {
          $("#during").parent().show();
        } else if (showStatus == "공연완료") {
          $("#end").parent().show();
        }

        if (showAddress.indexOf("서울") != -1) {
          $("#seoul").parent().show();
        } else if (showAddress.indexOf("인천")) {
          $("#incheon").parent().show();
        } else if (showAddress.indexOf("대전")) {
          $("#daejeon").parent().show();
        } else if (showAddress.indexOf("대구")) {
          $("#daegu").parent().show();
        } else if (showAddress.indexOf("광주")) {
          $("#gwangju").parent().show();
        } else if (showAddress.indexOf("울산")) {
          $("#ulsan").parent().show();
        } else if (showAddress.indexOf("부산")) {
          $("#busan").parent().show();
        } else if (showAddress.indexOf("제주")) {
          $("#jeju").parent().show();
        }

        $copyShow.find("img").attr("src", showImage).attr("alt", showName);
        $copyShow.find(".status > b").html(showStatus);
        $copyShow.find(".card-title").html(showName);
        $copyShow.find("#period").html(showStartDay + " ~ " + showEndDay);
        $copyShow.find("#venues").html(showVenues);
        $copyShow
          .find("#grade")
          .html("별 " + gradeAvg + " (" + reviewCnt + ")");

        $("#showCardList").append($copyShow);
      });

      $originShow.hide();
    },
    error: (xhr, textStatus) => {},
  });
  // });

  // 체크 박스 전체 선택 시
  const $genreAll = $("#genreAll");
  const $statusAll = $("#statusAll");
  const $localAll = $("#localAll");

  $genreAll.click((e) => {
    if ($genreAll.is(":checked")) {
      $("input[name=genre]").prop("checked", true);
    } else {
      $("input[name=genre]").prop("checked", false);
    }
  });

  $statusAll.click((e) => {
    if ($statusAll.is(":checked")) {
      $("input[name=status]").prop("checked", true);
    } else {
      $("input[name=status]").prop("checked", false);
    }
  });

  $localAll.click((e) => {
    if ($localAll.is(":checked")) {
      $("input[name=local]").prop("checked", true);
    } else {
      $("input[name=local]").prop("checked", false);
    }
  });
});
