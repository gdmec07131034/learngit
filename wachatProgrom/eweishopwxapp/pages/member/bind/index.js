var t = getApp(), e = t.requirejs("core"), i = t.requirejs("foxui"), a = t.requirejs("jquery");

Page({
    data: {
        member: {},
        binded: !1,
        endtime: 0,
        postData: {},
        submit: !1,
        subtext: "立即绑定"
    },
    onLoad: function(i) {
        t.url(i), e.loading(), this.getInfo();
    },
    getInfo: function() {
        var t, i = this;
        e.get("member/bind", {}, function(e) {
            if (e.error) wx.redirectTo({
                url: "/pages/member/index/index"
            }); else {
                var a = {
                    member: e.member,
                    binded: e.binded,
                    endtime: e.endtime,
                    show: !0
                };
                a.postData = {
                    mobile: e.member.mobile,
                    code: "",
                    password: "",
                    password1: ""
                }, i.setData(a), e.endtime > 0 && i.endTime(), t = e.binded ? "更换绑定手机号" : "绑定手机号", 
                wx.setNavigationBarTitle({
                    title: t
                });
            }
        }, !0, !0, !0);
    },
    endTime: function() {
        var t = this, e = t.data.endtime;
        e > 0 && (t.setData({
            endtime: e - 1
        }), setTimeout(function() {
            t.endTime();
        }, 1e3));
    },
    inputChange: function(t) {
        var i = this.data.postData, s = e.pdata(t).type, o = t.detail.value;
        i[s] = a.trim(o), this.setData({
            postData: i
        });
    },
    getCode: function(t) {
        var s = this;
        if (!(s.data.endtime > 0)) {
            var o = s.data.postData.mobile;
            a.isMobile(o) ? e.get("sms/changemobile", {
                mobile: o
            }, function(t) {
                0 == t.error ? (i.toast(s, "短信发送成功"), s.setData({
                    endtime: 60
                }), s.endTime()) : i.toast(s, t.message);
            }, !0, !0, !0) : i.toast(s, "请填写正确的手机号");
        }
    },
    submit: function(t) {
        if (!this.data.submit) {
            var s = this, o = this.data.postData;
            a.isMobile(o.mobile) ? 5 == o.code.length ? o.password && "" != o.password ? o.password1 && "" != o.password1 ? o.password == o.password1 ? (this.setData({
                submit: !0,
                subtext: "正在绑定..."
            }), e.post("member/bind/submit", o, function(t) {
                if (92001 != t.error && 92002 != t.error) return 0 != t.error ? (i.toast(s, t.message), 
                void s.setData({
                    submit: !1,
                    subtext: "立即绑定"
                })) : void wx.navigateBack();
                e.confirm(t.message, function() {
                    o.confirm = 1, e.post("member/bind/submit", o, function(t) {
                        t.error > 0 ? i.toast(s, t.message) : wx.navigateBack(), s.setData({
                            submit: !1,
                            subtext: "立即绑定",
                            "postData.confirm": 0
                        });
                    }, !0, !0, !0);
                });
            }, !0, !0, !0)) : i.toast(this, "两次输入的密码不一致") : i.toast(this, "请确认登录密码") : i.toast(this, "请填写登录密码") : i.toast(this, "请填写5位短信验证码") : i.toast(this, "请填写正确的手机号");
        }
    }
});