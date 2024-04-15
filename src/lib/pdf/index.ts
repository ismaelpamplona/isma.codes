import puppeteer from 'puppeteer'
import chromium from 'chromium'

export async function generatePdf(html: string) {
  const browser = await puppeteer.launch({
    executablePath: chromium.path
  })
  const page = await browser.newPage()

  await page.setContent(html, {
    waitUntil: 'networkidle0'
  })

  await page.addStyleTag({
    path: 'src/routes/resume/style-resume.css'
  })

  const pdfBuffer = await page.pdf({ format: 'A4' })

  await browser.close()

  return pdfBuffer
}
