// pages/company/company.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiper: [{
      image: 'https://7265-release-cy5nr-1302775048.tcb.qcloud.la/WechatIMG224.jpeg?sign=2259490dc1e692b45977c5e58e40e3fa&t=1596505641'
    }, ],
    admin: true,
    list: [],
    page: 1,
  },
  // 注册
  auth(e) {
    wx.showLoading({
      title: '正在加载',
    })
    if (e.detail.userInfo) {
      wx.cloud.callFunction({
        name: 'eval',
        data: {
          fn: 'add_user',
          one: e.detail.userInfo
        }
      }).then(res => {
        wx.hideLoading();
        this.get_user_info();
      })
    } else {
      wx.showToast({
        title: '未授权',
        icon: 'none'
      })
    }
  },
  // 获取用户信息
  get_user_info() {
    wx.cloud.callFunction({
      name: 'eval',
      data: {
        fn: 'get_user_info',
        field: {
          is_admin: true
        }
      }
    }).then(res => {
      if (res.result.user.data.length) {
        this.setData({
          user_info: res.result.user.data[0]
        })
      } else {
        this.setData({
          user_info: ''
        })
      }
    })
  },

  // 获取列表
  fetch() {
    wx.showLoading({
      title: '正在加载',
    })
    db.collection('company').count().then(res => {
      this.setData({
        total: res.total
      })
    })
    db.collection('company')
      .skip((this.data.page - 1) * 20).limit(20)
      .orderBy('created_at', 'desc')
      .get().then(res => {
        wx.hideLoading();
        let list = res.data.map(v => {
          let d = new Date(v.created_at);
          v.time = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + '';
          return v;
        })
        this.setData({
          list: this.data.list.concat(list)
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetch();
    this.get_user_info();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.page * 20 < this.data.total) {
      this.setData({
        page: this.data.page + 1
      })
      this.fetch();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})