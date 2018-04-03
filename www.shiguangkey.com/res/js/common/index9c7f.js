$(function () {
  $("#searchKey").keydown(function (e) {
    if (e.keyCode == 13) {
      searchCourse();
    }
  });

  //登录弹窗
  $.ajax({
    url: "/user/loginDiv.html",
    success: function (data) {
      $("#loginDiv").html(data);
    }
  });

  if (!isEmpty(token)) {
    //学生信息
    $.ajax({
      url: "/api/user/myinfo",
      type: "POST",
      dataType: "json",
      success: function (data) {
        if (data.data.userDetail != null) {
          $("#loginShow").removeClass("none");
          $("#loginWindow").removeClass("none");
          if (data.data.userDetail.nick != "") {
            $("#nick").text(data.data.userDetail.nick);
          } else {
            $("#nick").text(data.data.userDetail.account);
          }
          if (data.data.userDetail.headIcon != "") {
            if (data.data.userDetail.headIcon.substr(0, 4) == "http") {
              $("#imgId").attr("src", data.data.userDetail.headIcon);
              $("#imgId1").attr("src", data.data.userDetail.headIcon);
            } else {
              $("#imgId").attr(
                "src",
                ossHome + data.data.userDetail.headIcon + "!mall_live_s"
              );
              $("#imgId1").attr(
                "src",
                ossHome + data.data.userDetail.headIcon + "!mall_live_s"
              );
            }
          } else {
            $("#imgId").attr("src", ossHome + "/res/images/default.png");
          }
          if (data.data.userDetail.courseNum != "") {
            $("#userCourse").text(data.data.userDetail.courseNum);
          } else {
            $("#userCourse").text(0);
          }
          if (data.data.userDetail.orderNum != "") {
            $("#userOrder").text(data.data.userDetail.orderNum);
          } else {
            $("#userOrder").text(0);
          }
          if (
            data.data.userDetail.collectCourseNum != "" ||
            data.data.userDetail.collectSchoolNum != ""
          ) {
            if (data.data.userDetail.collectCourseNum == "") {
              data.data.userDetail.collectCourseNum = 0;
              $("#userCollect").text(
                data.data.userDetail.collectCourseNum +
                data.data.userDetail.collectSchoolNum
              );
            } else if (data.data.userDetail.collectSchoolNum == "") {
              data.data.userDetail.collectSchoolNum == 0;
              $("#userCollect").text(
                data.data.userDetail.collectCourseNum +
                data.data.userDetail.collectSchoolNum
              );
            } else {
              $("#userCollect").text(
                data.data.userDetail.collectCourseNum +
                data.data.userDetail.collectSchoolNum
              );
            }
          } else {
            $("#userCollect").text(0);
          }
        } else if (data.data.userDetail == null) {
          $("#sss").removeClass("none");
          $("#ddd").addClass("none");
        }
      }
    });
    //学生今日直播
    $.ajax({
      url: "/api/course/queryTodayByStudent",
      type: "POST",
      dataType: "json",
      success: function (data) {
        if (
          data != null &&
          data.data != null &&
          data.data.courses != null &&
          data.data.courses[0] != null
        ) {
          for (var i = 0; i < data.data.courses.length; i++) {
            var data_data =
              "<div class='riolly'>" +
              "<div class='fr riotxt'>" +
              "<div class='riotitle'>" +
              "<a href='/course/" +
              data.data.courses[i].id +
              "' target='_blank'>" +
              data.data.courses[i].title +
              "</a>" +
              "</div>" +
              "<a href='/live/" +
              data.data.courses[i].id + (data.data.courses[i].typeDicFk == 5310 ? '/' + data.data.courses[i].classId : '') +
              "' target='_blank' class='ritime'><font class='ricolor'>" +
              data.data.courses[i].startTime +
              "</font>直播</a>" +
              "</div>" +
              "<a href='/course/" +
              data.data.courses[i].id +
              "'target='_blank'>" +
              "<img src=" +
              ossHome +
              data.data.courses[i].cover +
              "!mall_live_s alt= " +
              data.data.courses[i].title +
              "'/></a>" +
              "</div>";

            $("#userCourse_true").append(data_data);
            $("#userCourse_true").removeClass("none");
            $("#userCourse_flase").addClass("none");
          }
        } else if (
          data == null ||
          data.data == null ||
          data.data.courses == null ||
          data.data.courses[0] == null
        ) {
          $("#userCourse_flase").removeClass("none");
          $("#userCourse_true").addClass("none");
        }
      }
    });
  } else {
    $("#loginWindow").removeClass("none");
    $("#loginNone").removeClass("none");
    $("#login").removeClass("none");
  }

  $("body").on("click", "#logout", function () {
    logout(function () {
      location.href = location.href;
    });
  });
});
function isEmpty(val) {
  val = $.trim(val);
  if (val == null) return true;
  if (val == undefined || val == "undefined") return true;
  if (val == "") return true;
  if (val.length == 0) return true;
  if (!/[^(^\s*)|(\s*$)]/.test(val)) return true;
  return false;
}
function searchCourse() {
  var searchKey = encodeURIComponent(
    $("#searchKey")
      .val()
      .trim()
  );
  window.open("/course/search?key=" + searchKey + "&cateKey=" + searchKey);
}

function tologin() {
  toLogin(function (data) {
    location.href = location.href; //刷新当前页面
  });
}
