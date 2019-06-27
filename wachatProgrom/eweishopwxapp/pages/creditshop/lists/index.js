var t = getApp(), a = t.requirejs("core");

t.requirejs("jquery"), Page({
    data: {
        page: 1,
        datas: {},
        more: !0,
        load: !0,
        notgoods: !0,
        keywords: ""
    },
    onLoad: function(t) {
        var a = this;
        t.keywords && a.setData({
            keywords: t.keywords
        }), a.get_list();
    },
    onPullDownRefresh: function(t) {
        wx.showNavigationBarLoading(), this.get_list(), wx.stopPullDownRefresh(), wx.hideNavigationBarLoading();
    },
    onReachBottom: function(t) {
        this.setData({
            page: this.data.page + 1,
            load: !1
        }), this.get_list("", !0), this.setData({
            load: !0
        });
    },
    focus: function() {
        this.setData({
            showbtn: "in"
        });
    },
    get_list: function(t, s) {
        var e = this;
        a.post("creditshop/lists/getlist", {
            page: e.data.page,
            keywords: e.data.keywords
        }, function(t) {
            0 == t.error && (0 == t.list.length ? 1 == e.data.page && e.setData({
                notgoods: !1
            }) : (e.setData({
                notgoods: !0
            }), t.next_page <= e.data.page && 1 != e.data.page && e.setData({
                more: !1
            })), s ? (t.list = e.data.datas.concat(t.list), e.setData({
                datas: t.list
            })) : e.setData({
                datas: t.list
            }));
        });
    },
    search: function() {
        this.setData({
            page: 1
        }), this.get_list();
    },
    doinput: function(t) {
        this.setData({
            keywords: t.detail.value
        });
    }
});