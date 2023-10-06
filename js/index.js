import { handleXhttps } from './util.js';

$(() => {
  handleXhttps('GET', '../html/header.html', $('header'));
  handleXhttps('GET', '../html/navigation.html', $('nav'));
  handleXhttps('GET', '../html/footer.html', $('footer'));

  // if 마이페이지 link clicked
  handleXhttps('GET', '../html/mypage.html', $('main'));


  // 내 정보 수정 클릭 시
  $('body').on('click', '.mypage-main-text[href="modify.html"]', function(e) {
    e.preventDefault();
    handleXhttps('GET', '../html/modify.html', $('main'));
  });

  // 회원가입 클릭 시
  $('body').on('click', '.header-menu-link[href="signup.html"]', function(e) {
    e.preventDefault();
    handleXhttps('GET', '../html/signup.html', $('main'));
  // 로그인 클릭 시
  $('body').on('click', '.header-menu-link[href="login.html"]', function(e) {
    e.preventDefault();
    handleXhttps('GET', '../html/login.html', $('main'));
    

  });

});
