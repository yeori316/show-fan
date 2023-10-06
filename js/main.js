import { carouselSlider } from "./util.js";

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
