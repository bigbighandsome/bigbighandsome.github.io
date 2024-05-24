const express = require("express");
const router = express.Router();
const { db, genid } = require("../db/dbtool");

// 增删改查

//增
router.post("/_token/add", async (req, res) => {
  let { title, content, description, categoryid } = req.body;

  let add_sql =
    "insert into `blog` (`id`,`title`,`content`,`category_id`,`create_time`,`description`) values (?,?,?,?,?,?)";
  let params = [
    genid.NextId(),
    title,
    content,
    categoryid,
    new Date().getTime(),
    description,
  ];

  let { err, rows } = db.async.run(add_sql, params);
  if (err == null) {
    res.send({
      code: 200,
      msg: "添加成功",
    });
  } else {
    res.send({
      code: 500,
      msg: `添加失败 : ${err}`,
    });
  }
});

//删
router.delete("/_token/delete", async (req, res) => {
  let id = req.query.id;
  let delete_sql = "delete from `blog` where `id`=? ";
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
router.put("/_token/update", async (req, res) => {
  let { id, title, content, categoryid, description, likenum } = req.body;
  likenum ? likenum : 0;
  let update_sql =
    "update `blog` set `title` = ? , `content`=? ,`category_id`=?,`description`=?,`like_num`=? where `id`=? ";
  let { err, rows } = await db.async.run(update_sql, [
    title,
    content,
    categoryid,
    description,
    likenum,
    id,
  ]);
  if (err == null) {
    res.send({
      code: 200,
      msg: "更新成功",
    });
  } else {
    res.send({
      code: 500,
      msg: `更新失败 : ${err}`,
    });
  }
});

//点赞
router.put("/like", async (req, res) => {
  let { id, likenum } = req.body;
  likenum = likenum == null ? 0 : likenum;
  let like_sql = "update `blog` set `like_num`=? where `id`=? ";
  let { err, rows } = await db.async.run(like_sql, [likenum, id]);
  if (err == null) {
    res.send({
      code: 200,
      msg: "点赞成功",
    });
  } else {
    res.send({
      code: 500,
      msg: `点赞失败 : ${err}`,
    });
  }
});

//查
router.get("/list", async (req, res) => {
  let { page, pagesize, categoryid, keyword } = req.query;

  page = page == null ? 1 : page;
  pagesize = pagesize == null ? 10 : pagesize;
  categoryid = categoryid == null ? 0 : categoryid;
  keyword = keyword == null ? "" : keyword;

  let params = [];
  let whereSqls = [];

  if (categoryid != 0) {
    whereSqls.push(" `category_id` = ? ");
    params.push(categoryid);
  }
  if (keyword != "") {
    whereSqls.push(
      " (`title` LIKE ? OR `content` LIKE ? OR `description` LIKE ?) "
    );
    params.push("%" + keyword + "%");
    params.push("%" + keyword + "%");
    params.push("%" + keyword + "%");
  }

  let whereStr = "";
  if (whereSqls.length > 0) {
    whereStr = " where " + whereSqls.join(" and ");
  }

  //查分页数据
  let searchSql =
    "select `id`,`content`,`create_time`,`title`,`category_id`,`description`,`like_num` from `blog` " +
    whereStr +
    " order by `create_time` desc limit ?,?";
  // let searchSql = " SELECT `id`,`category_id`,`create_time`,`title`,substr(`content`,0,50) AS `content` FROM `blog` " + whereStr + " ORDER BY `create_time` DESC LIMIT ?,? "

  let searchParams = params.concat([(page - 1) * pagesize, pagesize]);

  //查总数
  let searchCountSql = " SELECT count(*) AS `count` FROM `blog` " + whereStr;
  let searchCountParams = params;

  //分页数据
  let searchResult = await db.async.all(searchSql, searchParams);
  let searchCountResult = await db.async.all(searchCountSql, searchCountParams);
  if (searchResult.err == null && searchCountResult.err == null) {
    res.send({
      code: 200,
      msg: "查询成功",
      categoryid,
      page,
      pagesize,
      rows: searchResult.rows,
      count: searchCountResult.rows[0].count,
    });
  } else {
    res.send({
      code: 500,
      msg: `查询失败，searchResult.err：${searchResult.err} \n searchCountResult.err：${searchCountResult.err}`,
    });
  }
});

//查单篇文章
router.get("/detail", async (req, res) => {
  let { id } = req.query;
  const detail_sql = "SELECT * FROM `blog` where id = ?";
  let { err, rows } = await db.async.all(detail_sql, [id]);
  if (err == null) {
    res.send({
      code: 200,
      msg: "获取成功",
      rows,
    });
  } else {
    res.send({
      code: 500,
      msg: `获取失败 : ${err}`,
    });
  }
});

module.exports = router;
