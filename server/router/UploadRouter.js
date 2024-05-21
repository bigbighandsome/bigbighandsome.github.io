/*
 * @Author: xygodcyx 1323943635@qq.com
 * @Date: 2023-08-28 18:22:07
 * @LastEditors: xygodcyx 1323943635@qq.com
 * @LastEditTime: 2023-09-03 21:52:06
 * @FilePath: \blog\server\router\UploadRouter.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require("express");
const router = express.Router();
const fs = require("fs");
const { db, genid } = require("../db/dbtool");

//富文本图片上传
router.post("/rich_editor_upload", async (req, res) => {
  if (!req.files) {
    res.send({
      errno: -1,
      message: "上传失败",
    });
    return;
  }
  let files = req.files;
  let ret_files = [];

  for (let file of files) {
    let file_ext = file.originalname.substring(
      file.originalname.lastIndexOf(".") + 1
    );
    let file_name = genid.NextId() + "." + file_ext;
    console.log(file_name);
    fs.renameSync(
      process.cwd() + "/public/upload/temp/" + file.filename,
      process.cwd() + "/public/upload/" + file_name
    );
    ret_files.push("/upload/" + file_name);
  }
  res.send({
    errno: 0,
    data: {
      url: ret_files,
    },
  });
});

//用户头像上传
router.post("/user_imgface_upload", async (req, res) => {
  if (!req.files) {
    res.send({
      errno: -1,
      message: "上传失败",
    });
    return;
  }
  let files = req.files;
  let ret_files = [];

  for (let file of files) {
    let file_ext = file.originalname.substring(
      file.originalname.lastIndexOf(".") + 1
    );
    let file_name = genid.NextId() + "." + file_ext;
    console.log(file_name);
    fs.renameSync(
      process.cwd() + "/public/upload/temp/" + file.filename,
      process.cwd() + "/public/upload/" + file_name
    );
    ret_files.push("/upload/" + file_name);
  }
  res.send({
    errno: 0,
    data: {
      url: ret_files,
    },
  });
});

module.exports = router;
