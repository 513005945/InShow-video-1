var test = getApp().globalData.test;
var serverUrl = getApp().serverUrl;
var app = getApp();

Page({
  data: {
    appSecret: "76d8c34dde69c14683bfc7519636900a",
    appID: "wxa35bbd6556297ebd",
    userInfo: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // serverUrl: serverUrl
  },


  //在这里设置重定向的拦截
  onLoad: function(params) {
    var that = this;
    // app.setGlobalUserInfo(function(userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: app.globalData.userInfo
    //   })
    //   console.log(that.data.userInfo, '---------userinfo')
    // })

    that.setData({
      userInfo: app.globalData.userInfo
    })
  },


  bindGetUserInfo: function() {
    var me = this;
    wx.login({
      success: function(res) {
        var js_code = res.code;
        console.log("111打印打印打印res  " + res.data);
        // console.log("222打印打印打印res  " + res.userInfo)
        // console.log("333打印打印打印res  " + JSON.parse(res.data))
        // console.log("444打印打印打印res  " + getApp().setGlobalUserInfo(res.data))

        wx.getUserInfo({
          success: function(res) {
            //me.globalData.userInfo = res.userInfo,
            console.log("------------------" + res.rawData);
            console.log("222打印打印打印res  " + res.userInfo.nickName);
            app.globalData.userInfo = res.userInfo;
            var rawd = res.rawData;
            wx.request({
              url: serverUrl + '/login/login',
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
                console.log(res.data.data);
                app.setGlobalUserInfo(res.data.data);
                console.log("------------" + js_code);
                console.log("------------" + rawd);
                console.log("--------------登陆成功o(*￣▽￣*)o");
                app.globalData.userId = res.userId;
                // console.log("-------------" + app.setGlobalUserInfo(res.data.data));
                // app.getGlobalUserInfo(function(userInfo) {
                //   //更新数据
                //   that.setData({
                //     userInfo: app.globalData.userInfo
                //   })
                //   console.log(that.data.userInfo, '---------userinfo')
                // })

                wx.switchTab({
                  url: '../index/index'
                })


              }


            })
            //do anything

          },
          fail: me.showPrePage
        });

        //授权成功后就跳转
        // wx.navigateTo({

      }
    })
  },


})