const express = require("express");
const router = express.Router();
const { db, genid } = require("../db/dbtool");
const { v4: uuidv4 } = require("uuid");

//注册
router.post("/register", async (req, res) => {
  let { account, password, user_name, face_img_url } = req.body;
  const select_sql = "select `account` from `user` where `account`=?";
  face_img_url =
    face_img_url == null ? "./public/public/error.png" : face_img_url;
  let result = await db.async.all(select_sql, [account]);
  if ((result.err == null, result.rows.length > 0)) {
    res.send({
      code: 500,
      msg: "账号已经注册，请登录，如果密码忘记请联系站长QQ：1323943635",
    });
    return;
  }
  let register_token = uuidv4();
  let register_id = genid.NextId();
  const insert_sql =
    "insert into `user` (`id`,`account`,`password`,`user_name`,`token`,`face_img_url`) values (?,?,?,?,?,?)";
  let { err, rows } = await db.async.run(insert_sql, [
    register_id,
    account,
    password,
    user_name,
    register_token,
    face_img_url,
  ]);
  if (err == null) {
    let user_info = {};
    user_info.id = register_id;
    user_info.account = account;
    user_info.password = "你看你大爷呢？！";
    user_info.user_name = user_name;
    user_info.token = register_token;
    user_info.face_img_url = face_img_url;
    res.send({
      code: 200,
      msg: "注册成功",
      data: user_info,
    });
  } else {
    res.send({
      code: 500,
      msg: `注册失败:${err}`,
    });
  }
});

//登录
router.post("/login", async (req, res) => {
  let { account, password } = req.body; 
  let { err, rows } = await db.async.all(
    "select * from `user` where `account`=? AND `password`=?",
    [account, password]
  );
  if ((err == null, rows.length > 0)) {
    let login_token = uuidv4();
    let user_info = rows[0];

    let update_sql = "update `user` set `token` = ? where `id`=?";
    await db.async.run(update_sql, [login_token, rows[0].id]);

    user_info.token = login_token;
    user_info.password = "你看你大爷呢？！";
    res.send({
      code: 200,
      msg: "登录成功",
      data: user_info,
    });
  } else {
    res.send({
      code: 500,
      msg: "登录失败",
    });
  }
});

//修改个人信息
router.post("/_user_token/change", async (req, res) => {
  let { password, user_name, face_img_url } = req.body;
  let { usertoken } = req.headers;

  (password == password) == null ? "" : password;
  (user_name == user_name) == null ? "" : user_name;
  (face_img_url == face_img_url) == null ? "" : face_img_url;
  let params = [];
  let update_sql = [];
  if (password != "") {
    update_sql.push(" `password`=? ");
    params.push(password);
  }
  if (user_name != "") {
    update_sql.push(" `user_name`=? ");
    params.push(user_name);
  }
  if (face_img_url != "") {
    update_sql.push(" `face_img_url`=? ");
    params.push(face_img_url);
  }
  const update_str =
    "update `user` set " + update_sql.join(" , ") + "where `token`=?";
  // update `blog` set  `password`=? , `user_name`=? , `face_img_url`=?

  // params = params.push(usertoken) 不行
  params = params.concat([usertoken]); //行！

  let { err, rows } = await db.async.run(update_str, params);
  console.log(update_str, usertoken, params);
  if (err == null) {
    let user_change_info = {};
    user_change_info.password = password;
    user_change_info.user_name = user_name;
    user_change_info.face_img_url = face_img_url;
    res.send({
      code: 200,
      msg: "修改成功",
      data: user_change_info,
    });
  } else {
    res.send({
      code: 500,
      msg: `修改失败:${err}`,
    });
  }
});

//查询user
router.get("/user_list", async (res, req) => {
  let { id } = res.query;
  id = id == null ? 0 : id;

  let where_sql = [];
  let params = [];

  if (id != 0) {
    where_sql.push(" `id`=? ");
    params.push(id);
  }
  let search_sql = "select * from `user`";
  if (where_sql.length > 0) {
    where_str = where_sql.join(" AND ");
    search_sql += " where " + where_str;
  }
  let { err, rows } = await db.async.all(search_sql, params);
  if (err == null) {
    req.send({
      code: 200,
      msg: "查询成功",
      rows,
    });
  } else {
    req.send({
      code: 500,
      msg: "查询失败",
    });
  }
});

//查询当前登录的user
//查询user
router.get("/_user_token/current_user", async (res, req) => {
  let { usertoken } = res.headers;
  let search_sql = "select * from `user` where `token`=?";
  let { err, rows } = await db.async.all(search_sql, usertoken);
  if (err == null) {
    req.send({
      code: 200,
      msg: "查询成功",
      data: rows,
    });
  } else {
    req.send({
      code: 500,
      msg: "查询失败",
    });
  }
});

module.exports = router;
