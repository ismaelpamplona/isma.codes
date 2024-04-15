import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

export async function generatePdf(html: string) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath()
  })

  const page = await browser.newPage()

  await page.setContent(html, {
    waitUntil: 'networkidle0'
  })

  await page.addStyleTag({
    path: 'style-resume.css'
  })

  const pdfBuffer = await page.pdf({ format: 'A4' })

  await browser.close()

  return pdfBuffer
}
