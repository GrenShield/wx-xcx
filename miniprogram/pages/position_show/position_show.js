// pages/position_show/position_show.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
  },
  // 打开位置
  openLocation() {
    wx.openLocation(this.data.data.location)
  },
  // 关闭弹出
  close: function () {
    this.setData({
      showContactDialog: false,
      showShareDialog: false
    });
  },
  // 打开联系菜单
  openContact: function () {
    this.setData({
      showContactDialog: true
    });
  },
  // 打开分享菜单
  openShare: function () {
    this.setData({
      showShareDialog: true
    });
  },
  // 拨打电话
  makePhoneCall(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    })
  },
  // 复制微信号
  setClipboardData(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.weixin
    })
  },

  // 获取推荐列表
  getRecommList() {
    // 读取同城市的职位
    wx.showLoading({
      title: '正在加载',
    })
    db.collection('position')
      .where({
        'area._id': this.data.data.area._id
      })
      .count().then(res => {
        this.setData({
          total: res.total
        })
      })
    const _ = db.command
    db.collection('position')
      .where({
        'area._id': this.data.data.area._id,
        '_id': _.not(_.eq(this.data.data._id))
      })
      .skip((this.data.page - 1) * 20).limit(20)
      .orderBy('created_at', 'desc')
      .get().then(res => {
        wx.hideLoading();
        let list = res.data;
        list = list.map(v => {
          let d = new Date(v.created_at);
          v.time = (d.getMonth() + 1) + '月' + d.getDate() + '号';
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


    if (options._id) {
      this.setData({
        'data._id': options._id
      })

    }
    wx.cloud.callFunction({
      name: 'eval',
      data: {
        fn: 'get_user_info',
        field: {
          is_admin: true
        }
      }
    }).then(res => {
      this.setData({
        user_info: res.result.user.data[0]
      })
    })
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
    const db = wx.cloud.database();
    wx.showLoading({
      title: '正在加载',
    })
    db.collection('position').doc(this.data.data._id)
      .get()
      .then(res => {
        wx.hideLoading();
        let data = res.data;
        let o = new Date(data.created_at);
        data.time = (o.getMonth() + 1) + '月' + o.getDate() + '日';
        this.setData({
          data: data,
          list: [],
          page: 1,
        })
        this.getRecommList();
      })
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
      this.getRecommList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 分享到朋友圈
   */
  onShareTimeline() {}
})