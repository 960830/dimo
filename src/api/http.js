import Server from '../utils/request'
//讲师列表请求函数
function topTeacher() {
    return Server({
        url: '/recommend/appIndex',
        methods: 'get',
        hideloading: false,
    })
}
function teacherDetail(id) {
    return Server({
        url: `/teacher/${id}`,
        methods: 'get',
        hideloading: false,
    })
}
function teacherDetailResume(id) {
    return Server({
        url: `/teacher/info/${id}`,
        method: 'get',
        hideloading: false,
    })
}
function login(mobile, password) {
    return Server({
        url: '/login',
        method: 'post',
        data: {
            mobile: mobile,
            password: password,
            type: 1
        },
        hideloading: false,
    })
}
function msmLogin(mobile) {
    return Server({
        url: '/smsCode',
        method: 'post',
        data: {
            mobile: mobile,
            sms_type: "login"
        },
        hideloading: false,
    })
}
function logins(mobile, sms_code) {
    return Server({
        url: '/login',
        method: 'post',
        data: {
            mobile: mobile,
            sms_code: sms_code,
            type: 2
        },
        hideloading: false,
    })
}
function grade() {
    return Server({
        url: '/courseClassify',
        method: 'get',
        hideloading: false,
    })
}
function courseBasis() {
    return Server({
        url: '/courseBasis',
        method: 'get',
        data: {
            page: 1,
            limit: 10,
        },
        hideloading: false,
    })
}
function course(id, ids, page) {
    return Server({
        url: `/courseBasis?page=${page}&limit=10&course_type=0&classify_id=&order_by=&attr_val_id=${id},${ids}&is_vip=0&`,
        method: 'get',
        hideloading: false,
    })
}
function getInfo() {
    return Server({
        url: '/getUCenterInfo',
        method: 'get',
        hideloading: false,
    })
}
function personal() {
    return Server({
        url: '/userInfo',
        method: 'get',
        hideloading: false,
    })
}
function tx() {
    return Server({
        url: '/public/img',
        method: 'post',
    })
}
function user(data={}) {
    return Server({
        url: '/user',
        method: 'put',
        data
    })
}
// sms_type: "login",
export default {
    topTeacher,
    teacherDetail,
    teacherDetailResume,
    login,
    msmLogin,
    logins,
    grade,
    courseBasis,
    course,
    getInfo,
    personal,
    tx,
    user,
}