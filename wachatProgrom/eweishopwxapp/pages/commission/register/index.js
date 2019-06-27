var e = getApp().requirejs("core");

Page({
    data: {},
    onLoad: function(e) {},
    onShow: function() {
        this.getData();
    },
    getData: function() {
        var t = this;
        e.get("commission/register", {}, function(e) {
            70003 != e.error ? (e.show = !0, wx.setNavigationBarTitle({
                title: "申请成为" + e.set.texts.agent || "申请"
            }), t.setData(e)) : wx.redirectTo({
                url: "/pages/commission/index"
            });
        });
    },
    inputChange: function(e) {
        "realname" == e.target.id ? this.setData({
            "member.realname": e.detail.value
        }) : "mobile" == e.target.id ? this.setData({
            "member.mobile": e.detail.value
        }) : "weixin" == e.target.id && this.setData({
            "member.weixin": e.detail.value
        });
    },
    submit: function(t) {
        if (this.data.member.realname) if (this.data.member.mobile) {
            var i = {
                agentid: this.data.mid,
                realname: this.data.member.realname,
                mobile: this.data.member.mobile,
                weixin: this.data.member.weixin
            };
            e.post("commission/register", i, function(t) {
                0 != t.error ? e.alert(t.message) : wx.redirectTo({
                    url: 1 == t.check ? "/pages/commission/index" : "/pages/commission/register/index"
                });
            });
        } else e.alert("请填写,手机号!"); else e.alert("请填写,真实姓名!");
    }
});