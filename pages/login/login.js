var test = getApp().globalData.test;
var serverUrl = getApp().serverUrl;


Page({
  data: {
    //这里填写自己测试账号的appid跟appsecret即可
    appSecret: "76d8c34dde69c14683bfc7519636900a",
    appID: "wxa35bbd6556297ebd",
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
   // serverUrl: serverUrl
  },
  //在这里设置重定向的拦截
  onLoad:function(params){
      
  },
  bindGetUserInfo: function() {
    var me = this;
    wx.login({
      success: function(res) {
        var js_code = res.code;
        wx.getUserInfo({
          success: function(res) {
            console.log(res)
            console.log(res.rawData)
            var rawd = res.rawData;

            wx.request({
              url: serverUrl+'/login/login',
              data: {
                js_code: js_code,
                rawsData: rawd,
                appID: me.data.appID,
                appSecret: me.data.appSecret
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              method: 'POST',
              success: function(res) {
                console.log("------------" + js_code);
                console.log("------------" + rawd);
                console.log("--------------登陆成功o(*￣▽￣*)o");
              }
            })
            //do anything
          },
          fail: me.showPrePage
        });
        //授权成功后就跳转
       // wx.navigateTo({
        wx.switchTab({
          url: '../index/index'
        })
      }
    })
  },

})