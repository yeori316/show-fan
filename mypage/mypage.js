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
      $('#member-money-spend').text(
        memberResponseText.memberTotalPrice.toLocaleString()
      );

      let showIdList;
      // 찜 목록 출력
      $.ajax({
        url: backURL + '/myshow',
        method: 'GET',
        data: `memberId=${window.localStorage.getItem('memberId')}`,
        success: (myShowResponseText) => {
          showIdList = JSON.parse(myShowResponseText);
          showIdList = showIdList.map((showId) => showId.showId);
          $('#my-show-count').text(`(${showIdList.length})`);
          const $myShowContainer = $('#my-show-container');
          $.each(showIdList, (index, showId) => {
            $.ajax({
              url: backURL + '/showdetail',
              method: 'GET',
              data: `showId=${showId}`,
              success: (detailShowResponseText) => {
                // 찜 목록
                const myShowName = detailShowResponseText[0].showName;
                const myShowPoster = detailShowResponseText[0].showPoster;

                const $liMyShow = $(
                  `<li id="my-show-${showId}" class="my-show"></li>`
                );
                $liMyShow.css('list-style', 'none');

                $liMyShow.append(
                  `<button id="my-show-delete-button-${showId}">X</button>`
                );
                $liMyShow.append(`<img
                  src=${myShowPoster}
                  alt=${myShowName}-poster
                />`);
                $liMyShow.append(`<div>${myShowName}</div>`);
                $myShowContainer.append($liMyShow);
                $liMyShow.click(() => {
                  location.href = `/html/show_detail.html?showname=${myShowName}`;
                });

                // 찜 목록 삭제
                $(`#my-show-${showId}`).mouseenter(() => {
                  $(`#my-show-delete-button-${showId}`).css('display', 'block');
                  let imageSize = Number(
                    $('.my-show > img').css('width').replace('px', '')
                  );
                  $('.my-show > button').css('width', imageSize / 8 + 'px');
                  $('.my-show > button').css('height', imageSize / 8 + 'px');
                  $('.my-show > button').css(
                    'font-size',
                    imageSize / 10 + 'px'
                  );
                });

                $(`#my-show-delete-button-${showId}`).click((e) => {
                  e.stopPropagation();
                  if (confirm('찜한 작품을 삭제하시겠어요?')) {
                    $.ajax({
                      url:
                        backURL +
                        `/myshow?showId=${showId}&memberId=${window.localStorage.getItem(
                          'memberId'
                        )}`,
                      method: 'DELETE',
                      success: () => {
                        alert('삭제되었습니다.');
                        location.reload();
                      },
                    });
                  }
                });
                $('.my-show').mouseleave(() => {
                  $('.my-show > button').css('display', 'none');
                });

                if (index == showIdList.length - 1) {
                  $(`my-show-${showId}`).ready(() => {
                    if (showIdList.length > 5) {
                      $('#my-show-left-arrow-icon').css('display', 'block');
                      $('#my-show-right-arrow-icon').css('display', 'block');
                      // 찜 목록 슬라이드
                      initSlick();
                      $('#my-show-right-arrow-icon').css('padding-left', '8px');
                    } else {
                      $('#my-show-container').css('display', 'flex');
                      $('.my-show').css('display', 'flex');
                      $('.my-show').css('flex-direction', 'column');
                      $('.my-show').css('justify-content', 'center');
                      $('.my-show').css('max-width', '20%');
                    }
                  });
                }
              },
            });
          });
        },
      });

      // 내 리뷰
      $.ajax({
        url: backURL + '/memberreview?',
        method: 'GET',
        data: `memberId=${window.localStorage.getItem('memberId')}`,
        success: (myReviewResponse) => {
          if (myReviewResponse === '') {
            $('#mypage-review-containers')
              .prev()
              .after('<p>작성된 리뷰가 없습니다</p>');
          } else {
            let evaluationCount = myReviewResponse.length;
            let genreEvalutionCount = {
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 0,
            };
            const $mypageReviewContainers = $('#mypage-review-containers');

            myReviewResponse.forEach((myReview) => {
              genreEvalutionCount[myReview.genreId] += 1;
              const $mypageReviewContainer = $(`
                <div class="mypage-review-container"></div>
                `);
              $mypageReviewContainer.append(`
                <img
                  src="${myReview.showPoster}"
                  alt="review-show-post"
                  class="mypage-review-post"
                  onclick="location.href='/html/show_detail.html?showname=${
                    myReview.showName
                  }'"}
                />
                <div class="mypage-review-info">
                  <div id="mypage-review-show-info">
                    <div>${myReview.showName}</div>
                    <i class="fa-solid fa-slash mypage-review-line-icon"></i>
                    <div>${myReview.reviewCreatedAt}</div>
                    <i class="fa-solid fa-slash mypage-review-line-icon"></i>
                    <div>${
                      myReview.seatName
                    }(${myReview.seatPrice.toLocaleString()}원)</div>
                    <i class="fa-solid fa-slash mypage-review-line-icon"></i>
                    <div>${myReview.showVenues}</div>
                  </div>
                  <div class="mypage-review-evaluation-info">
                    <i id="mypage-review-star-icon" class="fa-solid fa-star"></i>
                    <div>${myReview.reviewGrade}</div>
                    <i class="fa-solid fa-slash mypage-review-line-icon"></i>
                    <div id="mypage-review-content">
                      ${myReview.reviewContent}
                    </div>
                  </div>
                </div>
                <div id="mypage-review-button">
                  <a href="#">수정</a>
                  <i class="fa-solid fa-slash mypage-review-line-icon"></i>
                  <a href="#">삭제</a>
                </div>
              `);

              $mypageReviewContainers.append($mypageReviewContainer);
              $mypageReviewContainers.append(`
                <div class="mypage-review-line"></div>
              `);
            });

            $mypageReviewContainers.append(`
              <a id="mypage-view-more-review" href="/mypage/myreview">리뷰 더보기</a>
            `);

            $('#mypage-evalution-count-value').text(evaluationCount);
            for (let i = 1; i <= 5; i++) {
              $(`#mypage-evalution-count-value-${i}`).text(
                genreEvalutionCount[i]
              );
            }

            $('#mypage-review-info').append(
              `<div class="mypage-review-show-info">`
            );
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

function initSlick() {
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
}
