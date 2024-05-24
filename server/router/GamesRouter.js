const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/shuangrenyouxi", async (req, res) => {
  const headers = {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  };
  try {
    const response = await axios({
      url: "http://localhost:8080/shuangrenyouxi/shuangrenyouxi.html",
      headers: headers,
    });
    res.send({
      code: 200,
      data: response.data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error); // 出错时返回错误信息
  }
});

module.exports = router;
