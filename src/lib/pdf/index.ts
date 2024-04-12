import puppeteer from 'puppeteer'

export async function generatePdf(html: string) {
  const browser = await puppeteer.launch()
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
