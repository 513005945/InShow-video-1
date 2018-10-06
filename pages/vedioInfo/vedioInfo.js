var videoUtil = require('../../utils/vedioUtil.js')
var serverUrl = getApp().serverUrl;

Page({
  data: {
    cover: "cover",
    videoId: "",
    src: "",
    videoInfo: {},
    sercerUrl: serverUrl,
  },
  videoCtx: {},

  onLoad: function(params) {

    // 点击视频列表进入视频详情
    var that = this;
    that.videoCtx = wx.createVideoContext("myVideo", that)
    //获取上一个页面传入的参数
    var videoInfo = JSON.parse(params.videoInfo);
    //debugger;

    var Height = videoInfo.videoHeight;
    var Width = videoInfo.videoWidth;
    var cover = "cover"; //默认的cover
    //如果宽度大于等于高度，就不让他拉伸
    if (Width >= Height) {
      cover = "";
    }

    that.setData({
      videoId: videoInfo.id,
      src: serverUrl + videoInfo.videoPath,
      videoInfo: videoInfo,
      cover: cover
    });


  },

  showSearch: function() {
    wx.navigateTo({
      url: '../vedioSearch/vedioSearch',
    })
  },
  upload: function() {
    var user = getApp().getGlobalUserInfo();

//如果用户不是登陆状态的，就跳转到登陆页面
    if(user== null || user == undefined || user == ''){
      wx.navigateTo({
        url: '../login/login',
      })
    }else{
      videoUtil.uploadVideo();
    }
    
  },

  //主页按钮
  showIndex: function() {
    console.log("我真的进来了的"),
      wx.switchTab({
        url: '../index/index',
      })
  }



})