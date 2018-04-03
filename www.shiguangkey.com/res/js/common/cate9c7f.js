var cId;
var type;
var sort;
$(function() {
  $("body").on("click", ".cateLink", function() {
    cId = $(this).data("id");
    load();
  });
  $("body").on("click", "#vip", function() {
    $("#free>span").removeClass("checked");
    change(this);
    load();
  });
  $("body").on("click", "#free", function() {
    $("#vip>span").removeClass("checked");
    change(this);
    load();
  });
  $("body").on("click", "#isLive", function() {
    change(this);
    load();
  });

  (function($) {
    $.getUrlParam = function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    };
  })(jQuery);
  var courseCount = parseInt($("#count").val());
  if (courseCount > 24) {
    var coursePaeg = $.getUrlParam("page");
    if (coursePaeg == null) {
      coursePaeg = 1;
    }
    coursePaeg = parseInt(coursePaeg);
    $("#pageTool").html("");
    $("#pageTool").Paging({
      pagesize: 24,
      current: coursePaeg,
      count: courseCount,
      callback: function(page, size, count) {
        load(page);
      }
    });
  }

  $.ajax({
    url: "/user/loginDiv.html",
    success: function(data) {
      $("#loginDiv").html(data);
    }
  });
});
//选择添加样式
function change(obj) {
  if (
    $(obj)
      .children()
      .hasClass("checked")
  ) {
    $(obj)
      .children()
      .removeClass("checked");
  } else {
    $(obj)
      .children()
      .addClass("checked");
  }
}

function load(page) {
  var url = "/course/list";
  var paramBoolean = false;
  var cateId = $.getUrlParam("cateId");
  if (cId || cId === 0) {
    if (cId > 0) {
      url += "?cateId=" + cId;
      paramBoolean = true;
    }
  } else if (cateId) {
    url += "?cateId=" + cateId;
    paramBoolean = true;
  }
  if (
    $("#isLive")
      .children()
      .hasClass("checked")
  ) {
    if (paramBoolean) {
      url += "&isLive=true";
    } else {
      url += "?isLive=true";
      paramBoolean = true;
    }
  }
  if (
    $("#vip")
      .children()
      .hasClass("checked") &&
    !$("#free")
      .children()
      .hasClass("checked")
  ) {
    type = 5310;
  } else if (
    !$("#vip")
      .children()
      .hasClass("checked") &&
    $("#free")
      .children()
      .hasClass("checked")
  ) {
    type = 5311;
  } else if (
    $("#vip")
      .children()
      .hasClass("checked") &&
    $("#free")
      .children()
      .hasClass("checked")
  ) {
    type = "all";
  }
  if (type) {
    if (paramBoolean) {
      url += "&type=" + type;
    } else {
      url += "?type=" + type;
      paramBoolean = true;
    }
  }
  var sort = $("#sort").val();
  if (sort == "desc" || sort == "asc") {
    if (paramBoolean) {
      url += "&priceSort=" + sort;
    } else {
      url += "?priceSort=" + sort;
      paramBoolean = true;
    }
  }
  if (page != null) {
    if (paramBoolean) {
      url += "&page=" + page;
    } else {
      url += "?page=" + page;
      paramBoolean = true;
    }
  }

  location.href = url;
}
