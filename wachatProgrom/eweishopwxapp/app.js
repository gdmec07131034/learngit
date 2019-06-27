var e = require("utils/core.js");

App({
	onLaunch: function () {
		var e = this;
		wx.getSystemInfo({
			success: function (t) {
				"0" == t.model.indexOf("iPhone X") ? e.setCache("isIpx", t.model) : e.setCache("isIpx", "");
			}
		}), this.getConfig();
		var t = this.getCache("userinfo");
		("" == t || t.needauth) && this.getUserInfo(function (e) { }, function (e, t) {
			var t = t ? 1 : 0, e = e || "";
			t && wx.redirectTo({
				url: "/pages/message/auth/index?close=" + t + "&text=" + e
			});
		});
	},
	requirejs: function (e) {
		return require("utils/" + e + ".js");
	},
	getConfig: function () {
		if (null !== this.globalData.api) return {
			api: this.globalData.api,
			approot: this.globalData.approot,
			appid: this.globalData.appid
		};
		var e = wx.getExtConfigSync();
		return console.log(e), this.globalData.api = e.config.api, this.globalData.approot = e.config.approot,
			this.globalData.appid = e.config.appid, e.config;
	},
	getCache: function (e, t) {
		var i = +new Date() / 1e3, a = "";
		i = parseInt(i);
		try {
			(a = wx.getStorageSync(e + this.globalData.appid)).expire > i || 0 == a.expire ? a = a.value : (a = "",
				this.removeCache(e));
		} catch (e) {
			a = void 0 === t ? "" : t;
		}
		return a = a || "";
	},
	setCache: function (e, t, i) {
		var a = +new Date() / 1e3, n = !0, o = {
			expire: i ? a + parseInt(i) : 0,
			value: t
		};
		try {
			wx.setStorageSync(e + this.globalData.appid, o);
		} catch (e) {
			n = !1;
		}
		return n;
	},
	removeCache: function (e) {
		var t = !0;
		try {
			wx.removeStorageSync(e + this.globalData.appid);
		} catch (e) {
			t = !1;
		}
		return t;
	},
	getUserInfo: function (t, i) {
		var a = this, n = a.getCache("userinfo");
		!n || n.needauth ? wx.login({
			success: function (o) {
				o.code ? e.post("wxapp/login", {
					code: o.code
				}, function (o) {
					console.log(o)
					o.error ? e.alert("获取用户登录态失败:" + o.message) : o.isclose && i && "function" == typeof i ? i(o.closetext, !0) : wx.getUserInfo({
						success: function (i) {
							n = i.userInfo, e.get("wxapp/auth", {
								data: i.encryptedData,
								iv: i.iv,
								sessionKey: o.session_key
							}, function (e) {
								i.userInfo.openid = e.openId, i.userInfo.id = e.id, i.userInfo.uniacid = e.uniacid,
									i.needauth = 0, a.setCache("userinfo", i.userInfo, 7200), t && "function" == typeof t && t(n);
							});
						},
						fail: function () {
							e.get("wxapp/check", {
								openid: o.openid
							}, function (e) {
								e.needauth = 1, a.setCache("userinfo", e, 7200), t && "function" == typeof t && t(n);
							});
						}
					});
				}) : e.alert("获取用户登录态失败:" + o.errMsg);
			},
			fail: function () {
				e.alert("获取用户信息失败!");
			}
		}) : t && "function" == typeof t && t(n);
	},
	getSet: function () {
		var t = this;
		"" == t.getCache("sysset") && setTimeout(function () {
			var i = t.getCache("cacheset");
			e.get("cacheset", {
				version: i.version
			}, function (e) {
				e.update && t.setCache("cacheset", e.data), t.setCache("sysset", e.sysset, 7200);
			});
		}, 10);
	},
	url: function (e) {
		e = e || {};
		var t = {}, i = "", a = "", n = this.getCache("usermid");
		i = e.mid || "", a = e.merchid || "", "" != n ? ("" != n.mid && void 0 !== n.mid || (t.mid = i),
			"" != n.merchid && void 0 !== n.merchid || (t.merchid = a)) : (t.mid = i, t.merchid = a),
			this.setCache("usermid", t, 7200);
	},
	impower: function (e, t, i) {
		wx.getSetting({
			success: function (a) {
				console.log(a), a.authSetting["scope." + e] || wx.showModal({
					title: "用户未授权",
					content: "您点击了拒绝授权，暂时无法" + t + "，点击去设置可重新获取授权喔~",
					confirmText: "去设置",
					success: function (e) {
						e.confirm ? wx.openSetting({
							success: function (e) { }
						}) : "route" == i ? wx.switchTab({
							url: "/pages/index/index"
						}) : "details" == i || wx.navigateTo({
							url: "/pages/index/index"
						});
					}
				});
			}
		});
	},
	globalData: {
		appid: "wxdc40a7e978e24465",
		api: "http://renren.net/app/ewei_shopv2_api.php?i=2",
		approot: "http://renren.net/addons/ewei_shopv2/",
		userInfo: null
	}
});