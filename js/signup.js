$(() => {
  const $btCertifiedObj = $("form.signup>button[id=certify]");
  const $btDupchkObj = $("form.signup>button[id=dupchk]");

  const $timerElement = $("#timer");
  const $EmailChkObj = $("form.signup>input[class=hide]");
  const $btEmailChkObj = $("form.signup>button[class=hide]");

  $EmailChkObj.hide();
  $btEmailChkObj.hide();

  $btCertifiedObj.click(() => {
    $EmailChkObj.show();
    $btEmailChkObj.show();
    let minutes = 1;
    let seconds = 0;

    function updateTimer() {
      if (minutes === 0 && seconds === 0) {
        $timerElement.text("시간 초과");
        $EmailChkObj.hide();
        return;
      }

      if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }

      let formattedTime = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
      $timerElement.text(formattedTime);

      setTimeout(updateTimer, 1000);
    }

    updateTimer();
  });
  
});
