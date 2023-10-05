import { searchhandleXhttps } from "./index.js";
import { handleXhttps, backURL } from "./util.js";

$(() => {
  const $search = $("#header-search-button");
  const searchValue = $search.val();

  $search.click((searchValue) => {
    // handleXhttps("POST", `${backURL}/search?value=${searchValue}`, $("main"));
    searchhandleXhttps();
  });

  // if 마이페이지 link clicked
  // handleXhttps('GET', '../html/mypage.html', $('main'));
});
