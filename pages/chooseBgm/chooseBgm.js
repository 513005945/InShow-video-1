var serverUrl = getApp().serverUrl;
var userId = getApp().globalData.userId;

Page({
  data: {

    poster: "http://p4.music.126.net/tUapZaR1iT5XTX2QcAc0DA==/96757023257715.jpg",
    /**轮播图 */
    imgUrls: [
      'http://p3.music.126.net/bKFfzVVNmdLTaRN5uHHPqA==/18786255672743757.jpg',
      'http://p4.music.126.net/n15ddawhY4cyIzFu23CSJA==/1401877341861315.jpg',
      'http://p3.music.126.net/zMwH3zh33TAacyh2_4RjXw==/1375489062675977.jpg'
    ],

    showView: true, //显示按钮开拍
    play: true, //控制单曲播放
    chooseCount: 0,
    bgmList: [],
    serverUrl: serverUrl,
    videoParams: {},
    audioCtx: {},

  },

  /**搜索框跳转 */
  sousuo: function (e) {
    wx.navigateTo({
      url: '../bgmsearch/bgmsearch',
    })
  },

  /**音频进度 */
  audioPress: function (e) {
    var progress = parseInt((e.detail.currentTime / e.detail.duration) * 100)
    this.setData({
      audioPress: progress
    })
  },

  //-------------------------------------------------------------------------------------
  audioplay: function(e) {
    var thisAudio = wx.createAudioContext(e.currentTarget.id)
    var me = this;

    me.setData({
      playingBgm: e.currentTarget.id
    })

    if (e.currentTarget.choose==0)
      thisAudio.play();
    else
      return
    
    console.log(e)
    var list = me.data.bgmList;
    console.log("--------------"+list.length)
    for (var i = 0; i < list.length;i++){
      console.log("------000--------" + i)
      if (list[i].id != e.currentTarget.id)
        list[i].choose = 1;
      else{
        wx.createAudioContext(list[i].id).pause();
      }
    }
  },
  // audiopause: function(e){
  //   var thisAudio = wx.createAudioContext(e.currentTarget.id)
  //   if (e.currentTarget.choose == 1)
  //     thisAudio.pause();
  //   else
  //     return
  //   for (var i = 0; i < list.length; i++) {
  //     console.log("------000--------" + i)
  //     if (list[i].id != e.currentTarget.id)
  //       list[i].choose = 0;
  //   }
  // },
  onLoad: function (params) {
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
      success: function (res) {
        wx.hideLoading();
        if (res.data.status == 200) {
          var bgmList = res.data.data;
          for (var i = 0; i < bgmList.length; i++) {
            bgmList[i]["choose"] = 0
          }
          console.log(bgmList)
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
            success: function () {
              console.log("嘿");
            }
          });
        }
      }
    })
  },

  toggleBtn: function (e) {
    var that = this;
    //获取bgmList的当前hide的按钮
    var toggleBtn = that.data.showView;
    console.log("是否显示红色按钮" + toggleBtn)
    var itemId = e.currentTarget.id;
    if (toggleBtn == itemId) {
      that.setData({
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
      setTimeout(function () {
        that.n_audioCtx = wx.createAudioContext(itemId);
        that.n_audioCtx.play();
      }, 500)
    } catch (e) { }
  },

  uploadBtn: function (e) {
    var me = this;

    //console.log("-----打印歌曲具体信息-----" + JSON.stringify(me.data))

    //TODO：点击上传按钮后得保证歌不是播放状态的————————bug暂存
    wx.getBackgroundAudioManager().stop();
    //console.log("----视频的具体信息----------" + JSON.stringify(me.data.videoParams))
    var duration = me.data.videoParams.duration;
    var tmpVideoUrl = me.data.videoParams.tmpVideoUrl;
    var tmpCoverUrl = me.data.videoParams.tmpCoverUrl;

    var bgmId = me.data.itemId;
    console.log("bgmId:---------" + bgmId);

    if (tmpWidth == undefined || tmpHeight == undefined) {
      //动态获取设备屏幕的高度
      wx.getSystemInfo({
        success: function (res) {
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
    wx.createAudioContext(me.data.playingBgm).pause();
    wx.navigateTo({
      // url: '../publish/publish?duration=' + duration +
      //   "&tmpHeight=" + tmpHeight +
      //   "&tmpWidth=" + tmpWidth +
      //   "&tmpVideoUrl=" + tmpVideoUrl +
      //   "&tmpCoverUrl=" + tmpCoverUrl + 
      //   "&audioId=" + bgmId
      url: '../vedioPreview/vedioPreview?duration=' + duration +
        "&tmpHeight=" + tmpHeight +
        "&tmpWidth=" + tmpWidth +
        "&tmpVideoUrl=" + tmpVideoUrl +
        "&tmpCoverUrl=" + tmpCoverUrl +
        "&audioId=" + bgmId
    })
  },

})


