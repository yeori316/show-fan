import { handleXhttps } from "./util.js";
import { calendarhandleXhttps } from "./index.js";

$(() => {
  const $calendar = $("#calendar-button");

  $calendar.click(() => {
    $("main").html("<div id='calendar'></div>");
    calendarhandleXhttps();
  });
});
