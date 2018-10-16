var serverUrl = getApp().serverUrl;
var userId = getApp().globalData.userId;

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
    //tmpHeight: '',
    //tmpWidth: ''
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
    console.log("------------带进来的视频时长--------------" + params.duration)
    console.log("------------视频高度--------------" + params.tmpHeight)
    console.log("------------视频宽度--------------" + params.tmpWidth)
    console.log("------------视频路径--------------" + params.tmpVideoUrl)
    console.log("------------视频封面--------------" + params.tmpCoverUrl)

    that.setData({
      videoParams: params,
    });

    wx.showLoading({
      title: '请等待...',
    });

    that.audioCtx = wx.createAudioContext("id", that)


    // 调用后端
    wx.request({
      url: serverUrl + '/bgm/getAll',
      method: "POST",
      data: {
        page: that.data.chooseCount,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
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
    console.log("----me.data.videoParams----------" + JSON.stringify(me.data.videoParams))
    var duration = me.data.videoParams.duration;
    var tmpVideoUrl = me.data.videoParams.tmpVideoUrl;
    var tmpCoverUrl = me.data.videoParams.tmpCoverUrl;

    if (tmpWidth == undefined || tmpHeight == undefined) {
      //动态获取设备屏幕的高度
      wx.getSystemInfo({
        success: function(res) {
          console.log(res.brand) //手机品牌
          console.log(res.windowWidth) //手机屏幕可用宽度
          console.log(res.windowHeight) //手机屏幕可用高度
          tmpWidth = res.windowWidth;
          tmpHeight = res.windowHeight;
        }
      })
    } else { //如果是本地上传的话，高度和宽度就不会是undefined了，本来有值
      var tmpWidth = me.data.videoParams.tmpWidth;
      var tmpHeight = me.data.videoParams.tmpHeight;
    }

    console.log("---------tmpWidth上传----------" + tmpWidth)
    console.log("---------tmpHeight---------" + tmpHeight)
    console.log("---------duration---------" + duration)
    
    // 上传短视频
    wx.showLoading({
      title: '上传中...',
    })

    wx.uploadFile({
      url: serverUrl + '/video/uploadVideos',
      method: 'POST',
      formData: {
        userId: userId,
        audioId: bgmId,
        desc: "这个是描述",
        topicId: "",
        videoSecond: duration,
        videoHeight: tmpHeight,
        videoWidth: tmpWidth,
        bgmPosition: 0
      },
      filePath: tmpVideoUrl,
      name: 'file',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
        //'content-type': 'application/json', // 默认值
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
          // 上传成功后跳回之前的页面
          // wx.navigateBack({
          //   delta: 1
          // })
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
  },

  onHide: function() {
    that.audioCtx.pause(); //跳转到新的页面后，歌曲就暂停
  }

})