
import puppeteer from "puppeteer"
import { JobApplication, RoboResponse } from "./common/shared-interfaces";

async function roboSumbit(data: JobApplication):Promise<RoboResponse> {
  const browser = await puppeteer.launch({ headless: false, slowMo: 10 })
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0);
  await page.setDefaultTimeout(0)
  await page.goto("https://frontier.jobs/jobs/190562")
  await page.waitForSelector('#user')
  // await page.type('#user', email)
  // await page.type('#pass', password)
  // await page.click('#OBSubmit')
  // await page.waitForSelector('#support-reference')
  // await page.waitForSelector('#shortCutLinks > span:nth-child(3)')
  // await page.click('#shortCutLinks > span:nth-child(3)')
  // await page.waitForSelector('#tableSwitcherButton_2')
  // await page.click('#tableSwitcherButton_2')
  // await page.waitForSelector('#paymentHistoryTable_limitSelectionDropdown_dropId > div.dropdown-selection-white.dropdown-h4 > div > div')
  // const results = await page.evaluate(() => {
  //   return document.querySelectorAll('.tableRow')
  // })
  // console.log("These are results", results)
 await browser.close();

 return {
   error: false
 }

}

export default roboSumbit