/**
 * Created with JetBrains WebStorm.
 * User: 王文龙
 * Email: longxinanlan@msn.cn
 * Date: 12-7-18 下午6:37
 * 处理GPS地址信息服务
 */
var check = require('validator').check,
    sanitize = require('validator').sanitize;

var http = require('http');

exports.LoginUserLocation = function(userhost) {
    var cp = userhost.toString().indexOf(':');
    var userip;
    if (cp != -1) {
        userip = userhost.substring(0, (cp-1));
    }

    //    try {
//        check('abc', '错误的IP地址').notNull().isInt()
//        check(userip).isIP();
//    } catch (e) {
//        console.log(e.message);
//        return null;
//    }

//    http.get(global.requestip.sinaip, function(res) {
//        console.log("Get response: " + res.statusCode);
//        if (res.statusCode == 200) {
//
//        }
//          res.on('data', function(e) {
//            console.log("Get data: " + data);
//        });
//        res.on('error', function(e) {
//            console.log("Get error: " + e.message);
//        });
//    })
//  http.get("http://www.google.com/index.html", function(res) {
//    console.log("Got response: " + res.statusCode);
//  }).on('error', function(e) {
//      console.log("Got error: " + e.message);
//    });

    global.requestip.sinaip.path = global.requestip.sinaip.path + userip;
    //这里应该有一个请求时间限制，还要处理请求超时问题……
    var req = http.request(global.requestip.sinaip, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            var data = chunk.toString();
            data = data.substring(chunk.indexOf('{'), (chunk.length-1));
            console.log('Get Data: ' + data);
    //            JSON.stringify(data);
            console.log('JSON Data: ' + JSON.stringify(data));

        });
    });
    req.on('error',function(e){
        console.log('Get Error: '+e.message);
    });
    //        req.write('data\n');
    //        req.write('data\n');
    req.end();
};