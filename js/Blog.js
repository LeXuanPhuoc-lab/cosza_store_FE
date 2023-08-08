$(document).ready(async function() {

    $("#tags li").on("click", function() {
        var linkId = $(this).find("a").attr("id");

        switch (linkId) {
            case "fashionTag":
                console.log("Action 1 clicked");
                break;
            case "action2":
                // Code to handle action 2
                console.log("Action 2 clicked");
                break;
            case "action3":
                // Code to handle action 3
                console.log("Action 3 clicked");
                break;
            default:
                // Default code if none of the defined actions match
                console.log("Unknown action clicked");
                break;
        }
    });




    function output(data) {
            
        data.content.forEach(element => {
            var resultHTML = ""
            var date = new Date(element.createDate);
            var month = date.getMonth() + 1;
            var day = date.getDay() - 1;
            var year = date.getFullYear();
            resultHTML += `<div class="p-b-63">
            <a href="blog-detail.html" class="hov-img0 how-pos5-parent">
                <img src="${element.image}" alt="IMG-BLOG">
                <div class="flex-col-c-m size-123 bg9 how-pos5">
                    <span class="ltext-107 cl2 txt-center">
                        ${day}
                    </span>
                    <span class="stext-109 cl3 txt-center">
                        ${month + " " + year}
                    </span>
                </div>
            </a>
            <div class="p-t-32">
                <h4 class="p-b-15">
                    <a href="blog-detail.html" class="ltext-108 cl2 hov-cl1 trans-04">
                        ${element.title}
                    </a>
                </h4>
                <p class="stext-117 cl6">
                    ${element.content}
                </p>
                <div class="flex-w flex-sb-m p-t-18">
                    <span class="flex-w flex-m stext-111 cl2 p-r-30 m-tb-10", id = "owner">
                        <span>
                            <span class="cl4">By</span> ${element.user.username}
                            <span class="cl12 m-l-4 m-r-6">|</span>
                        </span>
                        <span id = "tag">
                        </span>
                        <span>
                            ${element.comments.length} comments
                        </span>
                    </span>
                    <a href="blog-detail.html" class="stext-101 cl2 hov-cl1 trans-04 m-tb-10">
                        Continue Reading
                        <i class="fa fa-long-arrow-right m-l-9"></i>
                    </a>
                </div>
            </div>
        </div>`;

        var $result = $(resultHTML);
        var spanElements = $result.find("#tag");
        $(document).ready(function() {
            // Loop through the array and create a <div> for each item
            $.each(element.tagBlogs, function(index, item) {

                if (index == 0) {
                    spanElements.append(" " + item.tag.name);
                } else {
                    spanElements.append(", " + item.tag.name);
                }
                if (index < element.tagBlogs.length - 1) {
                    
                }
            }
            );
            spanElements.append(' <span class="cl12 m-l-4 m-r-6">|</span>');
          });
        $('#blog').append($result);
        }
        );
        // var parentDiv = document.getElementById("blog");

        // parentDiv.innerHTML = resultHTML;
        
    }


    // Using jQuery's AJAX method
    await $.ajax({
        url: "http://localhost:8080/blog/",
        method: "GET",
        dataType: "json",
        success: function(data) {
            output(data);
        },
        error: function(xhr, status, error) {
            console.error("Error fetching blog content:", error);
        }
    });
});