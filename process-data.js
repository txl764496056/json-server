
'use strict'
const users_json = require('./data/users.json')
const mock_data = require("./data/mock-data.js")
const list_json = require('./data/list.json')

let users = users_json.users;

/**
 * 分页数据
 */
const list = function(options){
    let code = 400,msg = "",total = 0;
    let {keyword,status,page,size} = options;
    // let list = mock_data.list;//mock生成随机列表
    let list = list_json.list; //固定的列表数据
    
    // 某一页
    if(page>0&&size>0){

        // 关键字筛选
        if(keyword!=""){
            list = list.filter((item)=>{
                let str = item.username+""+item.business_name+""+item.legal_person;
                return str.indexOf(keyword)!=-1;
            });
        }
        
        // 状态筛选
        if(status>0){
            list = list.filter((item)=>{
                return item.status === Number.parseInt(status);
            });
        }
        
        total = list.length; //经过筛选后，满足条件的总数

        // 返回一页数据
        let start = (page-1)*size;
        let end = page*size;
        list = list.slice(start,end);

        code = 200;

    }else{
        list = [];
    }

    return {
        code,
        msg,
        result:{
            total,
            list
        }
    }
}

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
        result:{
            admin
        },
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
        result:{
            admin
        },
        code,
        msg
    }
}

module.exports ={
    login, //登录验证
    getAdmin, // 获取用户信息
    list //分页列表，返回指定某页数据
}