import type { RequestHandler } from '@sveltejs/kit'
import { generatePdf } from '$lib/pdf/index'

export const POST: RequestHandler = async ({ request }) => {
  const { html }: { html: string } = await request.json()
  const pdfBuffer: Buffer | Uint8Array = await generatePdf(html)

  return new Response(pdfBuffer, {
    status: 201,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment filename="resume.pdf"'
    }
  })
}
