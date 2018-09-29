App({
  serverUrl: "http://192.168.1.7:8081",


  setGlobalUserInfo: function (user) {
    wx.setStorageSync("userInfo", user);
  },

  getGlobalUserInfo: function () {
    return wx.getStorageSync("userInfo");
  },



  globalData: {
    test: "test",
  }


})