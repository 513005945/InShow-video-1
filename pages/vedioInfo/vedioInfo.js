var videoUtil = require('../../utils/vedioUtil.js')
var serverUrl = getApp().serverUrl;
var userId = getApp().globalData.userId;



Page({
  data: {
    cover: "cover",
    videoId: "",
    src: "",
    videoInfo: {},
    sercerUrl: serverUrl,
    userLikeVideo: false
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
    // if(user== null || user == undefined || user == ''){
    //   wx.navigateTo({
    //     url: '../login/login',
    //   })
    // }else{
    //   videoUtil.uploadVideo();
    // }
    videoUtil.uploadVideo();

  },

  //主页按钮
  showIndex: function() {
    console.log("我真的进来了的"),
      wx.switchTab({
        url: '../index/index',
      })
  },

  onShow: function() {
    var that = this;
    that.videoCtx.play();
  },
  onHide: function() {
    var that = this;
    that.videoCtx.pause();
  },

  //点赞按钮
  likeVideoOrNot: function() {
    var that = this;
    var videoInfo = that.data.videoInfo;

    // var user = getApp().getGlobalUserInfo();
    // console.log("这个userId打印出来啥子玩意儿" + user.id)

    var userLikeVideo = that.data.userLikeVideo
    var url = '/video/userClickvideo?userId=' + userId + '&videoId=' + videoInfo.id;
    if (userLikeVideo) {
      var url = '/video/userUnClickvideo?userId=' + userId + '&videoId=' + videoInfo.id ;
      //+ '&publisherId' + videoInfo.userId
    }
    console.log(url);
    wx.showLoading({
      title: '...',
    })
    wx.request({
      url: serverUrl + '/video/userClickvideo',
      method: 'POST',
      data: {
        userId: userId,
        videoId: videoInfo.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        //'content-type': 'application/json',
      },
      success: function(res) {
        wx.hideLoading();
        that.setData({
          userLikeVideo: !userLikeVideo
        });
      }
    })
  }


})