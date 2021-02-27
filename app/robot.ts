import puppeteer from "puppeteer"
import { RoboResponse, RoboConfig } from "./common/shared-interfaces";
import { generateFileName, downloadFile } from "./common/utils";

const config: {
  url: string;

  applyBtn: string;
  reviewBtn: string;
  resumeBtn: string;
  doneBtn: string;

  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;


  file: string
  option: string;
} = {
  url: "https://frontier.jobs/jobs/190562",

  applyBtn: "a[href='/jobs/190562/apply']",
  reviewBtn: "a[href='/jobs/190562/apply/review']",
  resumeBtn: "a[href='/jobs/190562/apply/resume']",
  doneBtn: "a[href='/jobs/190562/apply/done']",

  firstname: "input[name='fullname']",
  lastname: "input[name='lastname']",
  email: "input[name='email']",
  phone: "input[name='phoneno']",
  location: "input[name='location']",
  linkedin: "input[name='linkedin']",

  file: "input[type='file']",
  option: "div[role='option']"

}

const typeLocation = (page: puppeteer.Page) => async (locationSelector: string, optionSelector: string, location: string) => {
  await page.click(locationSelector)
  await page.keyboard.type(location, {delay: 300})
  await page.waitForSelector(optionSelector)
  await page.click("#root > main > div > div > section > label:nth-child(6) > div.sc-ezrdKe.kOQsbC > div:nth-child(1)", {delay: 800})
  await page.keyboard.press('Enter')
}

const uploadFile = (page: puppeteer.Page) => async (fileSelector: string, fileUrl: string) => {
  const filePath = generateFileName(fileUrl)
  await downloadFile(fileUrl, filePath)
  const resumeUploadInput = await page.$(fileSelector)
  await resumeUploadInput?.uploadFile(filePath as string)

  await page.waitForFunction(() => !document.querySelector("div")?.innerText.includes("Upload a file from this device"));
}

async function roboSumbit(params: RoboConfig ): Promise<void> {
  const {data} = params
  const browser = await puppeteer.launch({ headless: params.headless, slowMo: params.slowMo })
  const page = await browser.newPage()

  await page.setDefaultNavigationTimeout(0);
  await page.setDefaultTimeout(0)
  await page.goto(config.url)
  await page.waitForSelector(config.applyBtn)
  await page.click(config.applyBtn)
  await page.waitForSelector(config.firstname)
  await page.type(config.firstname, data.firstname)
  await page.type(config.lastname, data.lastname)
  await page.type(config.email, data.email)
  await page.type(config.phone, data.phone)
  await typeLocation(page)(config.location, config.option, data.location)
  await page.type(config.linkedin, data.linkedin)
  await page.click(config.resumeBtn)
  await page.waitForSelector(config.file)
  await uploadFile(page)(config.file, data.resume)
  await page.click(config.reviewBtn)
  await page.waitForSelector(config.doneBtn)
  await page.click(config.doneBtn)
  await page.waitForFunction(() => document.querySelector("h1")?.innerText.includes("Your application is on its way!"));
  await browser.close();
}

export default roboSumbit