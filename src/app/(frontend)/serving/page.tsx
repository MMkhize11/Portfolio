import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';

const description =
  'Nine years serving on the church media team: sound, video, lighting and livestream for Sunday services of around 1,000 people in Johannesburg.';

export const metadata: Metadata = {
  title: 'Serving: Church Sound, Video & Lighting',
  description,
  alternates: { canonical: '/serving' },
  openGraph: { title: 'Serving | Mpumelelo Mkhize', description, url: '/serving', type: 'website', locale: 'en_ZA', images: ['/og'] },
};

// The real path a Sunday service takes, stage to screen.
const signalPath = [
  { stage: 'Stage', detail: 'Drum kit miked per piece, bass, electric, two acoustics, Nord keys, front-line vocals' },
  { stage: 'Desk', detail: 'Allen & Heath SQ-7: front of house, in-ear and monitor mixes, plus a matrix feed for the stream' },
  { stage: 'Switcher', detail: 'ATEM with two fixed cameras and a roaming camera on a Hollyland wireless transmitter, into OBS' },
  { stage: 'Stream', detail: 'Restream out to YouTube and Facebook' },
];

const seats = [
  {
    name: 'Sound',
    gear: 'Allen & Heath SQ-7 now, a Behringer Wing before the merger, Dante for in-ear packs',
    work: 'Line checks, in-ear mix checks and corrections, helping players with their personal monitor boxes, then the front of house mix: EQ, compression and delay where the room needs it.',
  },
  {
    name: 'Video',
    gear: 'ATEM switcher, OBS, Restream, an LED wall (3040×720) and two side projectors',
    work: 'My regular seat is the switcher, cutting between two line-in cameras and a roaming camera on a Hollyland transmitter for the room and the livestream. ProPresenter 7 runs alongside, led by our team head.',
  },
  {
    name: 'Lighting',
    gear: 'ChamSys MagicQ PC now, Obsidian Onyx before',
    work: 'Running lighting live across Kratos fixtures, movers, wash and floor spots, roof spots and haze. Since we moved to the new ChamSys console, I have started programming cues and patching fixtures myself.',
  },
];

const week = [
  {
    when: 'Wednesday evening',
    what: 'Band practice. Each musician sets their own mix, then we EQ for whoever is on stage that week.',
  },
  {
    when: 'Line and in-ear check',
    what: 'Every channel checked, every in-ear mix checked and corrected before the band plays a note.',
  },
  {
    when: 'Rehearsal',
    what: 'While the band runs the set, I build the front of house mix so Sunday starts from a known place.',
  },
  {
    when: 'Sunday',
    what: 'One service of around 1,000 people in the room, plus everyone watching the stream.',
  },
];

const incidents = [
  {
    what: 'Lights going haywire on a Sunday morning',
    response: 'During the band run-through an hour before the service, the console stopped talking to the fixtures. We told the pastor, who gave us until the first praise and worship song. Power-cycling the fixtures a few times brought them back in time.',
  },
  {
    what: 'A random pop through the speakers',
    response: 'It still comes and goes with no clear pattern. Our working theory is a fault in the desk itself.',
  },
  {
    what: 'Sudden peaks on single lines',
    response: 'The electric guitar line kept spiking with no warning. The cause was an old cable whose ends looked fine but did not seat all the way into the guitar, so the connection was loose. Swapping the cable cleared it.',
  },
];

export default function ServingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <span className="blob w-[70vw] h-[90vh] absolute -top-[20vh] -right-[20vw] blur-[120px] -z-10 opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 rounded mb-12"
        >
          <ArrowLeft size={18} aria-hidden /> Home
        </Link>

        <header className="mb-16">
          <h1 className="text-[2rem] md:text-6xl font-bold text-white mb-6 leading-[1.05] tracking-[-0.02em] [text-wrap:balance]">
            Nine years behind the desk
          </h1>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl">
            I started on the media team in my youth ministry and moved into the main church. That church was African
            Dream Family Church, which has since merged with New Day. Same venue, same team, and today about 1,000 people
            on a Sunday morning.
          </p>
        </header>

        <blockquote className="border-l-2 border-orange-500 pl-6 mb-20 max-w-2xl">
          <p className="text-2xl md:text-3xl font-medium text-white leading-snug [text-wrap:balance]">
            Ministry comes in all shapes and sizes. It does not always have to be on the pulpit where you serve the Lord.
          </p>
        </blockquote>

        <section aria-labelledby="path" className="mb-20">
          <h2 id="path" className="text-2xl md:text-3xl font-semibold text-white mb-3">
            From the stage to the stream
          </h2>
          <p className="text-white/60 mb-8 max-w-2xl">
            How a Sunday gets from the stage to someone watching at home. I&apos;ve worked at each point along it.
          </p>
          <ol className="grid md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
            {signalPath.map((s, i) => (
              <li key={s.stage} className="bg-background p-5 relative">
                <span className="block text-orange-500 text-sm font-semibold mb-2">{i + 1}</span>
                <span className="block text-lg font-semibold text-white mb-2">{s.stage}</span>
                <span className="block text-sm text-white/60 leading-relaxed">{s.detail}</span>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="seats" className="mb-20">
          <h2 id="seats" className="text-2xl md:text-3xl font-semibold text-white mb-3">
            Every seat in the booth
          </h2>
          <p className="text-white/60 mb-10 max-w-2xl">
            The switcher is my regular seat. When someone on the team is ill or has a family emergency, I take over
            sound or lighting.
          </p>
          <div className="space-y-10">
            {seats.map((s) => (
              <article key={s.name} className="md:grid md:grid-cols-[10rem_1fr] md:gap-8 border-t border-white/10 pt-6">
                <h3 className="text-xl font-semibold text-white mb-3 md:mb-0">{s.name}</h3>
                <div className="max-w-2xl">
                  <p className="text-white/80 leading-relaxed mb-3">{s.work}</p>
                  <p className="text-sm text-white/50">{s.gear}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="week" className="mb-20">
          <h2 id="week" className="text-2xl md:text-3xl font-semibold text-white mb-8">
            A week on sound
          </h2>
          <ol className="space-y-6 max-w-2xl">
            {week.map((w, i) => (
              <li key={w.when} className="flex gap-5">
                <span className="text-orange-500 font-semibold w-6 shrink-0">{i + 1}</span>
                <div>
                  <p className="text-white font-medium mb-1">{w.when}</p>
                  <p className="text-white/60 leading-relaxed">{w.what}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="live" className="mb-20 max-w-2xl">
          <h2 id="live" className="text-2xl md:text-3xl font-semibold text-white mb-6">
            When it goes wrong live
          </h2>
          <ul className="space-y-6">
            {incidents.map((x) => (
              <li key={x.what} className="border-l-2 border-white/15 pl-5">
                <p className="text-white font-medium mb-1">{x.what}</p>
                <p className="text-white/60 leading-relaxed">{x.response}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="beyond" className="mb-20 max-w-2xl">
          <h2 id="beyond" className="text-2xl md:text-3xl font-semibold text-white mb-6">
            Beyond Sunday
          </h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              I&apos;ve run sound for outreaches and Christmas events in disadvantaged communities, away from the
              comfort of a fixed install.
            </p>
            <p>
              I&apos;ve stepped in to help other churches when their teams needed a hand, and I&apos;ve assisted with
              signal flow and patching on our own stage. I know people in church networks well beyond my own church.
            </p>
          </div>
        </section>

        <section aria-labelledby="translator" className="mb-20 max-w-2xl">
          <h2 id="translator" className="text-2xl md:text-3xl font-semibold text-white mb-6">
            Where this meets my day job
          </h2>
          <p className="text-white/70 leading-relaxed">
            Outside the booth I&apos;m{' '}
            <Link href="/" className="text-orange-500 hover:underline">The Tech Translator</Link>. I build websites,
            apps and systems for small businesses and{' '}
            <Link href="/services" className="text-orange-500 hover:underline">ministries</Link>, and most of that job
            is explaining technology to people who don&apos;t speak it. A pastor choosing a desk needs the same thing as
            a business owner choosing software: someone who understands what they&apos;re trying to do and tells them
            plainly what will help.
          </p>
        </section>

        <section aria-labelledby="contact" className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 id="contact" className="text-2xl font-semibold text-white mb-3">
            References and travel
          </h2>
          <p className="text-white/70 leading-relaxed mb-6 max-w-2xl">
            My pastor and team leader can speak to my serving. I hold a valid passport and a driver&apos;s licence and
            I&apos;m ready to travel.
          </p>
          <a
            href="mailto:mmkhize11@gmail.com?subject=Serving%20reference%20request"
            className="inline-block rounded-full bg-orange-500 px-6 py-3 font-semibold text-black hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Request a reference
          </a>
        </section>
      </div>
    </main>
  );
}
