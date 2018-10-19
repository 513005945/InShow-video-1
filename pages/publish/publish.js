var serverUrl = getApp().serverUrl;
var userId = getApp().globalData.userId;

Page({

  data: {
    topicList: [],
    serverUrl: "",
    desc: "这个是描述", //视频描述
    allParams: {}, //视频和bgm所有的参数集合
    topicId: "", //这是单选框的可选话题

  },

  onShow() {
    console.log("关闭音乐");
    // wx.stopBackgroundAudio();
    // wx.pauseVoice();
    //  wx.pauseBackgroundAudio(); 
     wx.stopVoice();
  },

  onLoad: function(params) {
    var that = this;
    console.log("------------带进来的视频时长--------------" + params.duration)
    console.log("------------视频高度--------------" + params.tmpHeight)
    console.log("------------视频宽度--------------" + params.tmpWidth)
    console.log("------------视频路径--------------" + params.tmpVideoUrl)
    console.log("------------视频封面--------------" + params.tmpCoverUrl)
    console.log("------------视频bgmId--------------" + params.audioId)

    that.setData({
      allParams: params,
    })

    wx.showLoading({
      title: '请等待...',
    });

    //请求后端
    wx.request({
      url: serverUrl + '/topic/getAll?page=1',
      method: "GET",
      header: {
        'content-type': 'application/json', // 默认值
      },
      success: function(res) {
        // console.log("----打印具体的主题信息----" + JSON.stringify(res.data))
        wx.hideLoading();

        if (res.data.status == 200) {
          var topicList = res.data.data;
          that.setData({
            topicList: topicList,
            // itemId:topicList[0].id,
          });

        } else if (res.data.status == 502) {
          wx.showToast({
            title: res.data.msg,
            duration: 2000,
            icon: "none",
            success: function() {
              wx.redirectTo({
                url: '../index/index',
              })
            }
          });
        }
      }
    })

  },

  //单选按钮事件
  radioChange: function(e) {
    var me = this;
    var topicId = e.detail.value;
    me.setData({
      topicId: topicId,
    })
  },

  // 描述的详情
  bindinput: function(e) {
    var me = this;
    var desc = e.detail.value;
    me.setData({
      desc: desc,
    })
  },

  //确认发布-------
  confirm2publish: function() {
    var me = this;
    // 上传短视频
    wx.showLoading({
      title: '上传中...',
    });
    //console.log("--------******************---------" + me.data.allParams.tmpVideoUrl);
    // console.log("---------+++++++++-----------" + JSON.stringify(me.data))
    wx.uploadFile({
      url: serverUrl + '/video/uploadVideos',
      method: 'POST',
      formData: {
        userId: userId,
        audioId: me.data.allParams.audioId,
        desc: me.data.desc,
        topicId: me.data.topicId,
        videoSecond: me.data.allParams.duration,
        videoHeight: me.data.allParams.tmpHeight,
        videoWidth: me.data.allParams.tmpWidth,
        bgmPosition: 0
      },
      name: 'file',
      filePath: me.data.allParams.tmpVideoUrl,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },

      success: function(res) {
        var data = JSON.parse(res.data);
        wx.hideLoading();
        if (data.status == 200) {
          wx.showToast({
            title: '上传成功!~~',
            duration: 3000,
            icon: "success"
          });
          wx.switchTab({
            url: '../index/index',
          })
        } else if (res.data.status == 502) {
          wx.showToast({
            title: res.data.msg,
            duration: 2000,
            icon: "none"
          });
          wx.redirectTo({
            url: '../index/index',
          })
        } else {
          wx.showToast({
            title: '上传失败!!!',
            duration: 2000,
            icon: "loading"
          });
        }
      }
    })
  }
})