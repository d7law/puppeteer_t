const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const port = 3000;

app.get("/pdf", async (req, res) => {
  const url = req.query.url;
  const filename = req.query.filename || "document.pdf";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const buffer = await page.pdf({ format: "A4" });
  await browser.close();

  res.setHeader("Content-disposition", `attachment; filename=${filename}`);
  res.setHeader("Content-Type", "application/pdf");
  res.send(buffer);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
