/**
 * Created by yanping on 2017/9/6.
 */
(function(global) {
  var utils = live.utils;
  var GET_COOKIE = utils.AUTH_API + "/userInfo/syncAuthStatus";
  var COURSE_INFO = utils.SGKT_API + "/course/getByStudent";
  var APPLY = utils.SGKT_API + "/interaction/signupCourse"; //报名或取消
  var GET_COLLECT = utils.SGKT_API + "/interaction/queryCollectCourse";
  var GET_CATE = utils.SGKT_API + "/cate/query";
  var GET_ROOM_INFO = utils.STUDY_API + "/course/get-chatroom-detail";
  var GET_USER_INFO = utils.AUTH_API + "/userInfo/mine";
  var get_VIDEO_URL = utils.SGKT_API + "/course/getVideoUrlForUser";
  var GET_CLASS_DETAIL = utils.SGKT_API + "/course/queryChatper";
  var IMG_CDN = "https://res.shiguangkey.com/";
  var COURSE_ID = getCourseId(),
    CLASS_ID = getClassId();
  var VIDEO_ID = utils.getQueryString("videoId");
  var videoOptions = {};
  global.live.videoOptions = videoOptions;

  var NAV_VM;

  var vm = avalon.define({
    $id: "record",
    courseId: COURSE_ID,
    // showLogin: false,
    playing: true,
    isLogin: false,
    leftTab: 1, //左边菜单tab
    showAppCode: false, //显示左边的app
    announcement: "", //公告
    collectList: [],
    cates: [],
    mine: {
      nickname: "",
      headImg: "",
      role: 3
    },
    courseInfo: {
      title: "", //课程名称
      cover: "", //课程封面
      qqGroupVOs: [], //QQ群
      courseChapter: [], //章节信息
      courseTeacherInfo: [], //老师信息
      signUp: 0, //是否已报名(1:是，0：否)
      collectCourse: 0, //是否已收藏(1:是，0：否)
      collectNum: 0 //收藏总人数
    },
    chapterInfo: {
      //章节信息
      title: "",
      video: {},
      flowerCount: 0,
      teacherName: "",
      teacherAvatar: ""
    },
    isVipCourse: false,
    chapters: [],
    classInfo: { courseChapter: [] },
    getVm: function(e) {
      NAV_VM = e.vmodel;
    },
    initCourse: function(data) {
      var self = this;
      var cover = IMG_CDN + data.cover;
      document.title = "潭州课堂-" + data.title;
      this.courseInfo = avalon.mix(data, { cover: cover, courseId: COURSE_ID });
      this.isVipCourse = data.typeDicFk == 5310;
    },
    getCollect: function() {
      var self = this;
      utils
        .xhrHttp({
          url: GET_COLLECT,
          data: {
            pageIndex: 0,
            pageSize: 10
          }
        })
        .then(function(res) {
          var data = res.data.list;
          self.collectList = data.map(function(course) {
            return avalon.mix(course, {
              cover: IMG_CDN + course.cover + "!mall-live-collect"
            });
          });
        });
    },
    getCates: function() {
      var self = this;
      utils.xhrHttp(GET_CATE).then(function(res) {
        self.cates = (res.data.list || []).filter(function(cate) {
          return cate.superCateId == 0;
        });
      });
    },
    getRoomInfo: function() {
      var self = this;
      var params = { courseId: COURSE_ID };
      this.isVipCourse && (params.classId = CLASS_ID);
      utils
        .xhrHttp({
          url: GET_ROOM_INFO,
          data: params
        })
        .then(function(res) {
          self.announcement = res.data.announcement;
        });
    },
    chapterCollapse: function(chapter) {
      if (chapter.liveStatusDicFk || chapter.vedios.length) {
        chapter.collapse = !chapter.collapse;
      }
    },
    leftNavIn: function(e) {
      var handler = e.target || e.srcElement;
      var left = document.querySelector(".web-left-main");
      $(handler)
        .stop()
        .animate(
          {
            left: "-42px"
          },
          "fast",
          "linear",
          function() {
            $(left)
              .stop()
              .animate(
                {
                  left: 0
                },
                "normal"
              );
          }
        );
    },
    leftNavOut: function(e) {
      var left = e.target || e.srcElement;
      var handler = document.querySelector(".web-left");
      $(left)
        .stop()
        .animate(
          {
            left: "-290px"
          },
          "normal",
          "swing",
          function() {
            $(handler)
              .stop()
              .animate(
                {
                  left: 0
                },
                "normal",
                "swing"
              );
          }
        );
    },
    noApply: function() {
      var self = this;
      var type = this.courseInfo.typeDicFk; //5310:VIP 5311:公开课
      if (type == 5310) {
        utils.confirm({
          closeBtn: 0,
          content: "您还没购买此课程",
          btn: ["点击购买"],
          yes: function() {
            window.open("/course/" + COURSE_ID);
          }
        });
      } else {
        this.applyCourse();
      }
    },
    applyCourse: function() {
      var self = this;
      // var signUpStatus = this.courseInfo.signUp || 0;
      utils
        .xhrHttp({
          url: APPLY,
          data: { courseId: COURSE_ID, status: 0 }
        })
        .then(function(res) {
          if (res.data.result == 1) {
            self.courseInfo.signUp = 1;
            // layer.msg('报名成功');
            self.playVideo();
          }
        });
    },
    changeVideo: function(videoId, e) {
      e.stopPropagation();
      if (this.chapterInfo.video.videoId != videoId) {
        this.playing = false;
        this.playVideo(videoId);
      }
    },
    playVideo: function(videoId) {
      var self = this;
      videoId = videoId || VIDEO_ID;
      videoOptions.play = false;
      this.playing = true;
      this.getVideoInfo(videoId)
        .then(function() {
          avalon.mix(videoOptions, {
            play: false,
            vid: self.chapterInfo.video.url,
            autoplay: false
          });
          setTimeout(function() {
            var pro = $.Deferred();
            var frame = document.getElementById("videoPlayer");
            frame.contentWindow.initPlay
              ? pro.resolve()
              : (frame.onload = function() {
                  pro.resolve();
                });
            pro.then(function() {
              videoOptions.play = true;
              frame.contentWindow.initPlay();
            });
          }, 0);
        })
        .fail(function() {
          self.playing = false;
        });
    },
    getVideoInfo: function(videoId) {
      var self = this;
      var getVideoUrl = utils.xhrHttp({
        url: get_VIDEO_URL,
        data: { videoId: videoId }
      });
      var chapters = this.chapters.filter(function(chapter) {
        var result = (chapter.vedios || []).some(function(video) {
          return video.videoId == videoId;
        });
        if (result) {
          chapter.collapse = true;
          return true;
        }
      });
      return getVideoUrl
        .then(function(res) {
          var data = res.data;
          var isNoAuth = data.isNoAuth;
          avalon.mix(self.chapterInfo, chapters.length ? chapters[0] : {}, {
            video: { url: data.activeUrl, videoId: videoId }
          });
          if (!data.activeUrl) {
            return $.Deferred().reject(isNoAuth);
          }
        })
        .fail(function(isNoAuth) {
          if (isNoAuth != 1) {
            if (isNoAuth == 10) {
              //冻结
              utils.confirm({
                content: "您目前是休学状态，不能观看录播视频",
                btn: [],
                closeBtn: 0
              });
              // return $.Deferred().reject();
            } else if (isNoAuth == 0) {
              //没报名
              self.noApply();
            }
          }
        });
    },
    login: function() {
      NAV_VM.login(true);
    },
    getClassDetail: function() {
      var self = this;
      return utils
        .xhrHttp({
          url: GET_CLASS_DETAIL,
          data: {
            courseId: COURSE_ID,
            classId: CLASS_ID
          }
        })
        .then(function(res) {
          self.classInfo = res.data;
        });
    }
  });
  vm.$watch("onReady", function() {
    var self = this;
    var token = utils.getQueryString("token");
    if (!(COURSE_ID && VIDEO_ID)) {
      alert("参数不对，请返回课程首页");
      return;
    }
    var coursePro = utils.xhrHttp(
      {
        url: COURSE_INFO,
        data: { courseId: COURSE_ID },
        type: "get",
        dataType: "json",
        xhrFields: {
          withCredentials: true
        }
      },
      true
    );
    coursePro
      .then(function(courseRes) {
        var course = courseRes.data.course;
        self.initCourse(course);
        if (self.isVipCourse) {
          self.getRoomInfo();
          return self.getClassDetail();
        }
      })
      .then(function() {
        var isVip = self.isVipCourse;
        var mainTeacher = isVip
          ? self.classInfo.teacherExtendInfo
          : self.courseInfo.courseTeacherInfo.filter(function(teacher) {
              return teacher.roleType == 5703;
            })[0];
        self.chapters = (isVip
          ? self.classInfo.chapters
          : self.courseInfo.courseChapter
        ).map(function(chapter) {
          return avalon.mix(
            {
              collapse: false
            },
            chapter
          );
        });
        mainTeacher &&
          avalon.mix(self.chapterInfo, {
            teacherAvatar: mainTeacher.headIcon,
            teacherName: mainTeacher.name
          });
        self.playVideo();
      });
    (token
      ? $.Deferred().resolve({ data: { token: token } })
      : utils.xhrHttp(GET_COOKIE, undefined, false)
    )
      .then(function(tokenRes) {
        var token = tokenRes.data.token;
        document.cookie = "token=" + token + "; path=/";
        self.isLogin = true;
        return $.when(utils.xhrHttp(GET_USER_INFO), coursePro);
      })
      .then(function(userRes, courseRes) {
        var user = userRes.data.userDetail;
        var course = courseRes.data.course;
        var teacher = course.courseTeacherInfo.filter(function(teacher) {
          return teacher.userIdFk == user.uid;
        });
        //self.getCollect();
        self.mine = user;
        if (teacher.length) {
          //是老师
          self.mine.role = teacher[0].teacher == 1 ? 1 : 2;
        }
      })
      .fail(function(tokenRes) {
        self.playing = false;
        if (tokenRes.status == 6101) {
          self.login();
          // self.showLogin = true;
        }
      });
    this.getCates();
  });

  function getCourseId() {
    var courseId = utils.getQueryString("courseId");
    var pattern = location.href.match(/\/video\/(\d+)/);
    if (courseId) return courseId;
    pattern && (courseId = pattern[1]);
    return courseId;
  }

  function getClassId() {
    var classId = utils.getQueryString("classId");
    var pattern = location.href.match(new RegExp("/" + COURSE_ID + "/(\\d+)"));
    if (classId) return classId;
    pattern && (classId = pattern[1]);
    return classId;
  }

  avalon.filters.transSecond = function(t) {
    if (!t) return "00:00:00";

    function add0(num) {
      return ("0" + num).slice(-2);
    }

    function add00(s) {
      return (s + "00:00").slice(0, 8);
    }
    var remain = t,
      ret = "",
      i = 2;
    do {
      var pw = Math.pow(60, i);
      ret += add0(parseInt(remain / pw)) + ":";
      remain = parseInt(remain % pw);
    } while (i-- && remain);
    return add00(ret);
  };
})(this);
