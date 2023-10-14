$(() => {
  const $btCertifiedObj = $("form.signup>button[id=certify]");
  const $btDupchkObj = $("form.signup>button[id=dupchk]");

  const $timerElement = $("#timer");
  const $EmailChkObj = $("form.signup>input[class=hide]");
  const $btEmailChkObj = $("form.signup>button[class=hide]");

  $EmailChkObj.hide();
  $btEmailChkObj.hide();

  let timerRunning = false;  // 타이머가 실행 중인지 여부를 나타내는 변수

  $btCertifiedObj.click(() => {
    if (timerRunning) {
      return;  // 타이머가 이미 실행 중이면 클릭을 무시
    }
  
    timerRunning = true;  // 타이머 시작
  
    $EmailChkObj.show();
    $btEmailChkObj.show();
    let minutes = 5;
    let seconds = 0;
  
    function updateTimer() {
      if (minutes === 0 && seconds === 0) {
        $timerElement.text("시간 초과");
        $EmailChkObj.hide();
        timerRunning = false;  // 타이머 종료
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
