import { backURL } from '../../util/util.js';

$(() => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${'loginCookie'}=`);
  let loginCookie = null;
  if (parts.length === 2) {
    loginCookie = parts.pop().split(';').shift();
  }
  // if (!loginCookie) {
  //   alert('로그인 후 이용 가능합니다.');
  //   history.back();
  // }
  loginCookie = 'easeon78@gmail.com';

  $.ajax({
    url: backURL + '/memberreview',
    method: 'GET',
    data: `memberId=${window.localStorage.getItem('memberId')}`,
    success: (myReviewResponse) => {
      if (myReviewResponse === '') {
        $('#mypage-myreview-review-containers')
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
        const $mypageReviewContainers = $('#mypage-myreview-review-containers');

        myReviewResponse.forEach((myReview, index) => {
          genreEvalutionCount[myReview.genreId] += 1;
          const $mypageReviewContainer = $(`
                <div class="mypage-myreview-review-container"></div>
                `);
          $mypageReviewContainer.append(`
                <img
                  src="${myReview.showPoster}"
                  alt="review-show-post"
                  class="mypage-myreview-review-post"
                  onclick="location.href='/show-detail?showId=${
                    myReview.showId
                  }'"}
                />
                <div class="mypage-myreview-review-info">
                  <div id="mypage-myreview-review-show-info">
                    <div>${myReview.showName}</div>
                    <i class="fa-solid fa-slash mypage-myreview-review-line-icon"></i>
                    <div>${myReview.reviewCreatedAt}</div>
                    <i class="fa-solid fa-slash mypage-myreview-review-line-icon"></i>
                    <div>${
                      myReview.seatName
                    }(${myReview.seatPrice.toLocaleString()}원)</div>
                    <i class="fa-solid fa-slash mypage-myreview-review-line-icon"></i>
                    <div>${myReview.showVenues}</div>
                  </div>
                  <div class="mypage-myreview-review-evaluation-info">
                    <i id="mypage-myreview-review-star-icon" class="fa-solid fa-star"></i>
                    <div>${myReview.reviewGrade}</div>
                    <i class="fa-solid fa-slash mypage-myreview-review-line-icon"></i>
                    <div id="mypage-review-content">
                      ${myReview.reviewContent}
                    </div>
                  </div>
                </div>
                <div id="mypage-myreview-review-button">
                  <a id="mypage-myreview-review-edit-${
                    myReview.reviewId
                  }" href="#">수정</a>
                  <i class="fa-solid fa-slash mypage-myreview-review-line-icon"></i>
                  <a id="mypage-review-delete-${
                    myReview.reviewId
                  }" href="#">삭제</a>
                </div>
              `);

          $mypageReviewContainers.append($mypageReviewContainer);
          $mypageReviewContainers.append(`
                <div class="mypage-myreview-review-line"></div>
              `);
          $(`#mypage-myreview-review-delete-${myReview.reviewId}`).click(
            (e) => {
              console.log('?');
              if (confirm('삭제하시겠습니까?')) {
                $.ajax({
                  url: backURL + '/deletereview',
                  method: 'GET',
                  data: `reviewId=${myReview.reviewId}`,
                  success: () => {
                    alert('삭제되었습니다');
                    location.reload();
                  },
                });
              }
            }
          );
          $(`#mypage-myreview-review-edit-${myReview.reviewId}`).click((e) => {
            e.preventDefault();
            $('.popup').removeClass('hidden');
            $.ajax({
              url: backURL + '/review',
              method: 'GET',
              data: `reviewId=${myReview.reviewId}`,
              success: (reviewResponse) => {
                let reviewGrade = Number(reviewResponse.reviewGrade) * 2;
                $(`#rating${reviewGrade}`).click();
                $('.pop-detail').text(reviewResponse.reviewContent);
                $('.popup').attr('id', reviewResponse.reviewId);

                $.ajax({
                  url: backURL + '/showdetail',
                  method: 'GET',
                  data: `showId=${myReview.showId}`,
                  success: (showReviewResponse) => {
                    let seatName = {};
                    showReviewResponse.forEach((showReview) => {
                      if (seatName[showReview.seatId] == undefined) {
                        seatName[showReview.seatId] =
                          showReview.seatName +
                          ' (' +
                          showReview.seatPrice.toLocaleString() +
                          '원)';
                      }
                    });

                    $('.pop-title').text(showReviewResponse[0].showName);
                    Object.keys(seatName).forEach((seatId) => {
                      $('#popup-seat-list').append(
                        `<option value=${seatId}>${seatName[seatId]}</option>`
                      );
                      $('#popup-seat-list').val(reviewResponse.seatId);
                    });
                  },
                });
                $('.pop-title').text(reviewResponse.r);
              },
            });
          });
        });

        $('#mypage-myreview-evalution-count-value').text(evaluationCount);
        for (let i = 1; i <= 5; i++) {
          $(`#mypage-myreview-evalution-count-value-${i}`).text(
            genreEvalutionCount[i]
          );
        }

        $('#mypage-myreview-review-info').append(
          `<div class="mypage-myreview-review-show-info">`
        );
      }
    },
  });

  $('#close-btn').click(() => {
    initPopup();
  });

  $('#popup-regist-button').click(() => {
    $.ajax({
      url:
        backURL +
        `/updatereview?seatId=${$('#popup-seat-list').val()}&reviewId=${$(
          '.popup'
        ).attr('id')}&reviewContent=${$('.pop-detail').val()}&reviewGrade=${$(
          "input[name='reviewGrade']:checked"
        ).val()}`,
      method: 'GET',
      success: () => {
        alert('수정되었습니다');
        location.reload();
      },
    });
    initPopup();
  });
});

function initPopup() {
  $('.pop-title').empty();
  $('#popup-seat-list').empty();
  $('.popup').addClass('hidden');
}
