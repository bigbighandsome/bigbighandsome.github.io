const express = require("express");
const path = require("path");
const multer = require("multer");
const { db } = require("./db/dbtool");
const app = express();
const port = 80; //生产端口
// const port = 8080; //开发端口

//跨域请求
app.use(function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Access-Control-Allow-Origin", "*");
  //允许的neader类型
  res.header("Access-Control-Allow-Headers", "*");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method == "OPTIONS") res.sendStatus(200); //让options尝试请求快速结束
  else next();
});

//json解析
app.use(express.json());

//upload上传
const upload = multer({
  dest: "./public/upload/temp",
});
app.use(upload.any());

//静态资源
app.use(express.static(path.join(__dirname, "public")));

//管理权限校验
const admin_token_path = "/_token";
app.all("*", async (req, res, next) => {
  if (req.path.indexOf(admin_token_path) > -1) {
    let { token } = req.headers;
    let adminSql = "select * from `admin` where `token` = ? ";
    let { err, rows } = await db.async.all(adminSql, [token]);
    if (err != null || rows.length == 0) {
      res.send({
        code: 500,
        msg: "请先登录",
      });
      return;
    } else {
      if (req.path.indexOf("/_token/check") > -1) {
        res.send({
          code: 200,
        });
      }
      next();
    }
  } else {
    next();
  }
});

//用户权限校验
const user_token_path = "/_user_token";
app.all("*", async (req, res, next) => {
  if (req.path.indexOf(user_token_path) > -1) {
    let { usertoken } = req.headers;
    let adminSql = "select `id` from `user` where `token` = ? ";
    let { err, rows } = await db.async.all(adminSql, [usertoken]);
    if (err != null || rows.length == 0) {
      res.send({
        code: 500,
        msg: "请先登录",
      });
      return;
    } else {
      next();
    }
  } else {
    next();
  }
});

//自定义路由
app.use("/upload", require("./router/UploadRouter"));
app.use("/test", require("./router/TestRouter"));
app.use("/blog", require("./router/BlogRouter"));
app.use("/admin", require("./router/AdminRouter"));
app.use("/category", require("./router/CategoryRouter"));
app.use("/user", require("./router/UserRouter"));
app.use("/comment", require("./router/CommentRouter"));
app.use("/course", require("./router/CourseRouter"));
app.use("/games", require("./router/GamesRouter"));
app.get("/", (req, res) => {
  req.send("Hello World");
});
app.listen(port, () => console.log(`run server on http://localhost:${port}`));
