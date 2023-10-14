import { backURL, handleXhttps } from '../util/util.js';

$(() => {
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  const loginCookie = getCookie('loginCookie');

  //1.로그인시
  //1-1. 찜하기를 누른 상태면 찜하기 취소 보이기
  //1-2. 찜하기를 누른 상태가 아니면 찜하기 보이기

  //2. 비로그인시
  //2-1. 찜하기 버튼, 찜취소 버튼 안보이기

  $.ajax({
    type: 'get',
    url: { backURL }, //찜하기 되어있는지 확인하는 url
    dataType: 'json',
    success: function (data) {
      if (loginCookie) {
        if (data == true) {
          $('#heart').hide();
        } else {
          $('#cancel_heart').hide();
        }
      }
      $('#cancel_heart').hide();
      $('#heart').hide();
    },
  });

  handleXhttps('GET', '../html/header.html', $('header'));
  handleXhttps('GET', '../html/navigation.html', $('nav'));
  handleXhttps('GET', '../html/footer.html', $('footer'));
  let name = window.localStorage.getItem('param');
  $.ajax({
    type: 'get',
    url: `${backURL}/findshow?showname=` + window.localStorage.getItem('param'),
    dataType: 'json',
    success: function (data) {
      window.localStorage.setItem('cntShowId', data);
      $.ajax({
        type: 'get',
        url: `${backURL}/showdetail?showid=` + data,
        dataType: 'json',
        success: function (data) {
          if (data[0].genreId == 5) {
            $('.show_type').text('축제');
          } else if (data[0].genreId == 4) {
            $('.show_type').text('콘서트');
          } else if (data[0].genreId == 3) {
            $('.show_type').text('클래식');
          } else if (data[0].genreId == 2) {
            $('.show_type').text('뮤지컬');
          } else if (data[0].genreId == 1) {
            $('.show_type').text('연극');
          }
          $('.show_info_detail > img').attr('src', data[0].showPoster);
          $('.show_name').text(data[0].showName);
          $('.show_open').text(data[0].showStatus);

          $('.show_start_day').text('공연일시 : ' + data[0].showStartDay);
          $('.show_time').text('공연시간 : ' + data[0].showTime);
          $('.show_place').text('공연장소 : ' + data[0].showVenues);
          $('.show_age').text('관람가능연령 : ' + data[0].showAge + '세 이상');
          $('.show_price').text('가격 : ' + data[0].seatPrice + '원 ~');
          $('.show_run_time').text('런타임 : ' + data[0].showRuntime);
          $('.info_photo_img').attr('src', data[0].showImage1);
          let total = 0;
          $.each(data, function (key, value) {
            if (total == 3 || value.artistName == null) {
              return false;
            }
            let div1 = document.createElement('div');
            div1.setAttribute('class', 'actor_detail' + key + ' actor_detail');
            document.querySelector('.actor').append(div1);

            let img1 = document.createElement('img');
            img1.setAttribute('class', 'actor_detail_img' + key);

            let span1 = document.createElement('span');
            span1.setAttribute('class', 'actor_detail_span' + key);

            document.querySelector('.actor_detail' + key).append(img1);
            $('.actor_detail_img' + key).attr('src', '../images/profile.jpg');
            document.querySelector('.actor_detail' + key).append(span1);
            $('.actor_detail_span' + key).text(value.artistName);
            total += 1;
            // $(".actor_detail_img" + (key + 1)).attr("src", data[key].showImage1);
          });
        },
      });
      // $.ajax({
      //   type: "get",
      //   url: "http://192.168.1.37:8888/showfan/selectreview?showid=" + data,
      //   dataType: "json",
      //   success: function (data) {
      //     console.log(data);
      //   },
      // });
    },
  });

  $('#heart').click((e) => {
    let sendData = {
      showId: window.localStorage.getItem('cntShowId'),
      memberId: getCookie('loginCookie'),
    };

    console.log(sendData);
    $.ajax({
      type: 'post',
      url:
        `${backURL}/findshow?showname=` + window.localStorage.getItem('param'),
      dataType: 'json',
      data: sendData,
      success: function (data) {},
    });
  });
});

function heart() {}
