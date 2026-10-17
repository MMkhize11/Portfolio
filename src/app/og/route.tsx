import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

// Stable URL so every page's openGraph.images can point here (file-convention images get a hashed URL)
const size = { width: 1200, height: 630 }

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
        }}
      >
        <div style={{ width: 160, height: 10, borderRadius: 5, background: 'linear-gradient(90deg, #F97316, #2563EB)', marginBottom: 40 }} />
        <div style={{ fontSize: 88, fontWeight: 700, display: 'flex' }}>The Tech Translator</div>
        <div style={{ fontSize: 44, color: '#F97316', marginTop: 12, display: 'flex' }}>Mpumelelo Mkhize</div>
        <div style={{ fontSize: 32, color: 'rgba(255,255,255,0.7)', marginTop: 32, maxWidth: 960, display: 'flex' }}>
          Websites, apps, automations &amp; AI for small businesses, teams &amp; ministries
        </div>
        <div style={{ fontSize: 28, color: '#2563EB', marginTop: 48, display: 'flex' }}>mpumelelomkhize.com</div>
      </div>
    ),
    size,
  )
}
