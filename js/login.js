$(() => {
    const savedId = localStorage.getItem('savedId')
    if (savedId != null) {
        $('input[name=email]').val(savedId)
    }
    //DOM트리에서 form객체찾기
    //----form객체에서 submit이벤트가 발생했을 때 할 일 START----
    $('form').submit((e) => {
        //checkbox객체의 checked속성값확인 jQuery용 메서드 : $( ).prop('checked')
        if ($('#saveemail').prop('checked')) {
            localStorage.setItem('savedId', $('input[name=email]').val())
        } else {
            localStorage.removeItem('savedId')
        }
        const idValue = $('input[name=email]').val()
        const pwdValue = $('input[name=pwd]').val()
        const data = `email=${idValue}&pwd=${pwdValue}`

        $.ajax({
            xhrFields:{
                withCredentials: true
            },
            url: 'http://ec2-52-79-82-77.ap-northeast-2.compute.amazonaws.com:8080/showfan/',
            method: 'post',
            data: data,
            success: (responseJSONObj) => {
                if(responseJSONObj.status == 0){ //로그인실패인 경우
                    alert(responseJSONObj.msg)
                }else if(responseJSONObj.status == 1){ //로그인성공인 경우
                    alert("로그인 성공")
                    alert(responseJSONObj.msg)
                    location.href="./index.html"
                }
            },
            error: (jqXHR, textStatus) => { //( jqXHR jqXHR, String textStatus, String errorThrown )
                // alert(textStatus) //error
                // console.log(jqXHR)
                alert(jqXHR.readyState + ":" + jqXHR.status + ":" + jqXHR.statusText)
            }//로그인이 fail났을때(네트워크,url의 문제등) 실패는 아님
        })
        e.preventDefault()
    })
    //----form객체에서 submit이벤트가 발생했을 때 할 일 END----
})