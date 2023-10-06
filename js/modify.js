$(() => {
  $("#selectImageBtn").on("click", function () {
    $("#imageInput").click(); // 파일 선택 다이얼로그를 엽니다.
  });

  $("#imageInput").on("change", function () {
    var file = this.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      //   $("#selectedImage").attr("src", e.target.result);
      var img = new Image();
      img.src = e.target.result;

      img.onload = function () {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var maxSize = 150; // 프로필 이미지의 최대 크기

        var width = img.width;
        var height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);

        var profileImage = new Image();
        profileImage.src = canvas.toDataURL("image/png");
        $("#selectedImage").attr("src", profileImage.src);
      };
    };

    reader.readAsDataURL(file);
  });
});
