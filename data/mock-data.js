const Mock = require('mockjs')

const Random =  Mock.Random;

const list = Mock.mock({
    "list|15-85":[{
        "id":"@increment",
        "number|1-100":1,
        "username":"@cname()",
        "business_name":"@ctitle()"+"秀科技",
        "legal_person":"@cname()",
        "phone":"1"+"@integer(7,9)"+"@integer(100000000,999999999)",
        "status|1":[1,2,9],
        "created_time":"@now()"

    }]
});

module.exports = {
    ...list
}
