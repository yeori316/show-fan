import { handleXhttps } from "./util.js";
$(() => {
  handleXhttps("GET", "../html/header.html", $("header"));
  handleXhttps("GET", "../html/footer.html", $("footer"));
  $.ajax({
    type: "get",
    url:
      "http://192.168.1.37:8888/showfan/showconcept?genreId=" +
      window.localStorage.getItem("show_genre"),
    dataType: "json",
    success: function (data) {
      $.each(data, function (key, value) {
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");

        div1.setAttribute("class", "col b" + key);
        div2.setAttribute("class", "card h-100 q" + key);

        document.getElementById("genre-show-container").append(div1);
        let img1 = document.createElement("img");
        img1.setAttribute("class", "card-img-top");

        let div3 = document.createElement("div");
        div3.setAttribute("class", "card-body a" + key);

        // document.querySelector(".q" + key)[key].append(div3);

        div2.append(div3);

        let h = document.createElement("span");
        h.setAttribute("class", "card-title z" + key);

        // document.querySelector(".a" + key).append(h);
        // document.querySelector(".q" + key).append(img1);
        div1.append(div2);
        div2.append(img1);
        $(".card-img-top").attr("src", value.showImage1);
        div2.append(div3);
        div3.append(h);
        $(".z" + key).text(value.showName);
        // document.querySelector(".b" + key).append(div2);
      });
    },
  });
});
