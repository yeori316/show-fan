import { backURL } from '../js/util.js';

$(() => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${'loginCookie'}=`);
  let loginCookie = null;
  if (parts.length === 2) {
    loginCookie = parts.pop().split(';').shift();
  }
  // console.log(loginCookie);
  // if (!loginCookie) {
  //   alert('로그인 후 이용 가능합니다.');
  //   history.back();
  // }
  // loginCookie = 'emaila';
  loginCookie = 'easeon78@gmail.com';

  // 회원 정보 출력
  $.ajax({
    url: backURL + '/member',
    method: 'GET',
    data: `email=${loginCookie}`,
    success: (memberResponseText) => {
      window.localStorage.setItem('memberId', memberResponseText.memberId);
      const memberProfileImage = memberResponseText.memberImage;
      if (memberProfileImage !== undefined) {
        $('img[alt=profile-image]').attr('src', memberProfileImage);
        $('img[alt=profile-image]').removeClass('hide-image');
        $('div.mypage-profile-icon').addClass('hide-image');
      }
      $('#mypage-profile-nickname').text(memberResponseText.memberNickname);

      // 찜 목록 출력
      $.ajax({
        url: backURL + '/myshow',
        method: 'GET',
        data: `memberId=${window.localStorage.getItem('memberId')}`,
        success: (myShowResponseText) => {
          let showIdList = JSON.parse(myShowResponseText);
          showIdList = showIdList.map((showId) => showId.showId);
          $('#my-show-count').text(`(${showIdList.length})`);
          showIdList.forEach((showId) => {
            $.ajax({
              url: backURL + '/showdetail',
              method: 'GET',
              data: `showId=${showId}`,
              success: (detailShowResponseText) => {
                const myShowName = detailShowResponseText[0].showName;
                const myShowPoster = detailShowResponseText[0].showPoster;

                const $myShowContainer = $('#my-show-container');
                const $liMyShow = $(
                  `<li id="my-show-${showId}" class="my-show"></li>`
                );
                $liMyShow.css('list-style', 'none');
                $liMyShow.css('max-width', '20%');
                $liMyShow.append(
                  `<button id="my-show-delete-button-${showId}</button>`
                );
                $liMyShow.append(`<img
                  src=${myShowPoster}
                  alt=${myShowName}-poster
                />`);
                $liMyShow.append(`<div>${myShowName}</div>`);
                $myShowContainer.append($liMyShow);

                // 찜 목록
                $('.my-show').mouseenter(() => {
                  $('.my-show > button').css('display', 'block');
                  const imageSize = Number(
                    $('.my-show > img').css('width').replace('px', '')
                  );
                  $('.my-show > button').css('width', imageSize / 8 + 'px');
                  $('.my-show > button').css('height', imageSize / 8 + 'px');
                  $('.my-show > button').css(
                    'font-size',
                    imageSize / 10 + 'px'
                  );
                  $('.my-show > button').css('margin-left', imageSize + 'px');
                });
                $('.my-show').mouseleave(() => {
                  $('.my-show > button').css('display', 'none');
                });
              },
            });
          });
          if (showIdList.length > 5) {
            // 찜 목록 슬라이드
            $('#my-show-container').slick({
              dots: false,
              infinite: true,
              speed: 300,
              slidesToShow: 5,
              slidesToScroll: 5,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                  },
                },
              ],
              prevArrow: '#my-show-left-arrow-icon',
              nextArrow: '#my-show-right-arrow-icon',
            });
          } else {
            $('#my-show-container').css('display', 'flex');
            $('.my-show').css('display', 'flex');
            $('.my-show').css('flex-direction', 'column');
            $('.my-show').css('justify-content', 'center');
            $('#my-show-left-arrow-icon').css('display', 'none');
            $('#my-show-right-arrow-icon').css('display', 'none');
          }
        },
      });

      // 내 리뷰
      $.ajax({
        url: backURL + '/memberreview ',
        method: 'GET',
        data: `memberId=${window.localStorage.getItem('memberId')}`,
        success: (myShowResponseText) => {
          if (myShowResponseText === '') {
            // console.log('작성된 리뷰가 없습니다');
          } else {
            // console.log(JSON.parse(myShowResponseText));
          }
        },
      });

      // 선호 아티스트
      $.ajax({
        url: backURL + '/myartist',
        method: 'GET',
        data: `memberId=${window.localStorage.getItem('memberId')}`,
        success: (myShowResponseText) => {
          let myArtistList = JSON.parse(myShowResponseText);
          // 2회 이상 관람한 아티스트 중 평점, 조회수가 높은 5명을 출력하되 모두 동일하면 DB에 저장된 순서로 출력
          myArtistList = myArtistList.filter(
            (myArtist) => myArtist.myArtistViewCount >= 2
          );
          if (myArtistList.length == 0) {
            // console.log('선호하는 아티스트가 없습니다.');
          }
          if (myArtistList.length > 5) {
            myArtistList.sort((a, b) => {
              let bAvg =
                Math.round((b.myArtistAvgGrade + Number.EPSILON) * 100) / 100;
              let aAvg =
                Math.round((a.myArtistAvgGrade + Number.EPSILON) * 100) / 100;
              if (bAvg == aAvg) {
                return b.myArtistViewCount - a.myArtistViewCount;
              } else {
                return bAvg - aAvg;
              }
            });
          }
          myArtistList = myArtistList.slice(0, 5);

          myArtistList.forEach((myArtist) => {
            console.log(myArtist);
            $.ajax({
              url: backURL + '/artist',
              method: 'GET',
              data: `memberId=${window.localStorage.getItem('memberId')}`,
              success: (artistResponseText) => {
                console.log(artistResponseText);
                let mypageArtistContainer = `<div class="mypage-my-artist-container">`;
                //   if (myArtist.)
                //     <div class="mypage-artist-icon">
                //     <i class="fa-solid fa-user fa-2xl"></i>
                //   </div>`
                //   $(`<div class="mypage-my-artist-container">
                //     `);
              },
            });
          });
        },
      });
    },
  });
});
