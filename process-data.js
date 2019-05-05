
'use strict'
const db = require('./users.json')

let users = db.users;

/**
 * 登录验证
 */
const login = function(login_user){
    let code = 400,msg = "",admin = {};
    let user_arr = users;
    let user = user_arr.filter((item,index)=>{
        return item.username===login_user.username;
    });
    if(user.length!=0){
        let obj = user[0];
        if(obj.password===login_user.password){
             msg = "登录成功";
             code = 200;
             admin = {
                 username:obj.username,
                 token:obj.token,
                 id:obj.id
             };
        }else{
            msg = "密码错误";
        }
    }else{
        msg = "用户不存在";
    }
    
    return {
        msg,
        admin,
        code
    }
}

/**
 * 获取用户信息
 */
const getAdmin = function(token){
    let code = 403,admin = {}, msg = "登录信息已失效" ;
    let user_arr = users;
    let user = user_arr.filter((item)=>{
        return item.token===token;
    });
    if(user.length != 0){
        let obj = user[0];
        code = 200;
        admin = {
            username:obj.username,
            id:obj.id,
            token:obj.token
        }
        msg = "OK";
    }
    return {
        admin,
        code,
        msg
    }
}

module.exports ={
    login,
    getAdmin
}