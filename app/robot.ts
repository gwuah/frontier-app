
import puppeteer from "puppeteer"
import { JobApplication, RoboResponse } from "./common/shared-interfaces";

async function roboSumbit(data: JobApplication):Promise<RoboResponse> {
  const browser = await puppeteer.launch({ headless: false, slowMo: 10 })
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0);
  await page.setDefaultTimeout(0)

  console.log("visiting app")
  await page.goto("https://frontier.jobs/jobs/190562")

  console.log("waiting for apply button")
  await page.waitForSelector("a[href='/jobs/190562/apply']")

  console.log("clicking on apply button")
  await page.click("a[href='/jobs/190562/apply']")
  await page.waitForSelector("input[name='fullname']")
  await page.type("input[name='fullname']", data.firstname)
  await page.type("input[name='lastname']", data.lastname)
  await page.type("input[name='email']", data.email)
  await page.type("input[name='phoneno']", data.phone)
  await page.type("input[name='location']", data.location)
  await page.type("input[name='linkedin']", data.linkedin)

  console.log("go to resume page")
  await page.click("a[href='/jobs/190562/apply/resume']")
  await page.waitForSelector("input[type='file']")

  console.log("uploading file")
  const resumeUploadInput = await page.$("input[type='file']")
  await resumeUploadInput?.uploadFile("../assets/resume.docx")


  

  // await page.type('#pass', password)
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
//  await browser.close();

 return {
   error: false
 }

}

export default roboSumbit