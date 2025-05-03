import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const blogFile = await fs.readFile(process.cwd() + '/src/data/blog.json', 'utf8');
    return NextResponse.json(JSON.parse(blogFile));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
} 