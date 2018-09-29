var videoContextPrev, videoContext;
Page({
  data: {
    showView: true, //显示按钮开拍
    play: true, //控制单曲播放
    chooseCount: 0,
    bgmList: [],
    serverUrl: "http://192.168.1.7:8081",
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
    console.log(params);
    // me.setData({
    //   videoParams: params
    // });
    wx.showLoading({
      title: '请等待...',
    });

    //var user = getApp().getGlobalUserInfo();

    // 调用后端
    wx.request({
      url: 'http://192.168.1.7:8081/bgm/getAll',
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
    console.log("是否隐藏" + toggleBtn)
    var itemId = e.currentTarget.id;
    if (toggleBtn == itemId) {
      that.setData({
        //showView: (!that.data.showView)
        showView: 0
      })
    } else {
      that.setData({
        showView: itemId
      })
    }
    try{

      that.audioCtx = wx.createAudioContext(that.data.itemId)
      that.audioCtx.pause();
      that.setData({
        itemId: itemId
      })
      setTimeout(function () {
        that.n_audioCtx = wx.createAudioContext(itemId);
        that.n_audioCtx.play();
      }, 500)
    }catch(e){}


  },


  // //音频播放  
  // audioPlay: function(e) {
  //   var that = this,
  //     id = e.currentTarget.dataset.id,
  //     key = e.currentTarget.dataset.key,
  //     bgmList = that.data.bgmList,
  //     vidSrc = bgmList[key].src;
  //   // myaudio.src = vidSrc;
  //   myaudio.autoplay = true;

  //   //切换显示状态
  //   for (var i = 0; i < bgmList.length; i++) {
  //     bgmList[i].play = false;
  //   }
  //   bgmList[key].play = true;

  //   //开始监听
  //   myaudio.onPlay(() => {
  //     that.setData({
  //       bgmList: bgmList
  //     })
  //   })

  //   //结束监听
  //   myaudio.onEnded(() => {
  //     bgmList[key].play = false;
  //     that.setData({
  //       bgmList: bgmList,
  //     })
  //   })

  // },

  // // 音频停止
  // audioStop: function(e) {
  //   var that = this,
  //     key = e.currentTarget.dataset.key,
  //     bgmList = that.data.bgmList;
  //   //切换显示状态
  //   for (var i = 0; i < bgmList.length; i++) {
  //     bgmList[i].play = false;
  //   }
  //   bgmList[key].play = false;

  //   myaudio.stop();
  //   //停止监听
  //   myaudio.onStop(() => {
  //     bgmList[key].play = false;
  //     that.setData({
  //       bgmList: bgmList,
  //     })
  //   })
  //   //结束监听
  //   bgmList.onEnded(() => {
  //     bgmList[key].play = false;
  //     that.setData({
  //       bgmList: bgmList,
  //     })
  //   })
  // },
















  /*
    onMusicTap: function(e) {
      var that = this;
      console.log("打印这个模块的具体信息", e);
      const dataset = e.currentTarget.dataset;
      var id = dataset.id;
      var index = dataset.index;
      let data_recommends = this.data.recommends;
      //每次都触发这个开关
      data_recommends[index].show = !data_recommends[index].show;
      console.log("是不是真的呢"+data_recommends[index].show)
      // 遍历recommends的长度
      for (var i = 0; i < data_recommends.length; i++) {
        //var showing = 'data_recommends' + '[' + i + ']' + '.' + 'show';
        //data_recommends[i].show = false;

        // 如果当前的ID等于选择的ID，就添加一个SHOW属性
        if (data_recommends[i].id == id) {
         // data_recommends[i].show = true;

          backgroundAudioManager.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46"
          console.log("data_recommends[i].show关掉之前" + data_recommends[i].show);

          wx.stopBackgroundAudio(); //正常播放的话就停止.不写这个的话，下一首歌的播放还是原来上一首的
        } else {
          //没有遍历到的歌曲列表显示播放状态为false
          //data_recommends[i].show = false;
          
        }
      }
      that.setData({
        recommends: data_recommends
      })
    },**/



})