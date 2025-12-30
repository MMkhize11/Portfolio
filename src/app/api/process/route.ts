import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import { ProcessStep } from '@/utils/interfaces'

export async function GET() {
  try {
    const file = await fs.readFile(process.cwd() + '/src/data/profile.json', 'utf8')
    const data = JSON.parse(file)
    const processSteps: ProcessStep[] = data.user.process || []

    // Sort by sequence and filter enabled
    const sortedProcess = processSteps
      .filter(step => step.enabled)
      .sort((a, b) => a.sequence - b.sequence)

    return NextResponse.json({ process: sortedProcess })
  } catch (error) {
    console.error('Error fetching process steps:', error)
    return NextResponse.json({ process: [] })
  }
}
