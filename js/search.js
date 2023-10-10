$(() => {
  // 체크 박스 전체 선택 시
  const $genreAll = $("#genreAll");
  const $statusAll = $("#statusAll");
  const $localAll = $("#localAll");

  $genreAll.click((e) => {
    if ($genreAll.is(":checked")) {
      $("input[name=genre]").prop("checked", true);
    } else {
      $("input[name=genre]").prop("checked", false);
    }
  });

  $statusAll.click((e) => {
    if ($statusAll.is(":checked")) {
      $("input[name=status]").prop("checked", true);
    } else {
      $("input[name=status]").prop("checked", false);
    }
  });

  $localAll.click((e) => {
    if ($localAll.is(":checked")) {
      $("input[name=local]").prop("checked", true);
    } else {
      $("input[name=local]").prop("checked", false);
    }
  });
});
