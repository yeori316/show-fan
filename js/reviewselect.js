//import { backURL } from "./util";

$(() => {
  //--모달 시작--
  // 모달 요소 가져오기
  var modal = document.getElementById("myModal");

  // 모달 닫기 버튼 가져오기
  var closeModalBtn = document.getElementById("closeModalBtn");

  // 모달 등록 버튼 가져오기
  var submitbutton = document.getElementById("submitbutton");

  // 모달 닫기 버튼 클릭 시 모달을 숨김
  closeModalBtn.onclick = function () {
    modal.style.display = "none";
  };

  // 모달 영역 외부 클릭 시 모달을 숨김
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  // 모달 등록 버튼 클릭 시 모달을 숨김
  submitbutton.onclick = function () {
    modal.style.display = "none";
  };
  // 모달을 숨김
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
  //--모달 끝--

  //--reviewselect start--
  const reviewContent = $();
  const reviewGrade = $();
  const nickname = $();
  const image = $();
  const seat = $();
  const replyContent = $();
  const data = {
    showId: "PF223176",
    reviewContent: reviewContent,
    reviewGrade: reviewGrade,
    nickname: nickname,
    image: image,
    seat: seat,
    replyContent: replyContent,
  };
  const requestParam = location.search.substring(1);

  $.ajax({
    //url: `"${backURL}/selectreview"`,
    url: "http://127.0.0.1:8888/showfan/selectreview",
    method: "GET",
    data: `showId=${data.showId}`,
    success: (responseJSONObj) => {
      console.log(responseJSONObj);
      displayReviews(responseJSONObj);
    },
  });
  //--reviewselect end--

  //--insert review, 리뷰쓰기모달의 등록버튼클릭 start--
  $("form#reviewGrade").submit((e) => {
    const reviewGrade = $('input[name="reviewGrade"]:checked').val();
    const reviewContent = $("#reviewContent").val();
    const showId = $();
    const seatId = $();
    const data = {
      memberId: 3,
      showId: "PF223176",
      reviewGrade: reviewGrade,
      reviewContent: reviewContent,
      seatId: 1848,
    };
    $.ajax({
      // url: `${backURL}/insertreview`,
      url: "http://127.0.0.1:8888/showfan/insertreview",
      method: "POST",
      data: data,
      success: (responseJSONObj) => {
        alert(responseJSONObj.msg);
      },
      error: (xhr, status, error) => {
        alert(xhr.responseText);
      },
    });
    return false;
  });
  //--insert review, 리뷰쓰기모달의 등록버튼클릭 end--

  //--updateReview start--
  $("#update").update((e) => {
    const rating = $('input[name="rating"]:checked').val();
    const reviewContent = $("#reviewContent").val();
    const showId = $();
    const memberId = $();
    const data = {
      reviewId: reviewId,
      reviewGrade: rating,
      reviewContent: reviewContent,
    };
    $.ajax({
      // url: `${backURL}/update`,
      url: "http://127.0.0.1:8888/showfan/updatereview",
      method: "POST",
      data: data,
      success: (responseJSONObj) => {
        alert(responseJSONObj.msg);
      },
      error: (xhr, status, error) => {
        alert(xhr.responseText);
      },
    });
    return false;
  });
  //--updateReview end--

  //--deletereview start--
  $("#delete").delete((e) => {
    const reviewId = 121;
    $.ajax({
      // url: `${backURL}/insertreview`,
      url: "http://127.0.0.1:8888/showfan/deletereview",
      method: "POST",
      data: reviewId,
      success: (responseJSONObj) => {
        alert(responseJSONObj.msg);
      },
      error: (xhr, status, error) => {
        alert(xhr.responseText);
      },
    });
    return false;
  });
  //--deletereview end--

  //--insert reply start--
  $("#replysubmit").submit((e) => {
    const replyContent = $();
    const nickname = $();
    const replyId = $();
    const data = {
      replyContent: replyContent,
      nickname: nickname,
      replyId: replyId,
    };
    $.ajax({
      // url: `${backURL}/insertreview`,
      url: "http://127.0.0.1:8888/showfan/insertreply",
      method: "POST",
      data: data,
      success: (responseJSONObj) => {
        alert(responseJSONObj.msg);
      },
      error: (xhr, status, error) => {
        alert(xhr.responseText);
      },
    });
    return false;
  });
  //--insert reply end--

  //--update reply start--
  $("").update((e) => {
    const replyId = $();
    const replyContent = $();
    const data = {
      replyId: replyId,
      replyContent: replyContent,
    };
    $.ajax({
      // url: `${backURL}/updatereply`,
      url: "http://127.0.0.1:8888/showfan/updatereply",
      method: "POST",
      data: data,
      success: (responseJSONObj) => {
        alert(responseJSONObj.msg);
      },
      error: (xhr, status, error) => {
        alert(xhr.responseText);
      },
    });
    return false;
  });
  //--update reply end--

  //--delete reply start--
  $("").delete((e) => {
    const replyId = $();
    $.ajax({
      // url: `${backURL}/deletereply`,
      url: "http://127.0.0.1:8888/showfan/deletereply",
      method: "POST",
      data: replyId,
      success: (responseJSONObj) => {
        alert(responseJSONObj.msg);
      },
      error: (xhr, status, error) => {
        alert(xhr.responseText);
      },
    });
    return false;
  });
  //--delete reply end--
});

var reviews = [];
var replies = [];
// 리뷰 데이터를 화면에 출력하는 함수
function displayReviews(reviews) {
  for (var i = 0; i < reviews.length; i++) {
    const $reviewContainer = $(
      '<div class="showdetail-review-container"></div>'
    );
    $reviewContainer.append(`<button id="updatereview">수정</button>`);
    $reviewContainer.append(`<button id="deletereview">삭제</button>`);
    $reviewContainer.append(
      `<img src= ${reviews[i].memberImage} alt="member-profile"/>`
    );
    $reviewContainer.append(`<div>${reviews[i].reviewCreatedAt}</div>`);
    $reviewContainer.append(`<div>${reviews[i].memberNickname}</div>`);
    $reviewContainer.append(`<div>${reviews[i].reviewGrade}</div>`);
    $reviewContainer.append(`<div>${reviews[i].seatName}</div>`);
    $reviewContainer.append(`<div>${reviews[i].reviewContent}</div>`);
    $reviewContainer.append(`<button id="replysubmit">댓글쓰기</button>`);
    $reviewContainer.append(`<div>_________________________________</div>`);
    $("#showdetail-review").append($reviewContainer);
    displayReplies(reviews[i].reviewReply);
  }
}
function displayReplies(replies) {
  for (var i = 0; i < replies.length; i++) {
    const $reviewContainer = $(
      '<div class="showdetail-reply-container"></div>'
    );
    console.log(replies);
    const $replyContainer = $('<div class="showdetail-reply-container"></div>');
    $reviewContainer.append(`<button id="updatereply">수정</button>`);
    $reviewContainer.append(`<button id="deletereply">삭제</button>`);
    $replyContainer.append(`<div>${replies[i].replyContent}</div>`);
    $("#showdetail-reply").append($replyContainer);
  }
}
// 댓글 쓰기 함수
// function replyToReview(reviewId) {
//   var replyContent = document.getElementById(`reply${reviewId}`).value;
//   console.log(`댓글 내용: ${replyContent} (리뷰 ID: ${reviewId})`);

//   // 해당 리뷰를 찾아 댓글을 추가
//   for (var i = 0; i < reviews.length; i++) {
//     if (reviews[i].id === reviewId) {
//       if (!reviews[i].reply) {
//         reviews[i].reply = [replyContent]; // 댓글을 배열로 저장
//       } else {
//         reviews[i].reply.push(replyContent); // 기존 댓글이 있으면 배열에 추가
//       }
//       break;
//     }
//   }

//   // 댓글을 추가한 후에 리뷰 목록을 다시 표시
//   displayReviews();
// }
// // 댓글 삭제 함수
// function deleteComment(reviewId, commentIndex) {
//   var review = reviews.find((review) => review.id === reviewId);

//   if (review && review.reply && review.reply[commentIndex]) {
//     review.reply.splice(commentIndex, 1);

//     // 댓글이 모두 삭제되면 댓글 삭제 버튼 숨김
//     if (review.reply.length === 0) {
//       review.reply = null;
//     }

//     // 댓글을 삭제한 후에 리뷰 목록을 다시 표시
//     displayReviews();
//   }
// }
//----------리뷰 start---
// 리뷰 쓰기
function createReview() {
  // 리뷰 쓰기 버튼 클릭 시 모달을 보이게 설정
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  // 초기화
  document.querySelector('input[name="rating"]:checked').checked = false;
  document.querySelector("#selectbox")[0].selected = true;
  document.getElementById("comment").value = "";
}

// 리뷰 수정
function editReview(id, price, rating, content) {
  // 수정 버튼 클릭 시 모달을 보이게 설정
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  for (var i = 0; i < 2; i++) {
    if (document.querySelector("#selectbox")[i].value === price) {
      document.querySelector("#selectbox")[i].selected = true;
      break;
    }
  }

  var ratingElements = document.querySelectorAll('input[name="rating"]');
  for (var i = 0; i < ratingElements.length; i++) {
    if (ratingElements[i].value === rating) {
      ratingElements[i].checked = true;
      break;
    }
  }

  var commentElement = document.getElementById("comment");
  commentElement.value = content;

  // 수정 버튼을 누를 때, 기존 모달의 "등록" 버튼에 editReviewModal 함수를 연결
  var submitButton = document.querySelector("#myModal button[type='submit']");
  submitButton.innerText = "수정";
  submitButton.onclick = function () {
    editReviewModal(id);
  };
}
// 리뷰 삭제 함수
function deleteReview(reviewId) {
  // reviewId로 해당 리뷰를 찾아 인덱스 찾기.
  var indexToDelete = -1;
  for (var i = 0; i < reviews.length; i++) {
    if (reviews[i].id === reviewId) {
      indexToDelete = i;
      break;
    }
  }

  // 해당 리뷰 삭제
  if (indexToDelete !== -1) {
    reviews.splice(indexToDelete, 1);
    // 삭제 후 리뷰 목록을 다시 표시
    displayReviews();
  }
}
//----------리뷰 end---

// 모달에서 리뷰 수정
function editReviewModal(id) {
  var selectbox = document.getElementById("selectbox");
  var selectedPrice = selectbox.options[selectbox.selectedIndex].value;

  var ratingElements = document.querySelectorAll('input[name="rating"]');
  var selectedRating;
  for (var i = 0; i < ratingElements.length; i++) {
    if (ratingElements[i].checked) {
      selectedRating = ratingElements[i].value;
      break;
    }
  }

  var commentElement = document.getElementById("comment");
  var editedContent = commentElement.value;

  // 해당 리뷰를 찾아 내용을 수정
  for (var i = 0; i < reviews.length; i++) {
    if (reviews[i].id === id) {
      reviews[i].price = selectedPrice;
      reviews[i].rating = parseFloat(selectedRating);
      reviews[i].content = editedContent;
      break;
    }
  }

  // 수정 후 리뷰 목록을 다시 표시
  displayReviews();
}

// 댓글 보이기/숨기기 함수
function toggleReply(reviewId) {
  var replyDiv = document.getElementById(`replyDiv${reviewId}`);
  if (replyDiv.style.display === "none" || replyDiv.style.display === "") {
    replyDiv.style.display = "block";
  } else {
    replyDiv.style.display = "none";
  }
}

// 페이지 로드 시 리뷰 목록을 표시
window.onload = displayReviews;
