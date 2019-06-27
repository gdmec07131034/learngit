var e = getApp(), t = (e.requirejs("jquery"), e.requirejs("core"));

e.requirejs("foxui"), module.exports = {
    get: function(e, a, o) {
        console.log(a), t.get("diypage", {
            type: a
        }, function(t) {
            t.diypage = t.diypage || {}, e.setData({
                customer: t.customer,
                phone: t.phone,
                phonecolor: t.phonecolor,
                phonenumber: t.phonenumber,
                customercolor: t.customercolor
            });
            var a = {
                loading: !1,
                diypages: t.diypage,
                pages: t.diypage.page,
                usediypage: !0,
                startadv: t.startadv
            };
            t.diypage.page && e.setData({
                diytitle: t.diypage.page.title
            }), 0 == t.error ? (wx.setNavigationBarTitle({
                title: a.pages.title
            }), wx.setNavigationBarColor({
                frontColor: a.pages.titlebarcolor,
                backgroundColor: a.pages.titlebarbg
            }), e.setData(a), o && o(t)) : e.setData({
                diypages: !1,
                loading: !1
            });
        });
    }
};