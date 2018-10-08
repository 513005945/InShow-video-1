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
    //userLikeVideo: false,//收藏事件
    // userClickvideo:false //点赞事件
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

    var loginUserId = "";
    loginUserId = userId;
    //退出到视频展示页，依旧能显示点赞的信息
    wx.request({
      url: serverUrl + '/user/qureyPublisher?loginuserId=' + loginUserId + '&videoId=' + videoInfo.id + '&publisherId=' + videoInfo.userId,
      method: 'POST',
      success: function(res) {
        var publisher = res.data.data.publisher;
        var userClickvideo = res.data.data.userClickvideo;
        console.log("-1-1-1-1-1-" + JSON.stringify(res));
        console.log("-------publisher打印----" + JSON.stringify(publisher));
        console.log("-------userClickvideo打印------" + userClickvideo)

        that.setData({
          serverUrl: serverUrl,
          publisher: publisher,
          userClickvideo: userClickvideo
        });

      }
    })



  },

  showSearch: function() {
    wx.navigateTo({
      url: '../vedioSearch/vedioSearch',
    })
  },
  upload: function() {
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
    var userClickvideo = that.data.userClickvideo
    console.log("我这里进来就已经是" + userClickvideo)
    var url = '/video/userClickvideo?userId=' + userId + '&videoId=' + videoInfo.id;
    //如果userClickvideo已经是点了赞的状态了，就取消赞
    if (userClickvideo) {
      var url = '/video/userUnclickVideo?userId=' + userId + '&videoId=' + videoInfo.id + '&publisherId=' + videoInfo.userId;
    }
    wx.showLoading({
      title: '...',
    })
    wx.request({
      //url: serverUrl + '/video/userClickvideo',
      url: serverUrl + url,
      method: 'POST',
      // data: {
      //   userId: userId,
      //   videoId: videoInfo.id
      // },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function(res) {
        wx.hideLoading();

        that.setData({
          userClickvideo: !userClickvideo
        });

      }

    })
  },

  //用户详情页的
  showPublisher: function() {
    var that = this;
    var videoInfo = that.data.videoInfo;
    console.log("*-*-*-*-videoInfo*--*-*--" + JSON.stringify(videoInfo));
    wx.switchTab({
      url: '../mine/mine?publisherId='+videoInfo.userId,
    })
  }


})