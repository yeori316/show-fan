$(() => {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }
      
    const loginCookie = getCookie('loginCookie');
    const $login = $('#login')
    const $logout = $('#logout')
    const $signup = $('#signup')
    const $mypage = $('#mypage')
    // $('#login')
    // $('#logout')
    // $('#signup')
    // $('#mypage')

    
    //쿠키값이 있다면 로그인 상태(로그아웃, 마이페이지만 보이게)
    if (loginCookie) {
        $login.hide();
        $signup.hide();
        $logout.show();
        $mypage.show();

    //쿠키값이 없다면 로그인X 상태(로그인, 회원가입 보이게)
    }else{
        $logout.hide();
        $mypage.hide();
        $login.show();
        $signup.show();

    }

    $logout.click((e)=>{
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            url: 'http://192.168.1.112:8888/showfan/logoutmem',
            method: 'get',
        })
    })
})