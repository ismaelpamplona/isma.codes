import { chromium } from 'playwright'

export async function generatePdf(html: string) {
  // Launch a Chromium browser instance
  const browser = await chromium.launch()

  // Create a new page
  const page = await browser.newPage()

  // Set the HTML content
  await page.setContent(html, {
    waitUntil: 'networkidle'
  })

  // Add an external CSS file
  await page.addStyleTag({ path: 'src/routes/resume/style-resume.css' })

  // Generate the PDF and store it as a buffer
  const pdfBuffer = await page.pdf({ format: 'A4' })

  // Close the browser
  await browser.close()

  // Return the PDF buffer
  return pdfBuffer
}
