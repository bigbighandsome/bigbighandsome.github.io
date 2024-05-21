const express = require("express");
const router = express.Router();
const { db, genid } = require("../db/dbtool");
const { v4: uuidv4 } = require("uuid");

router.post("/login", async (res, req) => {
  let { account, password } = res.body;
  let { err, rows } = await db.async.all(
    "select * from `admin` where `account`=? AND `password`=?",
[account, password]    
  );
  if ((err == null, rows.length > 0)) {
    let login_token = uuidv4();
    let user_info = rows[0];

    let update_sql = "update `admin` set `token` = ? where `id`=?";
    await db.async.run(update_sql, [login_token, rows[0].id]);

    user_info.token = login_token;
    user_info.password = "你看你大爷呢？！";
    req.send({
      code: 200,
      msg: "登录成功",
      data: user_info,
    });
  } else {
    req.send({
      code: 500,
      msg: "登录失败",
    });
  }
});

router.post("/_token/check", async (res, req) => {});
module.exports = router;
