import { handleXhttps } from "./util.js";

$(() => {
  handleXhttps("GET", "../html/header.html", $("header"));
  handleXhttps("GET", "../html/footer.html", $("footer"));
  let name = window.localStorage.getItem("param");
  $.ajax({
    type: "get",
    url:
      "http://192.168.1.37:8888/showfan/findshow?showname=" +
      window.localStorage.getItem("param"),
    dataType: "json",
    success: function (data) {
      $.ajax({
        type: "get",
        url: "http://192.168.1.37:8888/showfan/showdetail?showid=" + data,
        dataType: "json",
        success: function (data) {
          if (data[0].genreId == 5) {
            $(".show_type").text("콘서트");
          } else if (data[0].genreId == 4) {
            $(".show_type").text("클래식");
          } else if (data[0].genreId == 3) {
            $(".show_type").text("축제");
          } else if (data[0].genreId == 2) {
            $(".show_type").text("연극");
          } else if (data[0].genreId == 1) {
            $(".show_type").text("뮤지컬");
          }
          $(".show_info_detail > img").attr("src", data[0].showPoster);
          $(".show_name").text(data[0].showName);
          $(".show_open").text(data[0].showStatus);

          $(".show_start_day").text("공연일시 : " + data[0].showStartDay);
          $(".show_time").text("공연시간 : " + data[0].showTime);
          $(".show_place").text("공연장소 : " + data[0].showVenues);
          $(".show_age").text("관람가능연령 : " + data[0].showAge + "세 이상");
          $(".show_price").text("가격 : " + data[0].seatPrice + "원");
          $(".show_run_time").text("런타임 : " + data[0].showRuntime);
          $(".info_photo_img").attr("src", data[0].showImage1);
          let total = 0;
          $.each(data, function (key, value) {
            if (total == 3) {
              return false;
            }
            let div1 = document.createElement("div");
            div1.setAttribute("class", "actor_detail" + key + " actor_detail");
            document.querySelector(".actor").append(div1);

            let img1 = document.createElement("img");
            img1.setAttribute("class", "actor_detail_img" + key);

            let span1 = document.createElement("span");
            span1.setAttribute("class", "actor_detail_span" + key);

            document.querySelector(".actor_detail" + key).append(img1);
            $(".actor_detail_img" + key).attr("src", "../images/profile.jpg");
            document.querySelector(".actor_detail" + key).append(span1);
            $(".actor_detail_span" + key).text(value.artistName);
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

  // $.ajax({
  //   type: "get",
  //   url:
  //     "http://192.168.1.37:8888/showfan/showdetail?showname=" +
  //     window.localStorage.getItem("param"),
  //   dataType: "json",
  //   success: function (data) {
  //     if (data[0].genreId == 5) {
  //       $(".show_type").text("콘서트");
  //     } else if (data[0].genreId == 4) {
  //       $(".show_type").text("클래식");
  //     } else if (data[0].genreId == 3) {
  //       $(".show_type").text("축제");
  //     } else if (data[0].genreId == 2) {
  //       $(".show_type").text("연극");
  //     } else if (data[0].genreId == 1) {
  //       $(".show_type").text("뮤지컬");
  //     }
  //     $(".show_info_detail > div > img").attr("src", data[0].showImage1);
  //     $(".show_name").text(data[0].showName);
  //     $(".show_open").text(data[0].showStatus);

  //     $(".show_start_day").text("공연일시 : " + data[0].showStartDay);
  //     $(".show_time").text("공연시간 : " + data[0].showTime);
  //     $(".show_place").text("공연장소 : " + data[0].showVenues);
  //     $(".show_age").text("관람가능연령 : " + data[0].showAge + "세 이상");
  //     $(".show_price").text("가격 : " + data[0].seatPrice + "원");
  //     $(".show_run_time").text("런타임 : " + data[0].showRuntime);
  //     $(".info_photo_img").attr("src", data[0].showImage1);
  //     $.each(data, function (key, value) {
  //       let div1 = document.createElement("div");
  //       div1.setAttribute("class", "actor_detail" + key + " actor_detail");
  //       document.querySelector(".actor").append(div1);

  //       let img1 = document.createElement("img");
  //       img1.setAttribute("class", "actor_detail_img" + key);

  //       let span1 = document.createElement("span");
  //       span1.setAttribute("class", "actor_detail_span" + key);

  //       document.querySelector(".actor_detail" + key).append(img1);
  //       $(".actor_detail_img" + key).attr("src", value.showImage1);
  //       document.querySelector(".actor_detail" + key).append(span1);
  //       $(".actor_detail_span" + key).text(value.artistName);
  //       // $(".actor_detail_img" + (key + 1)).attr("src", data[key].showImage1);
  //     });
  //   },
  // });
});
