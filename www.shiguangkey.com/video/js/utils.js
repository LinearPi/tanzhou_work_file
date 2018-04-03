/**
 * Created by yanping on 2017/9/1.
 */
(function (global) {
    var env = '',
        hasGit = false;
    var postFix = (hasGit ? '-git' : '')+env;
    var SGKT_API = 'https://www'+postFix+'.shiguangkey.com/api';
    var STUDY_API = 'https://study'+postFix+'.shiguangkey.com/api';
    var AUTH_API = 'https://auth2'+postFix+'.shiguangkey.com/api';
    var DEBUG = false,
        TRACE = true;
    var utils = {
        SGKT_API: SGKT_API,
        STUDY_API: STUDY_API,
        AUTH_API: AUTH_API,
        xhrHttp: function (options, noLogin, isTips) {
            if(typeof options !== 'object') {
                if(!options) {
                    alert('无效请求，没有url');
                    return;
                }
                options = {url: options};
            }
            var data = options.data || {},
                dataType = options.dataType || 'jsonp',
                type = options.type || 'post';
            (type !== 'get') && (data.terminalType = 5);
            if(!noLogin) {
                var token = utils.getCookie('token');
                token && (data.token = token);
            }
            (isTips === undefined) && (isTips = true);
            return $.ajax($.extend(options, {
                type: type,
                url: options.url,
                data: data,
                dataType: dataType
            })).then(function (res) {
                if (res) {
                    if (res.status === 0) return res;
                    isTips && layer.msg(res.msg);
                    return $.Deferred().reject(res);
                }
            }).fail(function (err) {
                return $.Deferred().reject(err);
            });
        },
        rHtml: function (fn) {
            return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><');
        },
        getCookie: function (name) { //获取指定的cookie值
            var reg = new RegExp(name + '=([^;]+)');
            var mc = document.cookie.match(reg);
            if (mc && mc.length == 2) return mc[1];
        },
        getQueryString: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var restReg = new RegExp('\/')
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURIComponent(r[2]);
            }
            return null;
        },
        log: function () {
            if (!DEBUG || !window.console || typeof console.log !== 'function') return;
            var args = [].slice.call(arguments);
            args.unshift('DEBUG:');
            if (TRACE) {
                var stacks = [];
                try {
                    throw Error()
                } catch (e) {
                    if (e.stack) stacks = e.stack.split('\n'); //IE10+
                    stacks.splice(0, 2); // 去除Error:
                }
                stacks.length && args.push('\n>>>' + stacks.join('\n>>>'))
            }
            console.log.apply(console, args);
        },
        confirm: function (option) {
            var defaults = {
                title: '提示',
                content: '',
                skin: 'layer-custom-confirm',
                offset: ['50%', '50%'],
                btn: [],
                move: false,
                yes: function (index) {
                    layer.close(index);
                }
            };
            layer.open(avalon.mix(defaults, option));
        },
        closeAll: function () {
            layer.closeAll();
        },
        // 时间控制  返回一个函数 函数接受一个需要被控制时间的name 和控制的频率
        timeControl: function () {
            var timer = {};
            return function (name, time) {
                var last = 0;
                if (name in timer) {
                    last = timer[name];
                }
                if (+new Date - last > time) {
                    timer[name] = +new Date;
                    return true;
                }
                return false;
            }
        }
    };
    global.live = global.live || {};
    global.live.utils = utils;
})(this);
(function () {
    var utils = live.utils;
    avalon.filters.wrap = function (str) {
        return str.replace(/\n/g, '<br>');
    };
    avalon.component('ms-nav', {
        template: utils.rHtml(function () {
            /*
            <div class="header">
                <div class="header-center">
                    <div class="header-logo lf">
                        <a href="/" target="_blank"><img src="images/logo.png" alt=""></a>
                    </div>
                    <ul class="header-nav lf clearfix">
                        <li><a href="/" target="_blank">首页</a></li>
                        <li><a href="/course/list" target="_blank">全部课程</a></li>
                        <li><a href="/help/downloadApp" target="_blank">客户端</a></li>
                    </ul>
                    <div class="header-search lf">
                        <input type="text" placeholder="搜索课程关键词" :duplex="@courseKeyWord">
                        <button :on-click="@searchCourse">搜索</button>
                    </div>
                    <div class="header-btn rf" :if="!@isLogin">
                        <a href="javascript:;" :on-click="@register"><span class="bg"></span><i class="bg">注册</i></a>
                        <a href="javascript:;" :on-click="@login"><span class="bg"></span><i class="bg">登录</i></a>
                    </div>
                    <!--已登录状态-->
                    <div class="thelogin rf" id="thelogin" :if="@isLogin">
                        <div class="personal rf">
                            <a href="/i/course" target="_blank" class="perimg" >
                                <img  :attr="{src: @userInfo.headImg || 'images/people.png'}" id="imgId1">
                            </a>
                            <div class="peohover">
                                <i class="icon pericon"></i>
                                <ul class="perul">
                                    <li><a href="/i/course" target="_blank">课表</a></li>
                                    <li><a href="/i/order"  target="_blank">我的订单</a></li>
                                    <!--<li><a href="/studentAdmin/main.html#collection"  target="_blank">收藏</a></li>-->
                                    <li><a href="/i/profile"  target="_blank">个人信息</a></li>
                                    <!--<li><a href="/studentAdmin/main.html#studentMail"  target="_blank">站内信</a></li>
                                    <li><a href="/studentAdmin/main.html#myCoupon" target="_blank">优惠券</a></li>-->
                                    <li><a href="javascript:void(0);" class="pertopbor" :on-click="@logout">退出</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="loginDiv" class="none"></div>
            </div>
            */
        }),
        defaults: {
            showLogin: false, //显示登录弹窗
            courseKeyWord: '',
            isLogin: true,
            courseId: '',
            getVm: avalon.noop,
            userInfo: {
                nickname: '',
                headImg: ''
            },
            // roles: {
            //     principal: false,
            //     teacher: false,
            //     tutor: false
            // },
            onInit: function(e) {
                this.getVm(e);
            },
            onReady: function () {
                var self = this;
                // this.login(this.showLogin);
                this.$watch('isLogin', function (isLogin) {
                    self.login(isLogin);
                });
                // utils.xhrHttp(utils.SGKT_API + '/study/getRole', {}, false).then(function (res) {
                //     self.roles = res.data;
                // });
            },
            searchCourse: function () {
                var key = this.courseKeyWord;
                window.open('/course/search?' + $.param({
                    cateKey: key,
                    key: key
                }));
            },
            login: function (show) {
                var $login = $('#loginDiv'),
                    self = this;
                    
                function showLogin() {
                    self.isLogin = true;
                    $login.removeClass('none');
                }
                function hideLogin() {
                    self.isLogin = false;
                    $login.addClass('none');
                }
                if(show) {
                    if ($login.is(':empty')) {
                        $login.load(utils.SGKT_API.slice(0, -4) + '/user/loginDiv.html', function () {
                            showLogin();
                        });
                    } else {
                        showLogin();
                    }
                } else {
                    hideLogin();
                }
            },
            register: function () {
                var $login = $('#loginDiv');

                function showRegister() {
                    window.toRegister && window.toRegister();
                }
                if ($login.is(':empty')) {
                    $login.load(utils.SGKT_API.slice(0, -4) + '/user/loginDiv.html', function () {
                        showRegister();
                    });
                } else {
                    showRegister();
                }
            },
            logout: function () {
                var self = this;
                utils.xhrHttp(utils.AUTH_API + '/login/ignore').then(function () {
                    var exp = new Date();
                    exp.setTime(exp.getTime() - 1);
                    document.cookie = 'token=undefined;path=/;expires=' + exp.toGMTString();
                    location.href = '/course/' + self.courseId;
                });
            }
        }
    });

    avalon.component('ms-header', {
        template: utils.rHtml(function () {
            /*
            <div class="web-top clearfix">
                <div class="pic lf"><img :attr="{src: @chapterInfo.teacherAvatar || './images/people.png'}" alt=""></div>
                <div class="text lf">
                    <h3 class="ell" :if="@chapterInfo.title">当前章节:{{@chapterInfo.title}}</h3>

                    <h4 class="ell" :if="@chapterInfo.title">所属课程&nbsp;:&nbsp;{{@title}}{{@period ? '['+@period+'期'+']' : ''}}</h4>
                    <h3 class="ell" :if="!@chapterInfo.title" style="margin-bottom: 8px;">当前课程&nbsp;:&nbsp;{{@title}}{{@period ? '['+@period+'期'+']' : ''}}</h3>
                    
                    <p :if="@chapterInfo.teacherName != ''">
                        {{@chapterInfo.teacherName}}
                        <span :visible="false"><s></s><i class="ico"></i>{{@chapterInfo.flowerCount || 0}}</span>
                    </p>
                </div>
                <div class="add-more rf">
                    <div class="add-more-top  clearfix">
                        <!--<div class="add-love add rf">
                            <a href="javascript:;" class="ico" :class="{active: @collectCourse == 1}" :on-click="@handleCollect"></a>
                            <span>{{@collectNum}}</span>
                        </div>-->
                        <div class="add-qq rf" :if="@allowJoinQQGroup">
                            <span class="ico add" :on-mouseenter="@showAddQQ = true" :on-mouseleave="@hoverLeave('showAddQQ')">加入QQ群</span>
                            <ul :visible="@showAddQQ" :on-mouseenter="hoverEnter('showAddQQ')" :on-mouseleave="@showAddQQ = false">
                                <li ms-for="qq in @qqGroupVOs">
                                    <i class="ico"></i>{{qq.account}}<a class="ico" :attr="{href: qq.joinUrl}" target="_blank"></a>
                                </li>
                                <li :visible="@qqGroupVOs.length === 0">暂无QQ群</li>
                            </ul>
                        </div>
                    </div>
                    <div class="add-more-bottom clearfix">
                        <div class="pc rf">
                            <span class="creat"><span><i class="ico"></i></span><a href="/help/downloadPc" target="_blank">客户端更流畅</a></span>
                        </div>
                        <div class="phone rf">
                            <span class="creat" :on-mouseenter="@showAppCode = true" :on-mouseleave="@hoverLeave('showAppCode')">
                                <span><i class="ico"></i></span>手机也能上课
                            </span>
                            <div class="app" :visible="@showAppCode" :on-mouseenter="hoverEnter('showAppCode')" :on-mouseleave="@showAppCode = false">
                                <div class="ios">
                                    <div class="ios-pic"><img src="/res/images/downapp.png" alt=""></div>
                                </div>
                            </div>
                        </div>
                        <div class="share rf">
                            <span class="creat" :on-mouseenter="@showShare = true" :on-mouseleave="@hoverLeave('showShare')">
                                <span><i class="ico"></i></span>分享
                            </span>
                            <div class="share-list" :visible="@showShare" :on-mouseenter="hoverEnter('showShare')" :on-mouseleave="@showShare = false">
                                <a class="ico" :attr="{href: @share.qq}" target="_blank"></a>
                                <a class="ico" href="javascript:;" :on-click="@showShareWechat = true,@showShare = false"></a>
                                <a class="ico" :attr="{href: @share.sina}" target="_blank"></a>
                                <a class="ico" :attr="{href: @share.qqZone}" target="_blank"></a>
                            </div>
                        </div>
                    </div>
                </div>
                <!--取消收藏的弹窗部分-->
                <div :visible="@showNoCollect">
                    <div class="web-bg"></div>
                    <div class="popup">
                        <p>提示 <span class="ico" :on-click="@showNoCollect = false"></span></p>
                        <div class="caution">
                            <span class="ico"></span>您真的不再收藏了吗?
                        </div>
                        <div class="btn clearfix">
                            <a href="javascript:;" :on-click="@collect">确定</a>
                            <a href="javascript:;" :on-click="@showNoCollect = false">取消</a>
                        </div>
                    </div>
                </div>
                <!--微信分享弹出的二维码弹窗-->
                <div class="share-code" :visible="@showShareWechat">
                    <span class="close ico" :on-click="@showShareWechat = false"></span>
                    <p>请用微信【扫一扫】扫描下面的二维码</p>
                    <div class="code-pic"><img :attr="{src: @share.wechat}"></div>
                </div>
            </div>
            */
        }),
        defaults: {
            courseId: '', //课程id
            title: '', //课程名称
            cover: '', //课程封面
            qqGroupVOs: [], //QQ群
            collectCourse: 0, //是否已收藏(1:是，0：否)
            collectNum: 0, //收藏总人数
            chapterInfo: { //章节信息
                flowerCount: 0,
                teacherName: '',
                teacherAvatar: ''
            },
            period: '', //班期数
            allowJoinQQGroup: false, //是否允许加QQ群
            HOVER_TIMEOUT: {}, //存放hover定时器
            showShare: false, //显示分享块
            showAppCode: false, //显示手机二维码
            showAddQQ: false, //显示加入qq群
            showShareWechat: false, //控制微信扫码
            showNoCollect: false, //显示不再收藏的确认弹窗
            $computed: {
                share: function () {
                    var courseTitle = '潭州课堂';
                    var QQ = 'http://connect.qq.com/widget/shareqq/index.html?'; //qq分享
                    var WECHAT = 'http://qr.liantu.com/api.php?'; //微信分享url
                    var SINA = 'http://service.weibo.com/share/share.php?'; //新浪微博分享url
                    var QQZONE = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'; //qq空间分享url
                    var title = this.title;
                    var cover = this.cover;
                    var url = location.href;
                    var content = '我在' + courseTitle + '学习“' + title + '”课程哟，干货十足，收获满满，你也来看看吧~。每天学一点，工作生活更美好~';
                    var qqShareParam = { url: url, title: courseTitle + '-' + title };
                    return {
                        qq: QQ + $.param($.extend({}, qqShareParam, { summary: content, desc: content, pics: cover })),
                        wechat: WECHAT + $.param({ text: url }),
                        sina: SINA + $.param($.extend({}, qqShareParam, { searchPic: false, pic: cover })),
                        qqZone: QQZONE + $.param($.extend({}, qqShareParam, { summary: content, pics: cover }))
                    };
                }
            },
            handleCollect: function () {
                if (this.collectCourse == 1) {
                    this.showNoCollect = true;
                } else {
                    this.collect();
                }
            },
            collect: function () {
                var self = this;
                var collectStatus = this.collectCourse;
                utils.xhrHttp({
                    url: utils.SGKT_API + '/interaction/collectCourse',
                    data: {
                        courseId: this.courseId,
                        status: collectStatus
                    }
                }).then(function (res) {
                    if (res.data.result == 1) {
                        self.showNoCollect = false;
                        self.collectCourse = 1 ^ collectStatus;
                        self.collectNum = +collectStatus ? (self.collectNum - 1) : (self.collectNum + 1);
                    }
                });
            },
            hoverEnter: function (param) {
                this.HOVER_TIMEOUT[param] && clearTimeout(this.HOVER_TIMEOUT[param]);
            },
            hoverLeave: function (param) {
                var self = this;
                this.HOVER_TIMEOUT[param] = setTimeout(function () {
                    self[param] = false;
                }, 100);
            }
        }
    });
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (callback, thisArg) {

            var T, k;

            if (this == null) {
                throw new TypeError(' this is null or not defined');
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (typeof callback !== "function") {
                throw new TypeError(callback + ' is not a function');
            }
            if (arguments.length > 1) {
                T = thisArg;
            }
            k = 0;
            while (k < len) {

                var kValue;
                if (k in O) {
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                }
                k++;
            }
        };
    }
    if (!Array.prototype.filter) {
        Array.prototype.filter = function (fun /* , thisArg*/) {
            "use strict";
            if (this === void 0 || this === null)
                throw new TypeError();
            var t = Object(this);
            var len = t.length >>> 0;
            if (typeof fun !== "function")
                throw new TypeError();
            var res = [];
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t) {
                    var val = t[i];
                    if (fun.call(thisArg, val, i, t))
                        res.push(val);
                }
            }
            return res;
        };
    }
    if (!Array.prototype.some) {
        Array.prototype.some = function (fun /*, thisArg*/) {
            'use strict';
            if (this == null) {
                throw new TypeError('Array.prototype.some called on null or undefined');
            }
            if (typeof fun !== 'function') {
                throw new TypeError();
            }
            var t = Object(this);
            var len = t.length >>> 0;
            var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(thisArg, t[i], i, t)) {
                    return true;
                }
            }
            return false;
        };
    }

    if (!Array.prototype.reduce) {
        Object.defineProperty(Array.prototype, 'reduce', {
            value: function (callback /*, initialValue*/) {
                if (this === null) {
                    throw new TypeError('Array.prototype.reduce ' +
                        'called on null or undefined');
                }
                if (typeof callback !== 'function') {
                    throw new TypeError(callback +
                        ' is not a function');
                }
                var o = Object(this);
                var len = o.length >>> 0;
                var k = 0;
                var value;
                if (arguments.length >= 2) {
                    value = arguments[1];
                } else {
                    while (k < len && !(k in o)) {
                        k++;
                    }
                    if (k >= len) {
                        throw new TypeError('Reduce of empty array ' +
                            'with no initial value');
                    }
                    value = o[k++];
                }
                while (k < len) {
                    if (k in o) {
                        value = callback(value, o[k], k, o);
                    }
                    k++;
                }
                return value;
            }
        });
    }

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement, fromIndex) {

            var k;
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if (len === 0) {
                return -1;
            }
            var n = +fromIndex || 0;
            if (Math.abs(n) === Infinity) {
                n = 0;
            }
            if (n >= len) {
                return -1;
            }
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            while (k < len) {
                if (k in O && O[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };
    }
    // 在符合条件的数组元素前面插入回调函数返回的值，最终返回新数组
    Array.prototype.insertBefore = function (callback, thisArg) {
        var T, k;
        if (!(this instanceof Array)) {
            throw new TypeError('该方法只能作用于数组');
        }
        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }
        var B = this.slice();
        len = this.length;
        if (arguments.length > 1) {
            T = thisArg;
        }
        k = 0, c = 0;
        while (k < len) {
            var kValue;
            if (k in this) {
                kValue = this[k];
                var R
                if (R = callback.call(T, kValue, k, this)) {
                    if (R !== undefined) {
                        B.splice(k + c++, 0, R)
                    }
                };
            }
            k++;
        }
        return B;
    };
})();
