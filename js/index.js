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

  //브라우저로 부터 쿠키값 얻어오기
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  const loginCookie = getCookie('loginCookie');
  
  //쿠키값이 있다면
  if (loginCookie) {
    $.ajax({
      url: 'http://192.168.1.112:8888/showfan/cookiemem',
      // url: 'http://ec2-52-79-82-77.ap-northeast-2.compute.amazonaws.com:8080/showfan/cookiemem',
      method: 'get',
      xhrFields: {
        withCredentials: true
      },
      success: (responseJSONObj) => {
        if (responseJSONObj.status == 2) {
          // 로그인 성공 시의 처리
          alert('로그인 성공ff');
          // alert(responseJSONObj.msg);

        } else {
          // 로그인 실패 시의 처리
          alert('로그인 실패ff');
        }
      },
      error: (jqXHR, textStatus) => {
        alert(jqXHR.readyState + ':' + jqXHR.status + ':' + jqXHR.statusText);
      }
    });
  }

  

});
