import { handleXhttps } from './util.js';

$(() => {
  handleXhttps('GET', '../html/header.html', $('header'));
  handleXhttps('GET', '../html/navigation.html', $('nav'));
  handleXhttps('GET', '../html/footer.html', $('footer'));

  $('body').on('click', '.header-menu-link[href="signup.html"]', function(e) {
    e.preventDefault();
    handleXhttps('GET', '../html/signup.html', $('main'));
  });
});
