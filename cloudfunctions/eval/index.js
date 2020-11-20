// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const _openid = wxContext.OPENID;
  switch (event.fn) {

    case 'get_filter': {
      return get_filter(event, _openid)
    }

    case "add_area": {
      return add_area(event, _openid)
    }
    case "remove_area": {
      return remove_area(event, _openid)
    }

    case "update_area": {
      return update_area(event, _openid)
    }

    case "add_label": {
      return add_label(event, _openid)
    }
    case "remove_label": {
      return remove_label(event, _openid)
    }

    case "update_label": {
      return update_label(event, _openid)
    }

    case "add_type": {
      return add_type(event, _openid)
    }
    case "remove_type": {
      return remove_type(event, _openid)
    }

    case "update_type": {
      return update_type(event, _openid)
    }

    case "add_salary": {
      return add_salary(event, _openid)
    }
    case "remove_salary": {
      return remove_salary(event, _openid)
    }

    case "update_salary": {
      return update_salary(event, _openid)
    }

    case "add_company": {
      return add_company(event, _openid)
    }
    case "remove_company": {
      return remove_company(event, _openid)
    }

    case "update_company": {
      return update_company(event, _openid)
    }

    case "add_position": {
      return add_position(event, _openid)
    }
    case "remove_position": {
      return remove_position(event, _openid)
    }

    case "update_position": {
      return update_position(event, _openid)
    }

    //用户
    case 'get_user_info': {
      return get_user_info(event, _openid)
    }
    case 'get_user': {
      // 全部
      return get_user(event)
    }
    case 'update_user': {
      return update_user(event)
    }
    case 'remove_user': {
      return remove_user(event)
    }
    case 'add_user': {
      return add_user(event, _openid)
    }
    case 'remove_pic': {
      return await cloud.deleteFile({
        fileList: [event.pic],
      })
    }
    case 'update_join': {
      return update_join(event, _openid)
    }
    case 'update_swiper': {
      return update_swiper(event, _openid)
    }

    default: {
      return
    }
  }
}

async function get_filter(event, _openid) {
  let area_list = await db.collection('f_area').get();
  let label_list = await db.collection('f_label').get();
  let type_list = await db.collection('f_type').get();
  let salary_list = await db.collection('f_salary').get();
  return {
    area_list: area_list.data,
    label_list: label_list.data,
    type_list: type_list.data,
    salary_list: salary_list.data
  }
}

// 地区
async function add_area(event, _openid) {
  return await db.collection('f_area').add({
    data: event.one
  });
}

async function remove_area(event, _openid) {
  return await db.collection('f_area').doc(event._id).remove();
}

async function update_area(event, _openid) {
  return await db.collection('f_area').doc(event._id).update({
    data: {
      name: event.name
    }
  });
}

// 标签
async function add_label(event, _openid) {
  return await db.collection('f_label').add({
    data: event.one
  });
}

async function remove_label(event, _openid) {
  return await db.collection('f_label').doc(event._id).remove();
}

async function update_label(event, _openid) {
  return await db.collection('f_label').doc(event._id).update({
    data: {
      name: event.name
    }
  });
}

// 类型
async function add_type(event, _openid) {
  return await db.collection('f_type').add({
    data: event.one
  });
}

async function remove_type(event, _openid) {
  return await db.collection('f_type').doc(event._id).remove();
}

async function update_type(event, _openid) {
  return await db.collection('f_type').doc(event._id).update({
    data: {
      name: event.name
    }
  });
}

// 薪资范围
async function add_salary(event, _openid) {
  return await db.collection('f_salary').add({
    data: event.one
  });
}

async function remove_salary(event, _openid) {
  return await db.collection('f_salary').doc(event._id).remove();
}

async function update_salary(event, _openid) {
  return await db.collection('f_salary').doc(event._id).update({
    data: {
      name: event.name
    }
  });
}

// 公司
async function add_company(event, _openid) {
  return await db.collection('company').add({
    data: event.one
  });
}

async function remove_company(event, _openid) {
  await cloud.deleteFile({
    fileList: [event.logo],
  })
  return await db.collection('company').doc(event._id).remove();
}

async function update_company(event, _openid) {
  let _id = event.one._id;
  delete event.one._id;
  return await db.collection('company').doc(_id).update({
    data: event.one
  });
}

// 职位
async function add_position(event, _openid) {
  await db.collection('position').add({
    data: event.one
  });
  // 更新公司职位数
  const _ = db.command;
  await db.collection('company').doc(event.one.company._id).update({
    data: {
      position_number: _.inc(1)
    }
  })
  return 'ok'
}

async function remove_position(event, _openid) {
  await db.collection('position').doc(event._id).remove();
  // 更新公司职位数
  const _ = db.command;
  await db.collection('company').doc(event.company_id).update({
    data: {
      position_number: _.inc(-1)
    }
  })
  return 'ok'
}

async function update_position(event, _openid) {
  let _id = event.one._id;
  delete event.one._id;
  return await db.collection('position').doc(_id).update({
    data: event.one
  });
}

async function update_join(event, _openid) {
  let _id = event.one._id;
  delete event.one._id;
  return await db.collection('join').doc(_id).update({
    data: event.one
  });
}

async function update_swiper(event, _openid) {
  let _id = event.one._id;
  delete event.one._id;
  return await db.collection('swiper').doc(_id).update({
    data: event.one
  });
}

// 用户
async function add_user(event, _openid) {
  let one = event.one;
  one._openid = _openid;
  one.created_at = new Date().valueOf();
  try {
    var o = await db.collection('user').add({
      data: one
    });
    return o;
  } catch (e) {
    return e;
  }
}

async function get_user_info(event, _openid) {
  let field = event.field || {};
  let user = await db.collection('user')
    .where({
      _openid
    })
    .field(field)
    .get();

  return {
    user: user
  }
}

async function get_user(event) {
  let page = event.page;
  let count = await db.collection('user').count();
  let users = await db.collection('user')
    .skip((page - 1) * 20)
    .limit(20)
    .orderBy('created_at', 'desc')
    .field({
      nickName: true,
      avatarUrl: true,
      created_at: true,
      _openid: true,
      is_admin: true,
    })
    .get()
  return {
    total: count.total,
    users: users.data
  }
}

async function update_user(event) {
  let one = event.one;
  let _id = one._id;
  delete one._id;
  return await db.collection('user').doc(_id).update({
    data: one
  });
}

async function remove_user(event) {
  return await db.collection('user').doc(event._id).remove();
}