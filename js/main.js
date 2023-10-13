import { carouselSlider, backURL } from "./util.js";

$(".my-show").click(function () {
  let name = $(".my-show > .name").html();
  window.localStorage.setItem("param", window.localStorage.getItem(name));
  location.href =
    "./html/show_detail.html?showid=" + window.localStorage.getItem(name);
});

$(() => {
  carouselSlider(
    $("#my-show-container1"),
    $("#my-show-left-arrow-icon1"),
    $("#my-show-right-arrow-icon1")
  );
  carouselSlider(
    $("#my-show-container2"),
    $("#my-show-left-arrow-icon2"),
    $("#my-show-right-arrow-icon2")
  );
  carouselSlider(
    $("#my-show-container3"),
    $("#my-show-left-arrow-icon3"),
    $("#my-show-right-arrow-icon3")
  );
  carouselSlider(
    $("#my-show-container4"),
    $("#my-show-left-arrow-icon4"),
    $("#my-show-right-arrow-icon4")
  );
  carouselSlider(
    $("#my-show-container5"),
    $("#my-show-left-arrow-icon5"),
    $("#my-show-right-arrow-icon5")
  );
});

$(() => {
  $.ajax({
    type: "get",
    url: `${backURL}/show`,
    dataType: "json",
    success: function (data) {
      let idx_five = 1;
      let idx_four = 1;
      let idx_three = 1;
      let idx_two = 1;
      let idx_one = 1;
      let totalCnt = 0;
      $.each(data, function (key, value) {
        window.localStorage.setItem(value.showName, value.showId);
        if (value.genreId == 5) {
          $(".show_name" + value.genreId + "" + idx_five).text(value.showName);
          $(".my-show-img" + value.genreId + "" + idx_five).attr(
            "src",
            value.showImage1
          );
          idx_five += 1;
          if (idx_five == 11) {
            totalCnt += 1;
          }
        } else if (value.genreId == 4) {
          $(".show_name" + value.genreId + "" + idx_four).text(value.showName);
          $(".my-show-img" + value.genreId + "" + idx_four).attr(
            "src",
            value.showImage1
          );
          idx_four += 1;
          if (idx_four == 11) {
            totalCnt += 1;
          }
        } else if (value.genreId == 3) {
          $(".show_name" + value.genreId + "" + idx_three).text(value.showName);
          $(".my-show-img" + value.genreId + "" + idx_three).attr(
            "src",
            value.showImage1
          );
          idx_three += 1;
          if (idx_three == 11) {
            totalCnt += 1;
          }
        } else if (value.genreId == 2) {
          $(".show_name" + value.genreId + "" + idx_two).text(value.showName);
          $(".my-show-img" + value.genreId + "" + idx_two).attr(
            "src",
            value.showImage1
          );
          idx_two += 1;
          if (idx_two == 11) {
            totalCnt += 1;
          }
        } else if (value.genreId == 1) {
          $(".show_name" + value.genreId + "" + idx_one).text(value.showName);
          $(".my-show-img" + value.genreId + "" + idx_one).attr(
            "src",
            value.showImage1
          );
          idx_one += 1;
          if (idx_one == 11) {
            totalCnt += 1;
          }
        }

        if (totalCnt == 4) {
          return false;
        }
      });
    },
    error: function () {
      console.log("통신에러");
    },
  });
});
