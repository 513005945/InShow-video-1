//获取应用实例
const app = getApp()
var serverUrl = app.serverUrl;
var userId = app.globalData.userId;

var myVideoListrows;
var likeVideoListows;

Page({
  data: {
    serverUrl: serverUrl,
    isMe: true,
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
    receiveLikeCounts: 0,

    isFollow: true,//默认未关注，快去关注我
    videoInfo: null
  },

  onLoad: function(params) {
    var that = this;

    
    var publisherId = params.publisherId;
    //var isFollow=params.isFollow
    //console.log("***************111********************" + params.isFollow);
    that.setData({
      videoInfo: params.videoInfo,
      isFollow: params.isFollow,
    })
    //console.log("***********************************" + that.data.isFollow);
    if (publisherId != null && publisherId != '' && publisherId != undefined) {
      // userId = publisherId;
      that.setData({
        isMe: false,
        publisherId: publisherId,
      })
    }
    wx.showLoading({
      title: '请等待...'
    })
   
    //请求个人简介
    wx.request({
      url: serverUrl + '/user/query?userId=' + params.publisherId + "&loginId=" + userId,
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log("就是来打印" + JSON.stringify(res.data.data));
        wx.hideLoading();
        var userInfo = res.data.data;
        that.setData({
          isFollow: userInfo.fansPickuser,
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
        // console.log("2632366366_____"+that.data.isFollow)
      },
    })




  },
  followMe: function(e) {
    var that = this;
    var publisherId = that.data.publisherId;
    var followType = e.currentTarget.dataset.followtype;
    var url = '';
    //
    if (that.data.isFollow === false) {
      url = '/user/fanspick?followId=' + publisherId + '&userId=' + userId;
    } else {
      url = '/user/fansUnpick?userId=' + userId + '&followId=' + publisherId;
    }

    wx.showLoading();
    wx.request({
      url: serverUrl + url,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        wx.hideLoading();
        console.log("**************" + JSON.stringify(res));
        //1:关注 
        //0:取消关注
        if (followType == '1') {
          that.setData({
            fansCounts: that.data.fansCounts+1,
            isFollow: true,
          })
        } else {
          that.setData({
            fansCounts: that.data.fansCounts-1,
            isFollow: false,
          })
        }
      }

    })


  },

  Myreturn: function(params) {
    var that = this;
    wx.redirectTo({
      url: '../vedioInfo/vedioInfo?videoInfo=' + JSON.stringify(that.data.videoInfo) ,
    })
  }


})