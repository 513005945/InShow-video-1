App({
  serverUrl: "http://192.168.1.7:8081",
  userInfo: null,
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {
    var that = this;
    wx.login({
      success: res => {
        if (res.code) {
          //发起网络请求
          console.log("啊可是大家啊可是大家干干净净" + res.code);
          wx.request({
            // url: 'http://192.168.1.7:8081' + "/login",
            // url: 'http://192.168.1.7:8081'+"/login2?js_code="+res.code,
            //data: {js_code:res.code,},
            url: 'http://192.168.1.7:8081' + "/bgm/getAll?page=0",
            header: {
              'content-type': 'application/x-www-form-urlencodeed'
            },
            method: "POST",
            // url: that.globalData.wx_url_1 + res.code + that.globalData.wx_url_2,
            success: res => {
              that.globalData.openid = res.data.openid;
              console.log(res)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });



   
  },

 


  /**
   * 设置全局变量
   */
  //微信提供了一个https接口用于code换取openId以及session_key
  //js_code是我们在小程序客户端调用wx.login时返回的code；
  //grant_type固定为authorization_code即可。
  globalData: {
    openid: 0,
    wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxa35bbd6556297ebd&secret=76d8c34dde69c14683bfc7519636900a&js_code=',
    wx_url_2: '&grant_type=authorization_code',
    urlPath: 'http://192.168.1.7:8081'
  }



























  /**
   onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
   */
})