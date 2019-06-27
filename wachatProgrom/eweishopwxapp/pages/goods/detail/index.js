var t = getApp(), e = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("foxui")), o = t.requirejs("biz/diyform"), i = t.requirejs("biz/goodspicker"), s = t.requirejs("jquery"), n = t.requirejs("wxParse/wxParse"), c = 0;

Page({
    data: {
        specs: [],
        options: [],
        icons: t.requirejs("icons"),
        goods: {},
        indicatorDots: !0,
        autoplay: !0,
        interval: 5e3,
        duration: 500,
        circular: !0,
        play: "/static/images/video_play.png",
        mute: "/static/images/icon/mute.png",
        voice: "/static/images/icon/voice.png",
        active: "",
        slider: "",
        tempname: "",
        info: "active",
        preselltimeend: "",
        presellsendstatrttime: "",
        advWidth: 0,
        dispatchpriceObj: 0,
        now: parseInt(Date.now() / 1e3),
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        timer: 0,
        discountTitle: "",
        istime: 1,
        istimeTitle: "",
        isSelected: !1,
        params: {},
        total: 1,
        optionid: 0,
        defaults: {
            id: 0,
            merchid: 0
        },
        buyType: "",
        pickerOption: {},
        specsData: [],
        specsTitle: "",
        canBuy: "",
        diyform: {},
        showPicker: !1,
        showcoupon: !1,
        pvalOld: [ 0, 0, 0 ],
        pval: [ 0, 0, 0 ],
        areas: [],
        noArea: !0,
        commentObj: {},
        commentObjTab: 1,
        loading: !1,
        commentEmpty: !1,
        commentPage: 1,
        commentLevel: "all",
        commentList: [],
        closeBtn: !1,
        soundpic: !0,
        animationData: {},
        uid: "",
        stararr: [ "all", "good", "normal", "bad", "pic" ],
        nav_mask: !1,
        nav_mask2: !1,
        nav: 0,
        giftid: "",
        limits: !0,
        modelShow: !1,
        showgoods: !0
    },
    favorite: function(t) {
        var a = this;
        if (a.data.limits) {
            var o = 1 == t.currentTarget.dataset.isfavorite ? 0 : 1;
            e.get("member/favorite/toggle", {
                id: a.data.options.id,
                isfavorite: o
            }, function(t) {
                t.isfavorite ? a.setData({
                    "goods.isfavorite": 1
                }) : a.setData({
                    "goods.isfavorite": 0
                });
            });
        } else this.setData({
            modelShow: !0
        });
    },
    menucart: function() {
        this.data.limits ? wx.switchTab({
            url: "/pages/member/cart/index"
        }) : this.setData({
            modelShow: !0
        });
    },
    goodsTab: function(t) {
        var a = this, o = t.currentTarget.dataset.tap;
        if ("info" == o) this.setData({
            info: "active",
            para: "",
            comment: ""
        }); else if ("para" == o) this.setData({
            info: "",
            para: "active",
            comment: ""
        }); else if ("comment" == o) {
            if (a.setData({
                info: "",
                para: "",
                comment: "active"
            }), a.data.commentList.length > 0) return void a.setData({
                loading: !1
            });
            a.setData({
                loading: !0
            }), e.get("goods/get_comment_list", {
                id: a.data.options.id,
                level: a.data.commentLevel,
                page: a.data.commentPage
            }, function(t) {
                t.list.length > 0 ? a.setData({
                    loading: !1,
                    commentList: t.list,
                    commentPage: t.page
                }) : a.setData({
                    loading: !1,
                    commentEmpty: !0
                });
            });
        }
    },
    comentTap: function(t) {
        var a = this, o = t.currentTarget.dataset.type, i = "";
        1 == o ? i = "all" : 2 == o ? i = "good" : 3 == o ? i = "normal" : 4 == o ? i = "bad" : 5 == o && (i = "pic"), 
        o != a.data.commentObjTab && e.get("goods/get_comment_list", {
            id: a.data.options.id,
            level: i,
            page: a.data.commentPage
        }, function(t) {
            t.list.length > 0 ? a.setData({
                loading: !1,
                commentList: t.list,
                commentPage: t.page,
                commentObjTab: o,
                commentEmpty: !1
            }) : a.setData({
                loading: !1,
                commentList: t.list,
                commentPage: t.page,
                commentObjTab: o,
                commentEmpty: !0
            });
        });
    },
    getDetail: function(t) {
        var o = this, i = parseInt(Date.now() / 1e3);
        o.setData({
            loading: !0
        }), e.get("goods/get_detail", {
            id: t.id
        }, function(t) {
            t.error > 0 && (o.setData({
                show: !0,
                showgoods: !1
            }), a.toast(o, t.message), setTimeout(function() {
                wx.navigateBack();
            }, 800));
            var d = t.goods.coupons;
            if (o.setData({
                coupon: d,
                coupon_l: d.length,
                packagegoods: t.goods.packagegoods,
                packagegoodsid: t.goods.packagegoods.goodsid,
                credittext: t.goods.credittext,
                activity: t.goods.activity,
                phonenumber: t.goods.phonenumber
            }), t.goods.packagegoods && o.package(), n.wxParse("wxParseData", "html", t.goods.content, o, "0"), 
            n.wxParse("wxParseData_buycontent", "html", t.goods.buycontent, o, "0"), o.setData({
                show: !0,
                goods: t.goods,
                minprice: t.goods.minprice,
                maxprice: t.goods.maxprice,
                preselltimeend: t.goods.preselltimeend,
                style: t.goods.labelstyle.style,
                navbar: t.goods.navbar,
                labels: t.goods.labels
            }), console.log(t.goods), wx.setNavigationBarTitle({
                title: t.goods.title || "商品详情"
            }), c = t.goods.hasoption, s.isEmptyObject(t.goods.dispatchprice) || "string" == typeof t.goods.dispatchprice ? o.setData({
                dispatchpriceObj: 0
            }) : o.setData({
                dispatchpriceObj: 1
            }), t.goods.isdiscount > 0 && t.goods.isdiscount_time >= i ? (clearInterval(o.data.timer), 
            r = setInterval(function() {
                o.countDown(0, t.goods.isdiscount_time);
            }, 1e3), o.setData({
                timer: r
            })) : o.setData({
                discountTitle: "活动已结束"
            }), t.goods.istime > 0) {
                clearInterval(o.data.timer);
                var r = setInterval(function() {
                    o.countDown(t.goods.timestart, t.goods.timeend, "istime");
                }, 1e3);
                o.setData({
                    timer: r
                });
            }
            t.goods.ispresell > 0 && o.setData({
                preselltimeend: t.goods.preselltimeend || t.goods.preselltimeend.getMonth() + "月" + t.goods.preselltimeend || t.goods.preselltimeend.getDate() + "日 " + t.goods.preselltimeend || t.goods.preselltimeend.getHours() + ":" + t.goods.preselltimeend || t.goods.preselltimeend.getMinutes() + ":" + t.goods.preselltimeend || t.goods.preselltimeend.getSeconds(),
                presellsendstatrttime: t.goods.presellsendstatrttime || t.goods.presellsendstatrttime.getMonth() + "月" + t.goods.presellsendstatrttime || t.goods.presellsendstatrttime.getDate() + "日"
            }), t.goods.getComments > 0 && e.get("goods/get_comments", {
                id: o.data.options.id
            }, function(t) {
                o.setData({
                    commentObj: t
                });
            }), t.goods.fullbackgoods && o.setData({
                fullbackgoods: t.goods.fullbackgoods
            });
            var l = o.data.fullbackgoods;
            if (void 0 != l) {
                console.log(l);
                var g = l.maxfullbackratio, m = l.maxallfullbackallratio, g = Math.round(g), m = Math.round(m);
                o.setData({
                    maxfullbackratio: g,
                    maxallfullbackallratio: m
                });
            }
        });
    },
    countDown: function(t, e, a) {
        var o = parseInt(Date.now() / 1e3), i = (t > o ? t : e) - o, s = parseInt(i), n = Math.floor(s / 86400), c = Math.floor((s - 24 * n * 60 * 60) / 3600), d = Math.floor((s - 24 * n * 60 * 60 - 3600 * c) / 60), r = [ n, c, d, Math.floor(s - 24 * n * 60 * 60 - 3600 * c - 60 * d) ];
        if (this.setData({
            time: r
        }), "istime") {
            var l = "";
            t > o ? l = "距离限时购开始" : t <= o && e > o ? l = "距离限时购结束" : (l = "活动已经结束，下次早点来~", 
            this.setData({
                istime: 0
            })), this.setData({
                istimeTitle: l
            });
        }
    },
    cityPicker: function(t) {
        var e = this;
        t.currentTarget.dataset.tap, wx.navigateTo({
            url: "/pages/goods/region/index?id=" + e.data.goods.id + "&region=" + e.data.goods.citys
        });
    },
    giftPicker: function() {
        this.setData({
            active: "active",
            gift: !0
        });
    },
    couponPicker: function() {
        this.setData({
            active: "active",
            showcoupon: !0
        });
    },
    couponrecived: function(t) {
        var o = t.currentTarget.dataset.id, i = this;
        e.post("goods.pay_coupon", {
            id: o
        }, function(t) {
            console.log(t), 0 == t.error ? (i.setData({
                showcoupon: !1,
                active: ""
            }), a.toast(i, "已领取")) : a.toast(i, t.message);
        });
    },
    selectPicker: function(t) {
        var e = this;
        e.data.limits ? i.selectpicker(t, e, "goodsdetail") : e.setData({
            modelShow: !0
        });
    },
    specsTap: function(t) {
        var e = this;
        i.specsTap(t, e);
    },
    emptyActive: function() {
        this.setData({
            active: "",
            slider: "out",
            tempname: "",
            showcoupon: !1,
            gift: !1
        });
    },
    buyNow: function(t) {
        var e = this;
        i.buyNow(t, e, "goods_detail");
    },
    getCart: function(t) {
        var e = this;
        i.getCart(t, e);
    },
    select: function() {
        var t = this, e = t.data.optionid;
        t.data.diyform, c > 0 && 0 == e ? a.toast(t, "请选择规格") : this.setData({
            active: "",
            slider: "out",
            isSelected: !0,
            tempname: ""
        });
    },
    inputNumber: function(t) {
        var e = this;
        i.inputNumber(t, e);
    },
    number: function(t) {
        var e = this;
        i.number(t, e);
    },
    onLoad: function(a) {
        s = this, a = a || {};
        var o = decodeURIComponent(a.scene);
        if (!a.id && o) {
            var i = e.str2Obj(o);
            a.id = i.id, i.mid && (a.mid = i.mid);
        }
        this.setData({
            id: a.id
        }), t.url(a), wx.getSystemInfo({
            success: function(t) {
                s.setData({
                    windowWidth: t.windowWidth,
                    windowHeight: t.windowHeight
                });
            }
        }), s.setData({
            uid: a.id,
            now: parseInt(Date.now() / 1e3)
        }), t.getUserInfo(function() {
            s.setData({
                options: a
            }), wx.getSystemInfo({
                success: function(t) {
                    s.setData({
                        advWidth: t.windowWidth
                    }), console.log(t.windowHeight);
                }
            }), s.setData({
                success: !0,
                cover: !0,
                showvideo: !0
            }), s.getDetail(a), setTimeout(function() {
                s.setData({
                    areas: t.getCache("cacheset").areas
                });
            }, 3e3);
        }, function() {
            wx.redirectTo({
                url: "/pages/message/auth/index"
            });
        }), this.data.id;
        var s = this;
    },
    package: function() {
        var t = this;
        e.get("package.get_list", {
            goodsid: this.data.packagegoodsid
        }, function(e) {
            console.log(e.list[0]), t.setData({
                packageList: e.list[0]
            });
        });
    },
    onShow: function() {
        var e = this;
        t.getCache("isIpx") ? e.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : e.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), wx.getStorage({
            key: "mydata",
            success: function(t) {
                wx.removeStorage({
                    key: "mydata",
                    success: function(t) {}
                }), e.getDetail(t.data), wx.pageScrollTo({
                    scrollTop: 0
                });
            }
        }), wx.getSetting({
            success: function(t) {
                var a = t.authSetting["scope.userInfo"];
                e.setData({
                    limits: a
                });
            }
        });
    },
    onChange: function(t) {
        return o.onChange(this, t);
    },
    DiyFormHandler: function(t) {
        return o.DiyFormHandler(this, t);
    },
    selectArea: function(t) {
        return o.selectArea(this, t);
    },
    bindChange: function(t) {
        return o.bindChange(this, t);
    },
    onCancel: function(t) {
        return o.onCancel(this, t);
    },
    onConfirm: function(t) {
        return o.onConfirm(this, t);
    },
    getIndex: function(t, e) {
        return o.getIndex(t, e);
    },
    onShareAppMessage: function() {
        return e.onShareAppMessage("/pages/goods/detail/index?id=" + this.data.options.id, this.data.goods.title);
    },
    showpic: function() {
        this.setData({
            showpic: !0,
            cover: !1,
            showvideo: !1
        }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.pause();
    },
    showvideo: function() {
        this.setData({
            showpic: !1,
            showvideo: !0
        }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.play();
    },
    startplay: function() {
        this.setData({
            cover: !1
        }), this.videoContext = wx.createVideoContext("myVideo"), this.videoContext.play();
    },
    bindfullscreenchange: function(t) {
        1 == t.detail.fullScreen ? this.setData({
            success: !1
        }) : this.setData({
            success: !0
        });
    },
    phone: function() {
        var t = this.data.phonenumber + "";
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    sharePoster: function() {
        wx.navigateTo({
            url: "/pages/goods/poster/poster?id=" + this.data.uid
        });
    },
    closeBtn: function() {
        this.setData({
            closeBtn: !1
        });
    },
    onHide: function() {
        this.setData({
            closeBtn: !1
        });
    },
    showshade: function() {
        this.setData({
            closeBtn: !0
        });
    },
    nav: function() {
        this.setData({
            nav_mask: !this.data.nav_mask
        });
    },
    nav2: function() {
        this.setData({
            nav_mask2: !this.data.nav_mask2
        });
    },
    changevoice: function() {
        this.data.sound ? this.setData({
            sound: !1,
            soundpic: !0
        }) : this.setData({
            sound: !0,
            soundpic: !1
        });
    },
    radioChange: function(t) {
        this.setData({
            giftid: t.currentTarget.dataset.giftgoodsid,
            gift_title: t.currentTarget.dataset.title
        });
    },
    activityPicker: function() {
        this.setData({
            fadein: "in"
        });
    },
    actOutPicker: function() {
        this.setData({
            fadein: ""
        });
    },
    hintclick: function() {
        wx.openSetting({
            success: function(t) {}
        });
    },
    cancelclick: function() {
        this.setData({
            modelShow: !1
        });
    },
    confirmclick: function() {
        this.setData({
            modelShow: !1
        }), wx.openSetting({
            success: function(t) {}
        });
    },
    sendclick: function() {
        wx.navigateTo({
            url: "/pages/map/index"
        });
    }
});