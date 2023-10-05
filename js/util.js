// api call(ajax) function
export const handleXhttps = (method, url, target) => {
  $.ajax({
    url: url,
    method: method,
    success: (responseText) => {
      target.html(responseText);
    },
  });
};

// carousel image slide - parameter(이미지 클래스들을 담고 있는 요소, 왼쪽 클릭 버튼, 오른쪽 클릭 버튼)
export const carouselSlider = (imageWrapper, prevArrow, nextArrow) => {
  $(imageWrapper).slick({
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
    prevArrow: prevArrow,
    nextArrow: nextArrow,
  });
};
