var t = getApp(), e = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("jquery"));

Page({
    data: {
        route: "category",
        category: {},
        icons: t.requirejs("icons"),
        selector: 0,
        advimg: "",
        recommands: {},
        level: 0,
        back: 0,
        child: {},
        parent: {}
    },
    tabCategory: function(t) {
        this.setData({
            selector: t.target.dataset.id,
            advimg: t.target.dataset.src,
            child: t.target.dataset.child,
            back: 0
        }), a.isEmptyObject(t.target.dataset.child) ? this.setData({
            level: 0
        }) : this.setData({
            level: 1
        }), console.log(this.data);
    },
    cateChild: function(t) {
        this.setData({
            parent: t.currentTarget.dataset.parent,
            child: t.currentTarget.dataset.child,
            back: 1
        }), console.log(this.data);
    },
    backParent: function(t) {
        this.setData({
            child: t.currentTarget.dataset.parent,
            back: 0
        });
    },
    getCategory: function() {
        var t = this;
        e.get("shop/get_category", {}, function(e) {
            t.setData({
                category: e.category,
                show: !0,
                set: e.set,
                advimg: e.set.advimg,
                recommands: e.recommands,
                child: e.recommands
            }), console.log(e);
        });
    },
    onShow: function() {},
    onLoad: function(e) {
        t.url(e), this.getCategory();
    },
    onShareAppMessage: function() {
        return e.onShareAppMessage();
    }
});