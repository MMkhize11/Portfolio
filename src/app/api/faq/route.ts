import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import { FAQ } from '@/utils/interfaces'

export async function GET() {
  try {
    const file = await fs.readFile(process.cwd() + '/src/data/profile.json', 'utf8')
    const data = JSON.parse(file)
    const faqs: FAQ[] = data.user.faqs || []

    // Sort by sequence and filter enabled
    const sortedFaqs = faqs
      .filter(faq => faq.enabled)
      .sort((a, b) => a.sequence - b.sequence)

    return NextResponse.json({ faqs: sortedFaqs })
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json({ faqs: [] })
  }
}
