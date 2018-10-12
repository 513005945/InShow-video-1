//获取应用实例
const app = getApp()
var serverUrl = getApp().serverUrl;

var myVideoListrows;
var likeVideoListows;

Page({
  data: {
    serverUrl: serverUrl,
    isMe: true,
    isFollow: true, //默认未关注
    videoSelClass: "video-info",
    isSelectedWork: "video-info-selected",
    isSelectedLike: "",

    myVideoList: [],
    myVideoPage: 1,
    myVideoTotal: 1,

    likeVideoList: [],
    likeVideoPage: 1,
    likeVideoTotal: 1,

    myWorkFalg: false,
    myLikesFalg: true,

    //个人信息
    avatarurl: '',
    city: '',
    country: '',
    gender: 1,
    nickname: '',
    openid: '',
    province: '',
    reportCounts: '',
    username: '',
    fansCounts: 0,
    followCounts: 0,
    receiveLikeCounts: 0
  },

  onLoad: function(params) {
    var me = this;
    wx.showLoading();
    var user = app.getGlobalUserInfo()
    var userId = app.globalData.userId;
    var serverUrl = app.serverUrl;

    // //在跳转前的页面设置了一个全局变量，在这里直接获取全局
    // var publisherId = getApp().globalData.publisherId;
    // console.log("就是来打印发布者的id-----" + publisherId)
    // //如果传入的 publisherId 不为空，就说明进入的用户详情页
    // if (publisherId != null && publisherId != '' && publisherId != undefined) {
    //   userId = publisherId;
    //   me.setData({
    //     isMe: false,
    //     publisherId: publisherId,
    //     serverUrl: serverUrl
    //   })
    // }
    // me.setData({
    //   userId: userId
    // })

    wx.showLoading({
      title: '请等待...',
    })

    //请求个人简介
    wx.request({
      url: serverUrl + '/user/query?userId=' + userId,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data);
        wx.hideLoading();
        var userInfo = res.data.data;
        me.setData({
          avatarurl: userInfo.avatarurl,
          city: userInfo.city,
          country: userInfo.country,
          gender: userInfo.gender,
          id: userInfo.id,
          nickname: userInfo.nickname,
          openid: userInfo.openid,
          province: userInfo.province,
          reportCounts: userInfo.reportCounts,
          username: userInfo.username,
          fansCounts: userInfo.fansCounts,
          followCounts: userInfo.followCounts,
          receiveLikeCounts: userInfo.receiveLikeCounts,
        });
      },
    })
    me.getMyVideoList(1);



  },

  //作品
  doSelectWork: function() {
    this.setData({
      isSelectedWork: "video-info-selected",
      isSelectedLike: "",
      isSelectedFollow: "",

      myWorkFalg: false,
      myLikesFalg: true,
      myFollowFalg: true,

      myVideoList: [],
      myVideoPage: 1,
      myVideoTotal: 1,

      likeVideoList: [],
      likeVideoPage: 1,
      likeVideoTotal: 1,

      followVideoList: [],
      followVideoPage: 1,
      followVideoTotal: 1
    });

    this.getMyVideoList(1);
  },

  doSelectLike: function() {
    this.setData({
      isSelectedWork: "",
      isSelectedLike: "video-info-selected",
      isSelectedFollow: "",

      myWorkFalg: true,
      myLikesFalg: false,
      myFollowFalg: true,

      myVideoList: [],
      myVideoPage: 1,
      myVideoTotal: 1,

      likeVideoList: [],
      likeVideoPage: 1,
      likeVideoTotal: 1,

      followVideoList: [],
      followVideoPage: 1,
      followVideoTotal: 1
    });

    this.getMyLikesList(0);
  },

  //作品
  getMyVideoList: function(page) {
    var me = this;
    var user = app.getGlobalUserInfo()
    var userId = app.globalData.userId;
    var serverUrl = app.serverUrl;
    // 查询视频信息
    wx.showLoading();
    // 调用后端
    wx.request({
      //url: serverUrl + '/video/showAll/?page=' + page + '&pageSize=6',
      url: serverUrl + '/video/myVideo/?page=' + page + '&userId=' + userId,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        var myVideoList = res.data.data.rows;
        myVideoListrows = res.data.data.rows;
        wx.hideLoading();

        var newVideoList = me.data.myVideoList;
        me.setData({
          myVideoPage: page,
          myVideoList: newVideoList.concat(myVideoList),
          myVideoTotal: res.data.data.total,
          serverUrl: app.serverUrl
        });
      }
    })
  },

  //收藏
  getMyLikesList: function(page) {
    var me = this;
    var user = app.getGlobalUserInfo();
    var userId = app.globalData.userId;
    var serverUrl = app.serverUrl;
    // console.log(userId, serverUrl)
    //查询视频信息
    wx.showLoading();

    wx.request({
      url: serverUrl + '/video/showMylike/?userId=' + userId + '&page=' + page + '&pageSize=6',
      // url: 'http://192.168.1.7:8081/video/showMylike',
      method: "POST",
      // data: {
      //   userId: "18092868HFHRN4DP",
      //   page: 0,
      //   pageSize:6
      // },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        var likeVideoList = res.data.data.rows;
        likeVideoListows = res.data.data.rows;
        wx.hideLoading();

        var newVideoList = me.data.likeVideoList;
        me.setData({
          likeVideoPage: page,
          likeVideoList: newVideoList.concat(likeVideoList),
          likeVideoTotal: res.data.data.total,
          serverUrl: app.serverUrl
        });
      }
    })
  },

  // 到底部后触发加载
  onReachBottom: function() {
    var myWorkFalg = this.data.myWorkFalg;
    var myLikesFalg = this.data.myLikesFalg;
    // console.log(this.data);
    // console.log( myVideoListrows);
    if (!myWorkFalg) {
      var currentPage = this.data.myVideoPage;
      var totalPage = this.data.myVideoTotal;
      // 获取总页数进行判断，如果当前页数和总页数相等，则不分页
      if (myVideoListrows.length == 0) {

        wx.showToast({
          title: '已经没有视频啦...',
          icon: "none"
        });
        return;
      }
      var page = currentPage + 1;
      this.getMyVideoList(page);
    } else if (!myLikesFalg) {
      var currentPage = this.data.likeVideoPage;
      var totalPage = this.data.myLikesTotal;
      // 获取总页数进行判断，如果当前页数和总页数相等，则不分页
      if (likeVideoListrows.length == 0) {
        wx.showToast({
          title: '已经没有视频啦...',
          icon: "none"
        });
        return;
      }
      var page = currentPage + 1;
      this.getMyLikesList(page);
    }

  },
  //点击视频列表跳转到对应的视频播放页
  showVideoInfo: function(e) {
    var me = this;
    var myWorkFalg = this.data.myWorkFalg;
    var myLikesFalg = this.data.myLikesFalg;

    if (!myWorkFalg) {
      var videoList = this.data.myVideoList;
    } else if (!myLikesFalg) {
      var videoList = this.data.likeVideoList;
    }
    var videoList = me.data.myVideoList;
    var arrindex = e.target.dataset.arrindex;
    var videoInfo = JSON.stringify(videoList[arrindex]);
    console.log("视频信息叻" + videoInfo)
    wx.redirectTo({
      url: '../vedioInfo/vedioInfo?videoInfo=' + videoInfo
    })
  },

})