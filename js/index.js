import { handleXhttps } from './util.js';

$(() => {
  handleXhttps('GET', '../html/header.html', $('header'));
  handleXhttps('GET', '../html/navigation.html', $('nav'));
  handleXhttps('GET', '../html/footer.html', $('footer'));

  // if 마이페이지 link clicked
  $('body').on('click', '.header-menu-link[href="mypage.html"]', function(e) {
    e.preventDefault();
    handleXhttps('GET', '../html/mypage.html', $('main'));
  });

  // 로그인 link clicked
  $('body').on('click', '.header-menu-link[href="login.html"]', function(e) {
    e.preventDefault();
    handleXhttps('GET', '../html/login.html', $('main'));
  });

  

});
