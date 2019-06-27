var e = getApp(), o = e.requirejs("core"), t = e.requirejs("wxParse/wxParse");

Page({
    data: {
        route: "member",
        icons: e.requirejs("icons"),
        member: {},
        modelShow: !1
    },
    onLoad: function(o) {
        var t = this;
        e.url(o), wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    windowWidth: e.windowWidth,
                    windowHeight: e.windowHeight
                });
            }
        }), "" == e.getCache("userinfo") && wx.redirectTo({
            url: "/pages/message/auth/index"
        });
    },
    getInfo: function() {
        var e = this;
        o.get("member", {}, function(o) {
            console.log(o), 0 != o.error ? wx.redirectTo({
                url: "/pages/message/auth/index"
            }) : e.setData({
                member: o,
                show: !0,
                customer: o.customer,
                customercolor: o.customercolor,
                phone: o.phone,
                phonecolor: o.phonecolor,
                phonenumber: o.phonenumber
            }), t.wxParse("wxParseData", "html", o.copyright, e, "5");
        });
    },
    onShow: function() {
        this.getInfo();
        var e = this;
        wx.getSetting({
            success: function(o) {
                var t = o.authSetting["scope.userInfo"];
                e.setData({
                    limits: t
                }), console.log(t), t || e.setData({
                    modelShow: !0
                });
            }
        });
    },
    onShareAppMessage: function() {
        return o.onShareAppMessage();
    },
    cancelclick: function() {
        this.setData({
            modelShow: !1
        }), wx.switchTab({
            url: "/pages/index/index"
        });
    },
    confirmclick: function() {
        this.setData({
            modelShow: !1
        }), wx.openSetting({
            success: function(e) {}
        });
    },
    phone: function() {
        var e = this.data.phonenumber + "";
        wx.makePhoneCall({
            phoneNumber: e
        });
    }
});