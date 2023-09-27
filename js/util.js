export const handleXhttps = (method, url, target) => {
  $.ajax({
    url: url,
    method: method,
    success: (responseText) => {
      target.html(responseText);
    },
  });
};
