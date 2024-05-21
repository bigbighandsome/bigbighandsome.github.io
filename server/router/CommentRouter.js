const express = require("express");
const router = express.Router();
const { db, genid } = require("../db/dbtool");
const { v4: uuidv4 } = require("uuid");

//增
router.post("/_user_token/comment_add", async (req, res) => {
  let {
    comment_user_id,
    comment_content,
    comment_article_id,
    comment_article_title,
  } = req.body;
  const id = genid.NextId();
  let comment_create_time = new Date();

  const backgroundColor = [
    "#bf3553",
    "#eea6b7",
    "#ec2c64",
    "#a35c8f",
    "#813c85",
  ];
  //1-4 0-1
  const comment_background_color =
    backgroundColor[Math.floor(Math.random() * backgroundColor.length)];
  let insert_sql =
    "insert into `user_comment` (`id`,`comment_user_id`,`comment_content`,`comment_create_time`,`comment_background_color`,`comment_article_id`,`comment_article_title`) values (?,?,?,?,?,?,?) ";

  //0-1

  let { err, rows } = await db.async.run(insert_sql, [
    id,
    comment_user_id,
    comment_content,
    comment_create_time,
    comment_background_color,
    comment_article_id,
    comment_article_title,
  ]);
  if (err == null) {
    res.send({
      code: 200,
      msg: "评论成功",
    });
  } else {
    res.send({
      code: 500,
      msg: `评论失败:${err}`,
    });
  }
});

//删
router.delete("/_user_token/comment_delete", async (req, res) => {
  let id = req.query.id;
  let delete_sql = "delete from `user_comment` where `id`=?";
  let { err, rows } = await db.async.run(delete_sql, [id]);
  if (err == null) {
    res.send({
      code: 200,
      msg: "删除成功",
    });
  } else {
    res.send({
      code: 500,
      msg: `删除失败 : ${err}`,
    });
  }
});

//改
// router.post("/_user_token/comment_add", async (res, req) => {
//       let { comment_user_id, comment_content, comment_article_id, comment_article_title } = res.body;
//       const id = genid.NextId()
//       let comment_create_time = new Date();

//       const backgroundColor = ["#bf3553", "#eea6b7", "#ec2c64", "#a35c8f", "#813c85"];
//       //1-4 0-1
//       const comment_background_color = backgroundColor[Math.floor(Math.random() * backgroundColor.length)];
//       let insert_sql = "insert into `user_comment` (`id`,`comment_user_id`,`comment_content`,`comment_create_time`,`comment_background_color`,`comment_article_id`,`comment_article_title`) values (?,?,?,?,?,?,?) ";

//       //0-1

//       let { err, rows } = await db.async.run(insert_sql, [id, comment_user_id, comment_content, comment_create_time, comment_background_color, comment_article_id, comment_article_title])
//       if (err == null)
//       {
//             req.send({
//                   code: 200,
//                   msg: "修改成功",
//             })
//       } else
//       {
//             req.send({
//                   code: 500,
//                   msg: `修改失败:${err}`,
//             })
//       }
//       ;
// })

//查
router.get("/comment_list", async (res, req) => {
  let { comment_article_id, comment_user_id, page, pagesize } = res.query;

  page = page == null ? 1 : page;
  pagesize = pagesize == null ? 6 : pagesize;

  comment_article_id = comment_article_id == null ? 0 : comment_article_id;

  comment_user_id = comment_user_id == null ? 0 : comment_user_id;

  let where_sql = [];
  let params = [];

  if (comment_article_id > 0 && comment_user_id > 0) {
    where_sql.push(" `comment_article_id`=? ");
    where_sql.push(" `comment_user_id`=? ");
    params.push(comment_article_id);
    params.push(comment_user_id);
  } else if (comment_article_id > 0) {
    where_sql.push(" `comment_article_id`=? ");
    params.push(comment_article_id);
  } else if (comment_user_id > 0) {
    where_sql.push(" `comment_user_id`=? ");
    params.push(comment_user_id);
  }

  let where_str;
  let searchCountSql = " SELECT count(*) AS `count` FROM `user_comment` ";
  let select_sql =
    "select * from `user_comment` order by `comment_create_time` desc limit ?,?";
  if (where_sql.length > 0) {
    where_str = "where" + where_sql.join(" AND ");
    searchCountSql =
      " SELECT count(*) AS `count` FROM `user_comment` " + where_str;
    select_sql =
      "select * from `user_comment`" +
      where_str +
      " order by `comment_create_time` desc limit ?,?";
  }

  //查特定评论数

  let searchParams = params.concat([(page - 1) * pagesize, pagesize]);

  //查评论总数
  let countParams = params;

  console.log(searchParams);
  //结果
  let searchResult = await db.async.all(select_sql, searchParams);
  let countResult = await db.async.all(searchCountSql, countParams);

  if (searchResult.err == null && countResult.err == null) {
    req.send({
      code: 200,
      msg: "获取成功",
      rows: searchResult.rows,
      count: countResult.rows[0].count,
    });
  } else {
    req.send({
      code: 500,
      msg: `获取失败:${searchResult.err},${countResult.err}`,
    });
  }
});

module.exports = router;
