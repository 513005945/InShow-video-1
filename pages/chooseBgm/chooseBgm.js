var videoContextPrev, videoContext;
var serverUrl = getApp().serverUrl;

Page({
  data: {
    showView: true, //显示按钮开拍
    play: true, //控制单曲播放
    chooseCount: 0,
    bgmList: [],
    serverUrl: serverUrl,
    videoParams: {},
    audioCtx: {},
    poster: "http://p4.music.126.net/tUapZaR1iT5XTX2QcAc0DA==/96757023257715.jpg",
    /**轮播图 */
    imgUrls: [
      'http://p3.music.126.net/bKFfzVVNmdLTaRN5uHHPqA==/18786255672743757.jpg',
      'http://p4.music.126.net/n15ddawhY4cyIzFu23CSJA==/1401877341861315.jpg',
      'http://p3.music.126.net/zMwH3zh33TAacyh2_4RjXw==/1375489062675977.jpg'
    ],
  },

  /**搜索框跳转 */
  sousuo: function(e) {
    wx.navigateTo({
      url: '../bgmsearch/bgmsearch',
    })
  },
  /**音频进度 */
  audioPress: function(e) {
    var progress = parseInt((e.detail.currentTime / e.detail.duration) * 100)
    this.setData({
      audioPress: progress
    })
  },



  onLoad: function(params) {
    var that = this;
    console.log("假按揭发酒疯" + params);
    that.setData({
      videoParams: params
    });
    wx.showLoading({
      title: '请等待...',
    });

    that.audioCtx = wx.createAudioContext("id", that)
    var user = getApp().getGlobalUserInfo();

    // 调用后端
    wx.request({
      url: serverUrl + '/bgm/getAll',
      method: "POST",
      data: {
        page: that.data.chooseCount,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        //'headerUserId': user.id,
        //'headerUserToken': user.userToken
      },
      success: function(res) {
        wx.hideLoading();
        if (res.data.status == 200) {
          var bgmList = res.data.data;
          that.setData({
            //设置bgm列表信息
            itemId: bgmList[0].id,
            bgmList: bgmList
          });
          console.log("成功进来啦啦啦");
        } else if (res.data.status == 502) {
          wx.showToast({
            title: res.data.msg,
            duration: 2000,
            icon: "none",
            success: function() {
              // wx.redirectTo({
              //   url: '',
              // })
              console.log("嘿");
            }
          });
        }
      }

    })
  },

  toggleBtn: function(e) {
    var that = this;
    //获取bgmList的当前hide的按钮
    var toggleBtn = that.data.showView;
    console.log("是否显示红色按钮" + toggleBtn)
    var itemId = e.currentTarget.id;
    if (toggleBtn == itemId) {
      that.setData({
        //showView: (!that.data.showView)
        showView: false,
      })
    } else {
      that.setData({
        showView: itemId
      })
    }
    try {
      that.audioCtx = wx.createAudioContext(that.data.itemId)
      that.audioCtx.pause();
      that.setData({
        itemId: itemId
      })
      setTimeout(function() {
        that.n_audioCtx = wx.createAudioContext(itemId);
        that.n_audioCtx.play();
      }, 500)
    } catch (e) {}
  },

  uploadBtn: function(e) {
    var me = this;
    var bgmId = e.currentTarget.id;
    //var desc = e.detail.value.desc;
    console.log("bgmId:" + bgmId);
    // console.log("desc:" + desc);

    //TODO：点击上传按钮后得保证歌不是播放状态的————————bug暂存
    wx.getBackgroundAudioManager().stop();

    var duration = me.data.videoParams.duration;
    var tmpHeight = me.data.videoParams.tmpHeight;
    var tmpWidth = me.data.videoParams.tmpWidth;
    var tmpVideoUrl = me.data.videoParams.tmpVideoUrl;
    var tmpCoverUrl = me.data.videoParams.tmpCoverUrl;

    // 上传短视频
    wx.showLoading({
      title: '上传中...',
    })
    var serverUrl = getApp().serverUrl;
    // fixme 修改原有的全局对象为本地缓存
    var userInfo = getApp().getGlobalUserInfo();

    wx.uploadFile({
      url: serverUrl + '/video/uploadVideos',
      formData: {
        userId: userInfo.id, // fixme 原来的 getApp().userInfo.id
        audioId: bgmId,
        desc: "这个是描述",
        topicId: "",
        videoSecond: duration,
        videoHeight: tmpHeight,
        videoWidth: tmpWidth,
        status: 0,
        bgmPosition: 0
      },
      filePath: tmpVideoUrl,
      name: 'file',
      header: {
        'content-type': 'application/json', // 默认值
        // 'headerUserId': userInfo.id,
        // 'headerUserToken': userInfo.userToken
      },

      success: function(res) {
        var data = JSON.parse(res.data);
        wx.hideLoading();
        if (data.status == 200) {
          wx.showToast({
            title: '上传成功!~~',
            icon: "success"
          });
          // 上传成功后跳回之前的页面
          // wx.navigateBack({
          //   delta: 1
          // })


          //wx.navigateTo({
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
          console.log("氨基酸看见覅偶尔就看到了发")
        } else {
          wx.showToast({
            title: '上传失败!~~',
            icon: "success"
          });
        }

      }
    })
  },
  onHide: function() {
    that.audioCtx.pause();//跳转到新的页面后，歌曲就暂停
  }
})