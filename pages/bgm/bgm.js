var data = require('../../utils/data.js').songs;
//获取应用实例
var app = getApp()
//背景音乐api
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({
  data: {
    /**轮播图 */
    imgUrls: [
      'http://p3.music.126.net/bKFfzVVNmdLTaRN5uHHPqA==/18786255672743757.jpg',
      'http://p4.music.126.net/n15ddawhY4cyIzFu23CSJA==/1401877341861315.jpg',
      'http://p3.music.126.net/zMwH3zh33TAacyh2_4RjXw==/1375489062675977.jpg'
    ],
    isPlayingMusic: true,

  },
  /**搜索框跳转 */
  sousuo: function(e) {
    wx.navigateTo({
      url: '../bgmsearch/bgmsearch',
    })
  },
  /**音乐列表 */
  onLoad: function(option) {
    var rs = [],
      idsMap = {},
      keys = Object.keys(data),
      len = keys.length;

    for (var i = 0; i < len; i++) {
      var k = keys[i];

      rs.push(Object.assign({
        id: k,
      }, data[k]));

      idsMap[k] = {
        preid: i > 0 ? keys[i - 1] : 0,
        nextid: i < len - 1 ? keys[i + 1] : 0
      }
    }

    idsMap[keys[0]].preid = keys[len - 1];
    idsMap[keys[len - 1]].nextid = keys[0];

    this.setData({
      recommends: rs
    });

    wx.setStorageSync('ids', idsMap);

  },

  //音乐播放
  onMusicTap: function(e) {
    console.log("啦啦啦啦打印这个模块的具体信息", e);
    const dataset = e.currentTarget.dataset;
    var id = dataset.id; //获取id
    let data_recommends = this.data.recommends
    // 遍历recommends的长度
    for (var i = 0; i < data_recommends.length; i++) {
      data_recommends[i].show = false;
      // 如果当前的ID等于选择的ID，就添加一个SHOW属性
      if (data_recommends[i].id == id) {
        data_recommends[i].show = true
      }
    }
    this.setData({
      recommends: data_recommends
    })


    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      backgroundAudioManager.src = "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
        this.setData({
          isPlayingMusic: false
        })
    } else {
      //wx.pauseBackgroundAudio(); //暂停播放音乐
      wx.stopBackgroundAudio(); //停止播放音乐
      this.setData({
        isPlayingMusic: true
      })
    }
  },


})