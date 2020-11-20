// pages/check_position/check_postion.js
const chooseLocation = requirePlugin('chooseLocation');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    one: {}
  },

  // 选择地理位置
  chooseLocation() {
    const key = 'PEABZ-PESCS-SPJOC-66WYG-O2WG3-XBFJV';
    const referer = 'YOYO招聘';
    const location = JSON.stringify({
      latitude: 39.89631551,
      longitude: 116.323459711
    });
    const category = '生活服务,娱乐休闲';
    wx.navigateTo({
      url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`
    });
  },

  select_area() {
    wx.navigateTo({
      url: '../check_area/check_area?select=true',
      events: {
        area_selected: data => {
          this.setData({
            'one.area': data[0]
          })
        }
      }
    })
  },

  select_label() {
    wx.navigateTo({
      url: '../check_label/check_label?select=true',
      events: {
        label_selected: data => {
          this.setData({
            'one.label': data[0]
          })
        }
      }
    })
  },

  select_type() {
    wx.navigateTo({
      url: '../check_type/check_type?select=true',
      events: {
        type_selected: data => {
          this.setData({
            'one.type': data[0]
          })
        }
      }
    })
  },

  select_salary() {
    wx.navigateTo({
      url: '../check_salary/check_salary?select=true',
      events: {
        salary_selected: data => {
          this.setData({
            'one.salary': data[0]
          })
        }
      }
    })
  },

  select_company() {
    wx.navigateTo({
      url: '../check_company/check_company?select=true',
      events: {
        company_selected: data => {
          this.setData({
            'one.company': data[0]
          })
        }
      }
    })
  },

  // 保存单条
  save(e) {
    if (!this.data.one.name) {
      wx.showToast({
        title: '请填写职位名称',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.salary) {
      wx.showToast({
        title: '请选择薪资范围',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.phone) {
      wx.showToast({
        title: '请填写联系电话',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.weixin) {
      wx.showToast({
        title: '请填写微信号',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.company) {
      wx.showToast({
        title: '请选择公司',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.area) {
      wx.showToast({
        title: '请选择地区',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.label) {
      wx.showToast({
        title: '请选择标签',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.type) {
      wx.showToast({
        title: '请选择职位类型',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.desc) {
      wx.showToast({
        title: '请填写职位描述',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.location) {
      wx.showToast({
        title: '请选择地理位置',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '正在保存',
      icon: 'none'
    })
    let one = this.data.one;

    wx.cloud.callFunction({
      name: 'eval',
      data: {
        fn: 'update_position',
        one: one
      }
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '保存成功',
        icon: 'none'
      })
    })
  },
  // 删除单条
  remove(e) {
    wx.showModal({
      title: '提示',
      content: '确认删除',
      success: res => {
        if (res.confirm) {
          let _id = e.currentTarget.dataset._id;
          wx.showLoading({
            title: '正在删除',
          })
          wx.cloud.callFunction({
            name: 'eval',
            data: {
              fn: 'remove_position',
              _id: _id,
              company_id: this.data.one.company._id
            }
          }).then(res => {
            wx.hideLoading();
            wx.showToast({
              title: '删除成功',
              icon: 'none'
            })
            setTimeout(res => {
              wx.navigateBack({
                delta: 2,
              })
            }, 200)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 添加
  set_add_name(e) {
    this.setData({
      'one.name': e.detail.value
    })
  },
  set_add_desc(e) {
    this.setData({
      'one.desc': e.detail.value
    })
  },
  set_add_phone(e) {
    this.setData({
      'one.phone': e.detail.value
    })
  },
  set_add_weixin(e) {
    this.setData({
      'one.weixin': e.detail.value
    })
  },
  add() {
    if (!this.data.one.name) {
      wx.showToast({
        title: '请填写职位名称',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.salary) {
      wx.showToast({
        title: '请选择薪资范围',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.phone) {
      wx.showToast({
        title: '请填写联系电话',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.weixin) {
      wx.showToast({
        title: '请填写微信号',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.company) {
      wx.showToast({
        title: '请选择公司',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.area) {
      wx.showToast({
        title: '请选择地区',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.label) {
      wx.showToast({
        title: '请选择标签',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.type) {
      wx.showToast({
        title: '请选择职位类型',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.desc) {
      wx.showToast({
        title: '请填写职位描述',
        icon: 'none'
      })
      return;
    }
    if (!this.data.one.location) {
      wx.showToast({
        title: '请选择地理位置',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '正在加载',
      icon: 'none'
    })
    let one = this.data.one;
    one.created_at = new Date().valueOf();
    wx.cloud.callFunction({
      name: 'eval',
      data: {
        fn: 'add_position',
        one: one
      }
    }).then(res => {
      wx.hideLoading();
      wx.showToast({
        title: '添加成功',
        icon: 'none'
      })
      this.setData({
        'one.name': '',
        'one.desc': ''
      })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options._id) {
      const db = wx.cloud.database();
      db.collection('position').doc(options._id).get()
        .then(res => {
          this.setData({
            one: res.data
          })
        })
    }

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
    const location = chooseLocation.getLocation();
    if (location) {
      this.setData({
        'one.location': location
      })
    }
    console.log(location);
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})