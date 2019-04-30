
'use strict'
const db = require('./db.json')

let users = db.login;

/**
 * 登录验证
 */
const login = function(login_user){
    let code = 400,msg = "",admin = {};
    let user = users.filter((item,index)=>{
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

module.exports ={
    login,
}