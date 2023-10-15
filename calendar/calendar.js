import { handleXhttps, backURL } from "../util/util.js";

$(() => {
  const theaterId = 1; // 연극
  const musicalId = 2; // 뮤지컬
  const classicId = 3; // 클래식
  const concertId = 4; // 콘서트
  const festivalId = 5; // 축제

  let calendar;
  let showList;

  handleXhttps("GET", "../header/index.html", $("header"));
  handleXhttps("GET", "../navigation/index.html", $("nav"));
  handleXhttps("GET", "../footer/index.html", $("footer"));


  // 회원가입 클릭 시
  $("body").on("click", '#signup', function (e) {
    e.preventDefault();
    // location.href = "../signup/index.html";
    handleXhttps("GET", "../signup/index.html", $("main"));
  });

  // 로그인 클릭 시
  $("body").on("click", '#login', function (e) {
    e.preventDefault();
    // location.href = "../login/index.html";
    handleXhttps("GET", "../login/index.html", $("main"));
  });

  // if 마이페이지 link clicked
  $("body").on("click", '#mypage', function (e) {
    e.preventDefault();
    location.href = "mypage";
  });

  // 내 정보 수정 클릭 시
  $("body").on("click", '#modify', function (e) {
    e.preventDefault();
    // location.href = "../modify/index.html";
    handleXhttps("GET", "../modify/index.html", $("main"));
  });

  // 검색 버튼 클릭 시
  $("body").on("click", "#header-search-button", function (e) {
    // e.preventDefault();
    const value = $("#header-search-input").val();
    location.href = `../search/index.html?q=${value}`;
  });

  // 검색 입력 후 엔터
  $("body").on("keydown", "#header-search-input", function (e) {
    if (e.key == "Enter" || e.keyCode == "13") {
      const value = $("#header-search-input").val();
      location.href = `../search/index.html?q=${value}`;
    }
  });

  // 캘린더 조회 시
  $("body").on("click", "#navigation-calendar-button", function (e) {
    location.href = "index.html";
  });

  // 장르 전체 선택
  $("#genreAll").click((e) => {
    if ($("#genreAll").is(":checked")) {
      $("input[name=genre]").prop("checked", true);
    } else {
      $("input[name=genre]").prop("checked", false);
    }
  });
  // 장르 전체 선택 끝

  // 체크박스 필터
  //   $(".form-check-input").click((e) => {
  //     eventListFilterHandler(showList);
  //   });
  // 체크박스 필터 끝

  ajaxHandler("23", "10");
  // calendarHandler();

  function eventListFilterHandler(showList) {
    var eventFilterList = showList;

    // event list 장르체크 필터
    $("input:checkbox[name=genre]").each((index, e) => {
      if (!$(e).is(":checked")) {
        eventFilterList = eventFilterList.filter(function (s) {
          return s.genreId != $(e).val();
        });
      }
    });

    // calendarAddEventHandler(eventFilterList);
  }

  function ajaxHandler(year, month) {
    $.ajax({
      url: `${backURL}/calendar?y=${year}&m=${month}`,
      // url: `${backURL}/calendar?y=23&m=10`,
      method: "GET",
      success: (responseJSONObj) => {
        showList = responseJSONObj.show;

        console.log("ajaxHandler call");
        console.log(showList);
        calendarHandler();
      },
      error: (xhr, textStatus) => {
        alert("err: " + xhr.status);
      },
    });
  }

  function calendarHandler() {
    calendar = new FullCalendar.Calendar(
      document.querySelector("#calendar-container"),
      {
        timeZone: "local",
        initialView: "dayGridMonth",
        dayMaxEvents: true,

        // eventDidMount: function (info) {
        //   var tooltip = new Tooltip(info.el, {
        //     title: info.event.extendedProps.description,
        //     placement: "top",
        //     trigger: "hover",
        //     container: "body",
        //   });
        // },

        eventClick: function (info) {
          var eventObj = info.event;

          if (eventObj.url) {
            location.href = eventObj.url;
            info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
          }
        },
      }
    );

    // function ajaxHandler(year, month) {
    //   var eventList;

    //   $.ajax({
    //     url: `${backURL}/calendar?y=${year}&m=${month}`,
    //     // url: `${backURL}/calendar?y=23&m=10`,
    //     method: "GET",
    //     success: (responseJSONObj) => {
    //       eventList = responseJSONObj.show;

    //       console.log("ajaxHandler call");
    //       console.log(showList);
    //       // calendarHandler();
    //     },
    //     error: (xhr, textStatus) => {
    //       alert("err: " + xhr.status);
    //     },
    //   });

    //   return eventList;
    // }

    // showList = ajaxHandler("23", "10");
    render(showList);

    // 캘린더 렌더링
    function render(showList) {
      const eventList = showList;

      calendar.render(
        console.log("렌더링"),
        $(eventList).each((index, s) => {
          const showId = s.showId;
          const genreId = s.genreId;
          const showName = s.showName;
          const showVenuesAddress = s.showVenues + "\n(" + s.showAddress + ")";
          const showStartDay = s.showStartDay;
          const showEndDay = s.showEndDay;
          const artistList = s.artistList;
          const showDetailUrl = `../show-detail/index.html?showId=${showId}`;
          let showColor;

          if (genreId == 1) {
            showColor = "blue"; // 연극
          } else if (genreId == 2) {
            showColor = "purple"; // 뮤지컬
          } else if (genreId == 3) {
            showColor = "yello"; // 클래식
          } else if (genreId == 4) {
            showColor = "red"; // 콘서트
          } else if (genreId == 5) {
            showColor = "green"; // 축제
          } else {
            showColor = "black"; // 기타
          }

          $("input:checkbox[name=genre]").each((index, e) => {
            if (genreId == $(e).val()) {
              $(e).prop("checked", true);
            }
          });

          calendar.addEvent({
            id: showId,
            title: showName,
            start: showStartDay,
            end: showEndDay,
            description: showVenuesAddress,
            url: showDetailUrl,
            // color: showColor,
          });
        })
      );
    }
    // 캘린더 렌더링 끝

    // calendar.addEvent({
    //   id: "showId",
    //   title: "showName",
    //   start: "2023-10-20",
    //   end: "2023-10-22",
    //   description: "test1",
    //   color: "purple", // "green"
    //   url: "../index.html?q=test1",
    // });

    $("button.fc-today-button").click((e) => {
      const date = new Date(calendar.getDate());
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      console.log(year);
      console.log(month);
      // ajaxHandler(year - 2000, month);
      // render();

      console.log("today bt");
    });

    $("button.fc-prev-button").click((e) => {
      const date = new Date(calendar.getDate());
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      console.log(year);
      console.log(month);
      // ajaxHandler(year - 2000, month);
      // render();

      console.log("pre bt");
    });

    $("button.fc-next-button").click((e) => {
      const date = new Date(calendar.getDate());
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      console.log(year);
      console.log(month);
      // ajaxHandler(year - 2000, month);
      // render();

      console.log("nxt bt");
    });
  }
});
