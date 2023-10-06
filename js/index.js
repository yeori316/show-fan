import { handleXhttps } from "./util.js";

$(() => {
  handleXhttps("GET", "../html/header.html", $("header"));
  handleXhttps("GET", "../html/navigation.html", $("nav"));
  handleXhttps("GET", "../html/footer.html", $("footer"));

  // if 마이페이지 link clicked
  handleXhttps("GET", "../html/mypage.html", $("main"));
});

// 검색 페이지
export const searchhandleXhttps = () => {
  handleXhttps("GET", "../html/search.html", $("main"));
};

// 달력 페이지
export const calendarhandleXhttps = () => {
  var calendar = new FullCalendar.Calendar(
    document.querySelector("#calendar"),
    {
      initialView: "dayGridMonth",

      // events: JSON.parse(data),
      eventClick: function (info) {},
    }
  );
  calendar.render();
};
