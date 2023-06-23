const express = require("express");
const puppeteer = require("puppeteer");
const app = express();
const port = 3000;
const htmlString = require("./html");

app.get("/pdf", async (req, res) => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setContent(htmlString);
  const pdf = await page.pdf({ path: "fwd_devtest.html" });
  // res.attachment('fwd_devtest.pdf');
  res.pipe(pdf);
  await browser.close();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
