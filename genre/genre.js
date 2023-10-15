import { handleXhttps, backURL } from '../util/util.js';
$(() => {
  handleXhttps('GET', '../header/index.html', $('header'));
  handleXhttps('GET', '../navigation/index.html', $('nav'));
  handleXhttps('GET', '../footer/index.html', $('footer'));
  $.ajax({
    type: 'get',
    url:
      `${backURL}/showconcept?genreId=` +
      window.localStorage.getItem('show_genre'),
    dataType: 'json',
    success: function (data) {
      console.log(window.localStorage.getItem('show_genre'));
      $.each(data, function (key, value) {
        let div1 = document.createElement('div');
        let div2 = document.createElement('div');

        div1.setAttribute('class', 'col ' + key);
        div2.setAttribute('class', 'card h-100 ' + key);
        div2.setAttribute('id', value.showName);
        console.log(value.showId);
        document.getElementById('genre-show-container').append(div1);
        let img1 = document.createElement('img');
        img1.setAttribute('class', 'card-img-top img' + key);

        let div3 = document.createElement('div');
        div3.setAttribute('class', 'card-body ' + key);

        // document.querySelector(".q" + key)[key].append(div3);

        div2.append(div3);

        let h = document.createElement('span');
        h.setAttribute('class', 'card-title card_title' + key);

        // document.querySelector(".a" + key).append(h);
        // document.querySelector(".q" + key).append(img1);
        div1.append(div2);
        div2.append(img1);
        $('.img' + key).attr('src', value.showPoster);
        div2.append(div3);
        div3.append(h);
        $('.card_title' + key).text(value.showName);
        // document.querySelector(".b" + key).append(div2);

        if ($('.card').length) {
          console.log('oo');
        } else {
          console.log('xx');
        }
      });
    },
  });

  //$(".card").click((e) => {
  $('#genre-show-container').on('click', 'div.col>div.card', (e) => {
    let showId = $(e.currentTarget).attr('id');
    window.localStorage.setItem('param', showId);
    location.href = '../show-detail/index.html?showname=' + showId;
  });
});
