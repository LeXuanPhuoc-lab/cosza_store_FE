$(document).ready(function() {
    $("#btn-sign-in").click(function() {
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
                    403: function() {
                        alert("Sai tai khoan");
                    },
                },

            })
            // khi goi API thi ket qua se tra o day
            .done(function(response) {
                var token = response.data;
                if (token != null && token != "") {
                    // luu token vao bo nho cua browser
                    // "gioHang": [{id:1, title:"Shirt", price:109,soluong:10}]
                    localStorage.setItem("token", token);
                    window.location.href = "index.html";
                }
            });
    });





    // $("#btn-sign-up").click(function() {
    //     // .val() : Lấy giá trị của thẻ input được chỉ định
    //     var username = $("#userNew").val()
    //     var password = $("#passNew").val()
    //     var repeatPW = $("#passRP").val()
    //     var email = $("#email").val()


    //     // Kiểm tra trùng lặp mật khẩu
    //     if (password !== repeatPW) {
    //         $("#password-match-error").css("display", "block");
    //         return;
    //     } else {
    //         $("#password-match-error").css("display", "none");
    //     }

    //     // Xuất giá trị ra trên tab console trên trình duyệt
    //     console.log("username : ", username, " password : ", password, "email: ", email);

    //     //ajax : Dùng để call ngầm API mà không cần trình duyệt
    //     //axios, fetch
    //     //data : chỉ có khi tham số truyền ngầm
    //     $.ajax({
    //             url: "http://localhost:8080/signup",
    //             method: "POST",
    //             data: {
    //                 username: username,
    //                 password: password,
    //                 email: email
    //             },
    //             dataType: "json",

    //         })
    //         .done(function(result) {

    //             // Xử lý kết quả thành công
    //             var responseData = result.data;
    //             console.log("Response data:", responseData);
    //             // Tiếp tục xử lý dữ liệu hoặc hiển thị thông báo cho người dùng

    //         }).fail(function(jqXHR, textStatus, errorThrown) {
    //             // Xử lý lỗi
    //             if (jqXHR.status === 500) {
    //                 var errorResponse = JSON.parse(jqXHR.responseText);
    //                 var errorMessage = errorResponse.data;
    //                 console.log("Error:", errorMessage);
    //                 // Hiển thị thông báo lỗi cho người dùng hoặc thực hiện các hành động khác
    //             }
    //         });
    // })



    $("#btn-sign-up").click(function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định
        Add();
    });


    function Add() {
        let username = $("#userNew").val()
        let password = $("#passNew").val()
        let repeatPW = $("#passRP").val()
        let email = $("#email").val()

        if (password !== repeatPW) {
            $("#password-match-error").css("display", "block");
            return;
        } else {
            $("#password-match-error").css("display", "none");
        }
        $.ajax({
            method: "POST",
            url: 'http://localhost:8080/signup',

            data: {
                username: username,
                password: password,
                email: email
            },
            success: function(result) {
                console.log('befor pare', result)

            },
            error: function(errormessage) {

                try {
                    const errorData = JSON.parse(errormessage.responseText);
                    errorMessage = ""
                    var errorMessage = errorData.data;
                    console.log(errorMessage)

                    if (errorMessage.toLowerCase().includes("username")) {
                        $("#user-new-error").removeClass("hidden");
                        $("#user-new-error").text(errorMessage);
                        $("#email-new-error").addClass("hidden");
                        $("#password-new-error").addClass("hidden");

                    } else if (errorMessage.includes("password")) {
                        $("#password-new-error").removeClass("hidden");
                        $("#password-new-error").text(errorMessage);
                        $("#user-new-error").addClass("hidden");

                        $("#email-new-error").addClass("hidden");


                    } else if (errorMessage.includes("email")) {
                        $("#email-new-error").removeClass("hidden");
                        $("#email-new-error").text(errorMessage);
                        $("#password-new-error").addClass("hidden");
                        $("#user-new-error").addClass("hidden");

                    }
                    // Xử lý các trường dữ liệu khác tương tự

                    // Hoặc hiển thị thông báo lỗi chung
                    // $("#general-error").text(errorMessage);


                    // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác
                } catch (error) {
                    console.log("Error parsing error response:", error);
                }
            }
        });
    }

});