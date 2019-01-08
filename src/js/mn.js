const puppeteer = require('puppeteer');
const {mn} = require('../config/common')
const srcToImg = require('../helper/srcToImg');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://image.baidu.com');
 
  await page.setViewport({
    width: 1980,
    height: 1020
  })

  await page.focus('#kw')
  await page.keyboard.sendCharacter('美女')
  await page.click('.s_search')

  console.log('page before load');
  page.on('load', async () => {
    
    console.log('page loaded');
    const imgSrcArr = await page.evaluate(() => {
      const images = document.querySelectorAll('img.main_img')

      return Array.prototype.map.call(images, img => img.src)
    }, 7);
    console.log(`爬到了总共: ${imgSrcArr.length} 图片`);
    imgSrcArr.forEach(async (src) => {
      await srcToImg(src, mn)
    })

    await browser.close();
  })

 
})()