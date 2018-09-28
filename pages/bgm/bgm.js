var data = require('../../utils/data.js').songs;

//获取到audio的上下文对相关
//audioContext 通过 audioId 跟一个 组件绑定，通过它可以操作对应的组件
this.audioContext = wx.createAudioContext('audio');

Page({
  data: {
    /**轮播图 */
    imgUrls: [
      'http://p3.music.126.net/bKFfzVVNmdLTaRN5uHHPqA==/18786255672743757.jpg',
      'http://p4.music.126.net/n15ddawhY4cyIzFu23CSJA==/1401877341861315.jpg',
      'http://p3.music.126.net/zMwH3zh33TAacyh2_4RjXw==/1375489062675977.jpg'
    ],
    isPlayingMusic: false,


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
      /*
      wx.getBackgroundAudioPlayerState({
        success: function(e) {
          console.log("获取音乐播放状态" + res.status);
          if (e.status === 2) {
            that.setData({
              showing = false
            })
          }
        }
      })*/
    }
    that.setData({
      recommends: data_recommends
    })
  },



})