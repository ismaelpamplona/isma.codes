import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import path from 'path'

export async function generatePdf(html: string) {
  const currentDir = path.dirname(new URL(import.meta.url).pathname)
  const styleFilePath = path.resolve(currentDir, 'style-resume.css')
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath()
  })

  const page = await browser.newPage()

  await page.setContent(html, {
    waitUntil: 'networkidle0'
  })

  await page.addStyleTag({
    path: styleFilePath
  })

  const pdfBuffer = await page.pdf({ format: 'A4' })

  await browser.close()

  return pdfBuffer
}
