const express = require("express")
const router = express.Router();
const { db, genid } = require("../db/dbtool")
const axios = require("axios")

router.get("/test", async (res, req) => {
    // db.all("select * from `blog` ", [], (err, rows) => {
    //     if (err != null) {
    //         req.send(err)
    //     } else {
    //         req.send({
    //             code: 200,
    //             id: genid.NextId()
    //         })
    //     }
    // })
    let out = await db.async.all("select * from `blog`", [])
    req.send({
        code: 200,
        id: genid.NextId(),
        out
    })
})

router.get("/get_token", async (req, res) => {

    const { url } = req.query;
    const { usertoken, x_id_token } = req.headers;
    const headers = {
        'usertoken': usertoken,
        'x-id-token': x_id_token,
        'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        'X-Requested-With': "com.supwisdom.jvtc",
        'Cookie': "JSESSIONID=B18A49AC4AC0F2F150C7B2D5F4DE9712"
    };
    try
    {
        const response = await axios({
            url: url,
            headers: headers
        })
        // 发起对方接口的请求
        res.send(response.data); // 将对方接口返回的数据原样返回给客户端
    } catch (error)
    {
        res.status(500).send('Error'); // 出错时返回错误信息
    }
})


router.post("/get_sjkbms", async (req, res) => {
    const { url, token } = req.query;
    console.log("token" + token);
    const headers = {
        "Host": "mm-jiaowu.jvtc.jx.cn",
        'Connection': 'keep-alive',
        'Content-Length': 0,
        'Accept': 'application/json, text/plain, */*',
        'Catch-Control': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; PEPM00 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.196 Mobile Safari/537.36 SuperApp',
        'token': token,
        'Origin': 'http://mm-jiaowu.jvtc.jx.cn',
        'X-Requested-With': 'com.supwisdom.jvtc',
        'Referer': 'http://mm-jiaowu.jvtc.jx.cn/dist/',
        'Accept-Encoding': 'gzip, deflate'
    };
    try
    {
        const response = await axios({
            url: url,
            method: "post",
            headers: headers
        })
        // 发起对方接口的请求
        res.send(response.data); // 将对方接口返回的数据原样返回给客户端
    } catch (error)
    {
        res.status(500).send('Error'); // 出错时返回错误信息
    }
})

router.post("/get_kcb", async (req, res) => {
    const { url, token } = req.query;
    console.log("token" + token);
    const headers = {
        "Host": "mm-jiaowu.jvtc.jx.cn",
        'Connection': 'keep-alive',
        'Content-Length': 0,
        'Accept': 'application/json, text/plain, */*',
        'Catch-Control': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 13; PEPM00 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.196 Mobile Safari/537.36 SuperApp',
        'token': token,
        'Origin': 'http://mm-jiaowu.jvtc.jx.cn',
        'X-Requested-With': 'com.supwisdom.jvtc',
        'Referer': 'http://mm-jiaowu.jvtc.jx.cn/dist/',
        'Accept-Encoding': 'gzip, deflate'
    };
    try
    {
        const response = await axios({
            url: url,
            method: "post",
            headers: headers
        })
        // 发起对方接口的请求
        res.send(response.data); // 将对方接口返回的数据原样返回给客户端
    } catch (error)
    {
        res.status(500).send('Error'); // 出错时返回错误信息
    }
})
module.exports = router