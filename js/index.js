import { handleXhttps } from './util.js';

$(() => {
  handleXhttps('GET', '../html/header.html', $('header'));
  handleXhttps('GET', '../html/navigation.html', $('nav'));
  handleXhttps('GET', '../html/footer.html', $('footer'));
});
