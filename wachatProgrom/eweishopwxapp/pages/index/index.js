function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a,
    t;
}

var e, a, i = getApp(), o = i.requirejs("core"), n = i.requirejs("wxParse/wxParse"), s = i.requirejs("biz/diypage"), c = i.requirejs("biz/diyform"), r = i.requirejs("biz/goodspicker");

i.requirejs("foxui"),
Page((a = {
    data: (e = {
        imgUrls: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509963648306&di=1194f5980cccf9e5ad558dfb18e895ab&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F9c16fdfaaf51f3de87bbdad39ceef01f3a29797f.jpg", "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509963737453&di=b1472a710a2c9ba30808fd6823b16feb&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fwenwen%2Fuploads%2Fpic.wenwen.soso.com%2Fp%2F20160830%2F20160830220016-586751007.jpg", "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3004162400,3684436606&fm=11&gp=0.jpg"],
        indicatorDotss: !0,
        autoplays: !0,
        intervals: 2e3,
        durations: 500,
        circulars: !0,
        adveradmin: !0,
        clock: "",
        diypage: "true",
        route: "home",
        icons: i.requirejs("icons"),
        shop: {},
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        circular: !0,
        storeRecommand: [],
        total: 1,
        page: 1,
        loaded: !1,
        loading: !0,
        indicatorDotsHot: !1,
        autoplayHot: !0,
        intervalHot: 5e3,
        durationHOt: 1e3,
        circularHot: !0,
        hotimg: "/static/images/hotdot.jpg",
        notification: "/static/images/notification.png",
        saleout1: "/static/images/saleout-1.png",
        saleout2: "/static/images/saleout-2.png",
        saleout3: "/static/images/saleout-3.png",
        play: "/static/images/video_play.png",
        mute: "/static/images/icon/mute.png",
        voice: "/static/images/icon/voice.png",
        specs: [],
        options: [],
        diyform: {},
        specsTitle: ""
    },
    t(e, "total", 1),
    t(e, "active", ""),
    t(e, "slider", ""),
    t(e, "tempname", ""),
    t(e, "buyType", ""),
    t(e, "areas", []),
    t(e, "closeBtn", !1),
    t(e, "soundpic", !0),
    t(e, "modelShow", !1),
    t(e, "limits", !0),
    t(e, "result", {}),
    t(e, "showcoupon", !1),
    t(e, "showcoupontips", !1),
    e),
    getShop: function() {
        var t = this;
        o.get("shop/get_shopindex", {}, function(e) {
            n.wxParse("wxParseData", "html", e.copyright, t, "5"),
            t.setData({
                shop: e
            });
        });
    },
    onReachBottom: function() {
        this.data.loaded || this.data.storeRecommand.length == this.data.total || this.getRecommand();
    },
    getRecommand: function() {
        var t = this;
        "true" != t.data.diypage && o.get("shop/get_recommand", {
            page: t.data.page
        }, function(e) {
            var a = {
                loading: !1,
                total: e.total
            };
            t.setData({
                loading: !1,
                total: e.total,
                show: !0
            }),
            e.list || (e.list = []),
            e.list.length > 0 && (t.setData({
                storeRecommand: t.data.storeRecommand.concat(e.list),
                page: e.page + 1
            }),
            e.list.length < e.pagesize && (a.loaded = !0));
        });
    },
    onLoad: function(t) {
        t = t || {};
        var e = this
          , a = decodeURIComponent(t.scene);
        if (!t.id && a) {
            var n = o.str2Obj(a);
            t.id = n.id,
            n.mid && (t.mid = n.mid);
        }
        setTimeout(function() {
            e.setData({
                areas: i.getCache("cacheset").areas
            });
        }, 3e3),
        i.url(t),
        s.get(this, "home", function(t) {
            if (void 0 != e.data.startadv && "" != e.data.startadv) {
                0 != e.data.startadv.status && "" != e.data.startadv || wx.getSetting({
                    success: function(t) {
                        t.authSetting["scope.userInfo"] && e.get_nopayorder();
                    }
                });
                var a = e.data.startadv.params;
                if ("default" == a.style) {
                    var o = a.autoclose;
                    !function t(a) {
                        e.setData({
                            clock: o
                        }),
                        o <= 0 ? e.setData({
                            adveradmin: !1
                        }) : setTimeout(function() {
                            o -= 1,
                            t(a);
                        }, 1e3);
                    }(e);
                }
                if (1 == a.showtype) {
                    var n = 1e3 * a.showtime * 60
                      , s = i.getCache("startadvtime")
                      , c = +new Date()
                      , r = !0;
                    e.setData({
                        adveradmin: !0
                    }),
                    s && c - s < n && (r = !1),
                    e.setData({
                        adveradmin: r
                    }),
                    r && i.setCache("startadvtime", c);
                }
                e.data.startadv.status;
            }
        }),
        e.setData({
            cover: !0,
            showvideo: !1
        }),
        wx.getSystemInfo({
            success: function(t) {
                var a = t.windowWidth / 1.7;
                e.setData({
                    swiperheight: a
                });
            }
        });
    },
    onHide: function() {
        this.setData({
            adveradmin: !1,
            unpaid: !1
        });
    },
    onShow: function() {
        var t = this
          , e = wx.getSystemInfoSync()
          , a = i.getCache("sysset");
        t.getShop(),
        t.getRecommand(),
        t.get_hasnewcoupon(),
        t.get_cpinfos(),
        wx.getSetting({
            success: function(e) {
                var a = e.authSetting["scope.userInfo"];
                t.setData({
                    limits: a
                });
            }
        });
        var o = a.shopname || "商城首页";
        t.data.pages && "" != t.data.pages.title && (o = t.data.diytitle),
        wx.setNavigationBarTitle({
            title: o
        }),
        t.data.pages && wx.setNavigationBarColor({
            frontColor: t.data.pages.titlebarcolor,
            backgroundColor: t.data.pages.titlebarbg
        }),
        t.setData({
            screenWidth: e.windowWidth
        });
    },
    onShareAppMessage: function() {
        return o.onShareAppMessage();
    },
    imagesHeight: function(t) {
        var e = t.detail.width
          , a = t.detail.height
          , i = t.target.dataset.type
          , o = this;
        wx.getSystemInfo({
            success: function(t) {
                o.data.result[i] = t.windowWidth / e * a,
                (!o.data[i] || o.data[i] && result[i] < o.data[i]) && o.setData({
                    result: o.data.result
                });
            }
        });
    },
    bindInput: function(t) {
        this.setData({
            inputValue: t.detail.value
        });
    },
    t1: function(t) {
        s.fixedsearch(this, t);
    },
    startplay: function(t) {
        var e = t.target.dataset.cover;
        this.setData({
            cover: e,
            showvideo: !0
        }),
        this.videoContext = wx.createVideoContext("Video"),
        this.videoContext.play();
    },
    unpaidcolse: function(t) {
        var e = "";
        e = "open" == t.target.dataset.type,
        this.setData({
            unpaid: e
        });
    },
    unpaidcolse2: function(t) {
        this.setData({
            unpaidhide: !0
        });
    },
    get_nopayorder: function() {
        var t = this;
        o.get("shop/get_nopayorder", {}, function(e) {
            1 == e.hasinfo && t.setData({
                nopaygoods: e.goods,
                nopaygoodstotal: e.goodstotal,
                nopayorder: e.order,
                unpaid: !0
            });
        });
    },
    get_hasnewcoupon: function() {
        var t = this;
        o.get("shop/get_hasnewcoupon", {}, function(e) {
            1 == e.hasnewcoupon && t.setData({
                showcoupontips: !0
            });
        });
    },
    get_cpinfos: function() {
        var t = this;
        o.get("shop/get_cpinfos", {}, function(e) {
            1 == e.hascpinfos && t.setData({
                showcoupon: !0,
                cpinfos: e.cpinfos
            });
        });
    },
    adverclose: function() {
        this.setData({
            adveradmin: !1
        }),
        this.get_nopayorder();
    },
    indexChangebtn: function(t) {
        var e = t.currentTarget.dataset.type;
        wx.navigateTo({
            url: e
        });
    }
},
t(a, "unpaidcolse", function(t) {
    var e = "";
    e = "open" == t.target.dataset.type,
    this.setData({
        unpaid: e
    });
}),
t(a, "unpaidcolse2", function(t) {
    this.setData({
        unpaidhide: !0
    });
}),
t(a, "selectPicker", function(t) {
    var e = this;
    wx.getSetting({
        success: function(a) {
            a.authSetting["scope.userInfo"] ? (r.selectpicker(t, e, "goodslist"),
            e.setData({
                cover: "",
                showvideo: !1
            })) : e.setData({
                modelShow: !0
            });
        }
    });
}),
t(a, "specsTap", function(t) {
    var e = this;
    r.specsTap(t, e);
}),
t(a, "emptyActive", function() {
    this.setData({
        active: "",
        slider: "out",
        tempname: "",
        specsTitle: ""
    });
}),
t(a, "buyNow", function(t) {
    var e = this;
    r.buyNow(t, e);
}),
t(a, "getCart", function(t) {
    var e = this;
    r.getCart(t, e);
}),
t(a, "select", function() {
    var t = this;
    r.select(t);
}),
t(a, "inputNumber", function(t) {
    var e = this;
    r.inputNumber(t, e);
}),
t(a, "number", function(t) {
    var e = this;
    r.number(t, e);
}),
t(a, "onChange", function(t) {
    return c.onChange(this, t);
}),
t(a, "DiyFormHandler", function(t) {
    return c.DiyFormHandler(this, t);
}),
t(a, "selectArea", function(t) {
    return c.selectArea(this, t);
}),
t(a, "bindChange", function(t) {
    return c.bindChange(this, t);
}),
t(a, "onCancel", function(t) {
    return c.onCancel(this, t);
}),
t(a, "onConfirm", function(t) {
    return c.onConfirm(this, t);
}),
t(a, "getIndex", function(t, e) {
    return c.getIndex(t, e);
}),
t(a, "changevoice", function() {
    this.data.sound ? this.setData({
        sound: !1,
        soundpic: !0
    }) : this.setData({
        sound: !0,
        soundpic: !1
    });
}),
t(a, "phone", function() {
    var t = this.data.phonenumber + "";
    wx.makePhoneCall({
        phoneNumber: t
    });
}),
t(a, "cancelclick", function() {
    this.setData({
        modelShow: !1
    });
}),
t(a, "confirmclick", function() {
    this.setData({
        modelShow: !1
    }),
    wx.openSetting({
        success: function(t) {}
    });
}),
t(a, "navigate", function(t) {
    var e = t.currentTarget.dataset.url
      , a = t.currentTarget.dataset.phone
      , i = t.currentTarget.dataset.appid
      , o = t.currentTarget.dataset.appurl;
    e && wx.navigateTo({
        url: e
    }),
    a && wx.makePhoneCall({
        phoneNumber: a
    }),
    i && wx.navigateToMiniProgram({
        appId: i,
        path: o
    });
}),
t(a, "closecoupon", function() {
    this.setData({
        showcoupon: !1
    });
}),
t(a, "closecoupontips", function() {
    this.setData({
        showcoupontips: !1
    });
}),
a));
