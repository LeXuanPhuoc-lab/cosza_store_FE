$(document).ready(function () {
  let div;
  let img;
  let span;

  var links = document.querySelectorAll(".category-links");

  $.ajax({
    url: "http://localhost:8080/category",
    method: "GET",
  }).done(function (response) {
    var categories = response.data;

    for (var i = 0; i < categories.length; i++) {
      console.log(categories[i]);
    }

    var test = document.getElementById("category");

    for (var i = 0; i < categories.length; i++) {
      let id = categories[i].id;
      var element = document.createElement("a");
      element.innerHTML = categories[i].name;
      element.setAttribute(
        "class",
        "stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 category-feature"
      );
      element.setAttribute("id", categories[i].id);
      //element.setAttribute("onclick", "getProductByCategory(this)");

      element.addEventListener("click", function () {
        $.ajax({
          url: "http://localhost:8080/category/product?id=" + id,
          method: "GET",
        }).done(function (response) {

          var data = response.data;

          var itemDetail = document.getElementById("test");

          for (var j = 0; j < data.length; j++) {

            var quarter = document.createElement("div");
            quarter.setAttribute("class", "col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women");

            var rootElement = document.createElement("div");
            rootElement.setAttribute("class", "block2");

            // list products by category id
            // upper side of product detail
            div = document.createElement("div");
            div.setAttribute("class", "block2-pic hov-img0");
            // feature detail of div 1
            img = document.createElement("img");
            img.setAttribute("src", "images/product-06.jpg");
            img.setAttribute("alt", "IMG-PRODUCT");

            let link = document.createElement("a");
            link.setAttribute(
              "class",
              "block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
            );
            link.setAttribute("href", "#");
            link.innerHTML = "Quick View";

            div.appendChild(img);
            div.appendChild(link);
            rootElement.appendChild(div);
            quarter.appendChild(rootElement);

            // lower side of product detail
            let rootElement2 = document.createElement("div");
            rootElement2.setAttribute(
              "class",
              "block2-txt flex-w flex-t p-t-14"
            );

            div = document.createElement("div");
            div.setAttribute("class", "block2-txt-child1 flex-col-l");

            link = document.createElement("a");
            link.setAttribute(
              "class",
              "stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
            );
            link.setAttribute("href", "product-detail.html");
            link.innerHTML = data[j].name;

            span = document.createElement("span");
            span.setAttribute("class", "stext-105 cl3");
            span.innerHTML = data[j].price;

            div.appendChild(link);
            div.appendChild(span);
            rootElement2.appendChild(div);

            div = document.createElement("div");
            div.setAttribute("class", "block2-txt-child2 flex-r p-t-3");
            link = document.createElement("a");
            link.setAttribute("class", "btn-addwish-b2 dis-block pos-relative js-addwish-b2");
            link.setAttribute("href", "#");
            img = document.createElement("img");
            img.setAttribute("class", "icon-heart1 dis-block trans-04");  
            img.setAttribute("src", "images/icons/icon-heart-01.png");
            img.setAttribute("alt", "ICON");
            link.appendChild(img);
            img = document.createElement("img");
            img.setAttribute("class", "icon-heart2 dis-block trans-04 ab-t-l");  
            img.setAttribute("src", "images/icons/icon-heart-02.png");
            img.setAttribute("alt", "ICON");
            link.appendChild(img);
            div.appendChild(link);
            rootElement2.appendChild(div);  
            quarter.appendChild(rootElement2);  

            itemDetail.appendChild(quarter);
            itemDetail.style="height: 32rem;";
          }
        });
      });

      test.appendChild(element);
    }
  });

  //   var categories = document.getElementsByClassName("category-feature");
  //   categories.forEach(function () {
  //     this.addEventListener("click", function () {
  //       var id = this.getAttribute("id");
  //       console.log(id);
  //     });
  //   });
  //   console.log(categories);
});
