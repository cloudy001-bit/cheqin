import { Link } from 'react-router-dom'
import '../styles/Home.css'

const events = [
  {
    id: 1,
    name: 'OUTSYD Run: Benin',
    tag: 'Run',
    price: 'Free',
    date: 'Jun 14, 2026',
    location: 'Benin City',
    spots: 47,
    color: 'blue',
  },
  {
    id: 2,
    name: 'Afrobeats Live — The Garden Edition',
    tag: 'Concert',
    price: '₦15k',
    date: 'Jun 21, 2026',
    location: 'Victoria Island',
    spots: 120,
    color: 'green',
  },
  {
    id: 3,
    name: 'Lagos Cultural Night — Eko Edition',
    tag: 'Culture',
    price: '₦5k',
    date: 'Jul 5, 2026',
    location: 'Lekki Phase 1',
    spots: 200,
    color: 'red',
  },
  {
    id: 4,
    name: 'Curated Supper Club No. 7',
    tag: 'Dinner',
    price: '₦25k',
    date: 'Jul 12, 2026',
    location: 'Ikoyi',
    spots: 12,
    color: 'purple',
  },
]

const steps = [
  {
    num: '01',
    icon: 'ti-search',
    title: 'Discover',
    desc: 'Browse curated events, concerts, dining experiences, and cultural moments happening near you.',
  },
  {
    num: '02',
    icon: 'ti-ticket',
    title: 'Secure your spot',
    desc: 'Get your digital ticket in seconds. No cash at the door, no WhatsApp drama — just a clean confirmation.',
  },
  {
    num: '03',
    icon: 'ti-qrcode',
    title: 'Check in',
    desc: 'Scan in at the gate. Every check-in builds your profile — and your profile unlocks more over time.',
  },
]

const CheqinLogoMark = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="24" height="24" rx="2" stroke="#1A47E5" strokeWidth="3" fill="none" />
    <rect x="10" y="10" width="12" height="12" rx="1" stroke="#1A47E5" strokeWidth="2.5" fill="none" />
    <rect x="14" y="14" width="4" height="4" rx="0.5" fill="#1A47E5" />
    <path d="M28 16 L36 16 L36 36 L16 36 L16 28" stroke="#1A47E5" strokeWidth="3" strokeLinecap="square" fill="none" />
  </svg>
)

function EventCard({ event }) {
  return (
    <div className="cq-event-card">
      <div className={`cq-event-thumb cq-event-thumb--${event.color}`}>
        <span className="cq-event-tag">{event.tag}</span>
        <span className="cq-event-price">{event.price}</span>
      </div>
      <div className="cq-event-body">
        <div className="cq-event-name">{event.name}</div>
        <div className="cq-event-meta">
          <span>
            <i className="ti ti-calendar" aria-hidden="true" />
            {event.date}
          </span>
          <span>
            <i className="ti ti-map-pin" aria-hidden="true" />
            {event.location}
          </span>
        </div>
        <div className="cq-event-footer">
          <div className="cq-event-spots">
            <b>{event.spots} spots</b> left
          </div>
          <button className="btn-sm">Get ticket</button>
        </div>
      </div>
    </div>
  )
}

function Home() {
  return (
    <div className="cq-wrap">

      {/* ── Hero ── */}
      <section className="cq-hero">
        <div className="cq-hero-tag">
          <span aria-hidden="true" />
          Nigeria's access platform
        </div>

        <h1>
          Show up.<br />
          <span className="accent">Secure</span> your<br />
          <span className="accent-green">spot.</span>
        </h1>

        <p className="cq-hero-sub">
          Cheqin is how Nigerians discover, access, and engage with live experiences —
          from concerts to cultural festivals to curated dinners.
        </p>

        <div className="cq-hero-actions">
          <button className="btn-hero">Browse events</button>
          <button className="btn-hero-outline">Host an event →</button>
        </div>

        <div className="cq-hero-stats">
          <div>
            <div className="cq-stat-num">500+</div>
            <div className="cq-stat-label">Registered attendees</div>
          </div>
          <div className="cq-stat-divider" />
          <div>
            <div className="cq-stat-num">Lagos</div>
            <div className="cq-stat-label">Starting here</div>
          </div>
          <div className="cq-stat-divider" />
          <div>
            <div className="cq-stat-num">1 platform</div>
            <div className="cq-stat-label">Events · dining · stays</div>
          </div>
        </div>
      </section>

      {/* ── Events ── */}
      <section className="cq-section">
        <div className="cq-section-label">Upcoming events</div>
        <div className="cq-section-header">
          <h2 className="cq-section-title">
            What's happening<br />near you
          </h2>
          <button className="btn-ghost">View all events →</button>
        </div>
        <div className="cq-events-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="cq-section" style={{ paddingTop: '1rem' }}>
        <div className="cq-section-label">How it works</div>
        <h2 className="cq-section-title">Presence is currency.</h2>
        <p className="cq-section-sub">
          Three steps between you and the room where it happens.
        </p>
        <div className="cq-how-grid">
          {steps.map((step) => (
            <div key={step.num} className="cq-how-card">
              <div className="cq-how-num">{step.num}</div>
              <div className="cq-how-icon">
                <i className={`ti ${step.icon}`} aria-hidden="true" />
              </div>
              <div className="cq-how-title">{step.title}</div>
              <div className="cq-how-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Band ── */}
      <div className="cq-cta-band">
        <h2>
          Ready to run your<br />
          next event on <span>Cheqin?</span>
        </h2>
        <div className="cq-cta-right">
          <button className="btn-white">Start for free</button>
          <span className="cq-cta-sub">No setup fees · Real-time data</span>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="cq-footer">
        <Link to="/" className="cq-logo" style={{ textDecoration: 'none' }}>
          <CheqinLogoMark size={28} />
          <span className="cq-footer-copy">© 2026 Cheqin</span>
        </Link>
        <ul className="cq-footer-links">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="https://cheqin.com">cheqin.com</a></li>
        </ul>
      </footer>

    </div>
  )
}

export default Home