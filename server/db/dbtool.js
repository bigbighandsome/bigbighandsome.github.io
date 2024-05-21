const sqlite3 = require("sqlite3").verbose()
const GenId = require("../utils/showFlake")
const path = require("path")

const db = new sqlite3.Database(path.join(__dirname, "./blog.sqlite3"))
const genid = new GenId({ WorkerId: 1 })

db.async = {}

//封装all方法
db.async.all = (sql, param) => {
    return new Promise((resolve, rejects) => {
        db.all(sql, param, (err, rows) => {
            resolve({ err, rows })
        })
    })
}

//封装run方法
db.async.run = (sql, param) => {
    return new Promise((resolve, rejects) => {
        db.run(sql, param, (err, rows) => {
            resolve({ err, rows })
        })
    })
}

module.exports = { db, genid }