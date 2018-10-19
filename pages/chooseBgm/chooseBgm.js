var serverUrl = getApp().serverUrl;
var userId = getApp().globalData.userId;

Page({
  data: {
    // 单曲的封面图———写死先
    poster: "http://p4.music.126.net/tUapZaR1iT5XTX2QcAc0DA==/96757023257715.jpg",

    /**轮播图 */
    imgUrls: [
      'http://p3.music.126.net/bKFfzVVNmdLTaRN5uHHPqA==/18786255672743757.jpg',
      'http://p4.music.126.net/n15ddawhY4cyIzFu23CSJA==/1401877341861315.jpg',
      'http://p3.music.126.net/zMwH3zh33TAacyh2_4RjXw==/1375489062675977.jpg'
    ],

    showView: true, //显示按钮开拍
    //play: true, //控制单曲播放
    chooseCount: 0,
    bgmList: [],
    serverUrl: serverUrl,
    videoParams: {},
    audioCtx: {},
    itemId: "",
    test: {},
    //默认所有的歌曲不播放的
    audioAction: {
      method: 'pause'
    },
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
    console.log("------------bgm--------------" + params.tmpCoverUrl)

    that.setData({
      videoParams: params,
    });

    wx.showLoading({
      title: '请等待...',
    });

   // 使用wx.createAudioContext获取audio上下文的context
    that.audioCtx = wx.createAudioContext("myAudio", that)


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
              console.log("嘿502");
            }
          });
        }
      }

    })
  },

  //点击歌曲显示按钮----并播放当前歌曲
  toggleBtn: function(e) {
    var that = this;
    //获取bgmList的当前hide的按钮
    var toggleBtn = that.data.showView;
    console.log("是否显示红色按钮" + toggleBtn)
    var itemId = e.currentTarget.id;

//显示的当前歌曲的红色按钮
    if (toggleBtn == itemId) {
      that.setData({
        showView: false,
        audioAction: {
          method: 'pause'
        }
      })
    } else {
      that.setData({
        showView: itemId
      });
    }

    try {
      //暂停事件
      // that.audioCtx = wx.createAudioContext(that.data.itemId)
      // that.audioCtx.pause();
      that.setData({
        itemId: itemId,
        audioAction: {
          method: 'pause'
        }
      });
      setTimeout(function() {
       // that.n_audioCtx = wx.createAudioContext(itemId);
       // that.n_audioCtx.play();
        audioAction: {
          method: 'play'
        }
      }, 500)
    } catch (e) {}
  },

  //确认并开拍按钮-----跳转
  uploadBtn: function(e) {
    var me = this;

    //TODO：点击上传按钮后得保证歌不是播放状态的————————bug暂存
    me.setData({
      action: {
        method: 'pause'
      }
    });

    // me.data.test.pause();
    // me.audioCtx.pause();
    //console.log("==========================")
    // wx.getBackgroundAudioManager().stop(); //获取后台音乐播放状态
    // wx.pauseBackgroundAudio(); //暂停播放音乐
    // wx.stopBackgroundAudio(); //停止播放音乐。  

    //console.log("----视频的具体信息----------" + JSON.stringify(me.data.videoParams))
    var duration = me.data.videoParams.duration;
    var tmpVideoUrl = me.data.videoParams.tmpVideoUrl;
    var tmpCoverUrl = me.data.videoParams.tmpCoverUrl;

    var bgmId = me.data.itemId;
    console.log("bgmId:---------" + bgmId);


    //如果是录制上传的话，动态获取屏幕高和宽
    if (tmpWidth == undefined || tmpHeight == undefined) {
      //动态获取设备屏幕的高度
      wx.getSystemInfo({
        success: function(res) {
          tmpWidth = res.windowWidth;
          tmpHeight = res.windowHeight;
        }
      })
    } else { //如果是本地上传的话，高度和宽度就不会是undefined了，本来有值
      var tmpWidth = me.data.videoParams.tmpWidth;
      var tmpHeight = me.data.videoParams.tmpHeight;
    }

    wx.navigateTo({
      url: '../publish/publish?duration=' + duration +
        "&tmpHeight=" + tmpHeight +
        "&tmpWidth=" + tmpWidth +
        "&tmpVideoUrl=" + tmpVideoUrl +
        "&tmpCoverUrl=" + tmpCoverUrl +
        "&audioId=" + bgmId
    })

  },

  onShow: function() {
    var me = this;
    // me.audioCtx.pause();
    // wx.getBackgroundAudioManager().stop();
    // wx.pauseBackgroundAudio(); //暂停播放音乐
    // wx.stopBackgroundAudio(); //停止播放音乐。
    // me.audioCtx = wx.createAudioContext(bgmId)
    // me.audioCtx.pause();
    console.log("============onShow==============")
  },

  onHide: function() {
    var me = this;
    // me.audioCtx.pause();
    // wx.getBackgroundAudioManager().stop();
    // wx.pauseBackgroundAudio(); //暂停播放音乐
    // wx.stopBackgroundAudio(); //停止播放音乐。
    console.log("============onHide==============")
  },

  onRead: function() {
    var that = this;
    // 使用wx.createAudioContext获取audio上下文的context
   // that.audioCtx = wx.createAudioContext("myAudio", that)
  }

})