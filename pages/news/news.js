// pages/news/news.js
var Turnfile = require('../../utils/station_name.js')
const app = getApp()

var myFansListrows;
var myFollowsListrows;
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    SelClass: "video-info",
    isSelectedFans: "video-info-selected",
    isSelectedFollows: "",

    myFansFalg: false,
    myFollowsFalg: true,

    myFansList: [],
    myFansPage: 0,

    myFollowsList: [],
    myFollowsPage: 0,

    //个人信息
    id:'',
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

  onLoad: function(){
    var me = this;
    
    me.getmyFansList(0);    
  },

  onReachBottom: function () {
    var myFansFalg = this.data.myFansFalg;
    var myFollowsFalg = this.data.myFollowsFalg;
    // console.log(this.data);
    // console.log( myVideoListrows);
    if (!myFansFalg) {
      var currentPage = this.data.myFansPage;
      //  var totalPage = this.data.myVideoTotal;
      // 获取总页数进行判断，如果当前页数和总页数相等，则不分页
      if (myFansListrows.length == 0) {

        wx.showToast({
          title: '已经没有粉丝啦...',
          icon: "none"
        });
        return;
      }
      var page = currentPage + 1;
      this.getmyFansList(page);
    }
    else if (!myFollowsFalg) {
      var currentPage = this.data.myFollowsPage;
      // var totalPage = this.data.myLikesTotal;
      // 获取总页数进行判断，如果当前页数和总页数相等，则不分页
      if (myFollowsListrows.length == 0) {
        wx.showToast({
          title: '已经没有关注的人啦...',
          icon: "none"
        });
        return;
      }
      var page = currentPage + 1;
      this.getmyFollowsList(page);
    }
   } ,
  //获取粉丝列表
  getmyFansList: function(page){
    var me = this;
    
    wx.showLoading();
    // var user = app.getGlobalUserInfo();
    var userId = app.globalData.userId;
    var serverUrl = app.serverUrl;
    // console.log("++++++++++" + serverUrl);
    wx.request({

      url: serverUrl + '/search/getFansByKey?userid=' + userId + '&page=' + page,

      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success(res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.status == 200) {
        
        var myFansList = res.data.data;
          // console.log("--------------" + JSON.stringify(res.data.data));
          // console.log("myFansList:" + JSON.stringify(myFansList));
            myFansListrows = res.data.data;
          for (var i = 0; i < myFansList.length;i++){
            myFansList[i].province= Turnfile.getname(myFansList[i].province);
            myFansList[i].city = Turnfile.getname(myFansList[i].city);
          }

          // console.log("+++++++++++++++" + JSON.stringify(myFansListrows));
        var newFansList = me.data.myFansList;
        me.setData({

           myFansPage: page,
          myFansList: newFansList.concat(myFansList),
          // myFansTotal: res.data.data.total,
          serverUrl: app.serverUrl,
        });
        // console.log(myFansList);
        }
        else if (res.data.status == 500){
          wx.showToast({
            title: '没有粉丝啦...',
            icon: "none"
          });
        }
      },
    })
  },
  //获取关注列表
  getmyFollowsList: function (page) {
    var me = this;
    wx.showLoading();
    // var user = app.getGlobalUserInfo();
    var userId = app.globalData.userId;
    var serverUrl = app.serverUrl;
    // console.log("++++++++++" + serverUrl);
    wx.request({

      url: serverUrl + '/search/getFollowByKey?userid=' + userId + '&page=' + page,

      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success(res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.status == 200) {

          var myFollowsList = res.data.data;
              myFollowsListrows = res.data.data;
          for (var i = 0; i < myFollowsList.length; i++) {
            myFollowsList[i].province = Turnfile.getname(myFollowsList[i].province);
            myFollowsList[i].city = Turnfile.getname(myFollowsList[i].city);
          }

          var newFollowsList = me.data.myFollowsList;
          me.setData({

            myFollowsPage: page,
            myFollowsList: newFollowsList.concat(myFollowsList),
            // myFollowsTotal: res.data.data.total,
            serverUrl: app.serverUrl,
          });
          // console.log(myFollowsList);
        }
        else if (res.data.status == 500) {
          wx.showToast({
            title: '没有关注啦...',
            icon: "none"
          });
        }
      },
    })
  },
  
  //跳转到用户信息页面
  showUser: function (e) {
    var that = this;
    // console.log("2222222222222222222333333" + JSON.stringify( e.currentTarget));
    var userId = e.currentTarget.dataset.userid;
    // console.log("2222222222222222222" + userId);
    wx.navigateTo({
      url: '../userInfo/userInfo?publisherId=' + userId,
    })
  },

  
  doSelectFans: function () {
    this.setData({
      isSelectedFans: "video-info-selected",
      isSelectedFollows: "",
   

      myFansFalg: false,
      myFollowsFalg: true,

      myFansList: [],
      myFollowsPage: 0,


      myFollowsList: [],
      myFollowsPage: 0,



    });
    this.getmyFansList(0);

  },

  doSelectFollows: function () {
    this.setData({
      isSelectedFans: "",
      isSelectedFollows: "video-info-selected",


      myFansFalg: true,
      myFollowsFalg: false,
     
      myFansList: [],
      myFollowsPage: 0,


      myFollowsList: [],
      myFollowsPage: 0,
      
    });

    this.getmyFollowsList(0);
  },
  
})

