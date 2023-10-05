import { handleXhttps } from "./util.js";

$(() => {
  handleXhttps("GET", "../html/header.html", $("header"));
  handleXhttps("GET", "../html/navigation.html", $("nav"));
  handleXhttps("GET", "../html/footer.html", $("footer"));

  // if 마이페이지 link clicked
  handleXhttps("GET", "../html/mypage.html", $("main"));
});

export const searchhandleXhttps = () => {
  handleXhttps("GET", "../html/search.html", $("main"));
};
