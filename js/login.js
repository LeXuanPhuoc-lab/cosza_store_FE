$(document).ready(function () {
  $("#btn-sign-in").click(function () {
    var username = $("#user").val();
    var password = $("#pass").val();

    $.ajax({
      url: "http://localhost:8080/signin",
      method: "POST",
      data: {
        email: username,
        password: password,
      },
      timeout: 60000,
      statusCode: {
        403: function () {
          alert("Sai tai khoan");
        },
      },
    //   error: function (e) {
    //         alert(e.responseText);
    //     }
    })
      // khi goi API thi ket qua se tra o day
      .done(function (response) {
        var token = response.data;
        if (token != null && token != "") {
          // luu token vao bo nho cua browser
          // "gioHang": [{id:1, title:"Shirt", price:109,soluong:10}]
          localStorage.setItem("token", token);
          window.location.href = "index.html";
        }
      });
  });
});
