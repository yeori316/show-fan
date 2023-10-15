import { handleXhttps, backURL } from "../util/util.js";


$(() => {
  const savedId = localStorage.getItem('savedId');

  //로컬 스토리지에 저장한 아이디 값이 있으면
  if (savedId != null) {
    //아이디입력란에 자동 입력
    $('input[name=email]').val(savedId);
    //아이디 저장 체크박스 체크
    $('input:checkbox[id=saveemail]').attr('checked', true);
  }

  //----form객체에서 submit이벤트가 발생했을 때
  $('form').submit((e) => {
    e.preventDefault();
    //아이디 저장 체크시
    if ($('#saveemail').prop('checked')) {
      localStorage.setItem('savedId', $('input[name=email]').val());
    } else {
      localStorage.removeItem('savedId');
    }

    const idValue = $('input[name=email]').val(); //입력한 아이디 저장
    const pwdValue = $('input[name=pwd]').val(); //입력한 비밀번호 저장
    const autoValue = $('#autologin').is(':checked'); //자동로그인 체크 여부 저장

    const data = `email=${idValue}&pwd=${pwdValue}&autoLogin=${autoValue}`;

    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: backURL + '/login',
      method: 'POST',
      data: data,
      success: (responseJSONObj) => {
        if (responseJSONObj.status == 0) {
          //로그인실패인 경우
          alert("로그인 실패: " + responseJSONObj.status)
          alert(responseJSONObj.msg);
        } else if (responseJSONObj.status == 1) {
          //로그인성공인 경우
          alert("로그인 성공: " + responseJSONObj.status)
          location.href = './index.html';
        }
        console.log(responseJSONObj); // 응답을 콘솔에 출력합니다.
      },
      error: (jqXHR, textStatus) => {
        //( jqXHR jqXHR, String textStatus, String errorThrown )
        // alert(textStatus) //error
        // console.log(jqXHR)
        alert(jqXHR.readyState + ':' + jqXHR.status + ':' + jqXHR.statusText);
      }, //로그인이 fail났을때(네트워크,url의 문제등) 실패는 아님
    });
    e.preventDefault();
  });
  //----form객체에서 submit이벤트가 발생했을 때 할 일 END----
});