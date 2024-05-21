const express = require("express");
const router = express.Router();
const { db, genid } = require("../db/dbtool");

// 增删改查

//增
router.post("/_token/add", async (req, res) => {
    let name = req.body.name
    let check_sql = "select * from `category` where `name`=?"
    let result = await db.async.all(check_sql, [name]);
    if (result.err != null)
    {
        res.send({
            code: 500,
            msg: `乱七八糟的错误 : ${err}`
        });
        return
    }
    if (result.rows.length > 0)
    {
        res.send({
            code: 500,
            msg: `请不要重复添加分类名称 : =>" ${name} "`
        });
        return
    }

    let add_sql = "insert into `category` (`id`,`name`) values (?,?) ";
    let { err, rows } = await db.async.run(add_sql, [genid.NextId(), name]);
    if (err == null)
    {
        res.send({
            code: 200,
            msg: "添加成功"
        });
    } else
    {
        res.send({
            code: 500,
            msg: `添加失败 : ${err}`
        });
    }
});

//删
router.delete("/_token/delete", async (req, res) => {
    let id = req.query.id
    let delete_sql = "delete from `category` where `id`=? ";
    let { err, rows } = await db.async.run(delete_sql, [id]);
    if (err == null)
    {
        res.send({
            code: 200,
            msg: "删除成功"
        });
    } else
    {
        res.send({
            code: 500,
            msg: `删除失败 : ${err}`
        });
    }
});
//改
router.put("/_token/update", async (req, res) => {
    let { id, name } = req.body
    let update_sql = "update `category` set `name` = ? where `id`=? ";
    let { err, rows } = await db.async.run(update_sql, [name, id]);
    if (err == null)
    {
        res.send({
            code: 200,
            msg: "更新成功"
        });
    } else
    {
        res.send({
            code: 500,
            msg: `更新失败 : ${err}`
        });
    }
});


//查
router.get("/list", async (req, res) => {
    let get_sql = "select * from `category`";
    let { err, rows } = await db.async.all(get_sql, []);
    if (err == null)
    {
        res.send({
            code: 200,
            data: rows,
            msg: "获取成功"
        });
    } else
    {
        res.send({
            code: 500,
            msg: `获取失败 : ${err}`
        });
    }
});



module.exports = router;
