import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Auth.css'
import '../styles/Home.css'


const CheqinLogoMark = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="24" height="24" rx="2" stroke="#1A47E5" strokeWidth="3" fill="none" />
    <rect x="10" y="10" width="12" height="12" rx="1" stroke="#1A47E5" strokeWidth="2.5" fill="none" />
    <rect x="14" y="14" width="4" height="4" rx="0.5" fill="#1A47E5" />
    <path d="M28 16 L36 16 L36 36 L16 36 L16 28" stroke="#1A47E5" strokeWidth="3" strokeLinecap="square" fill="none" />
  </svg>
)

const BUSINESS_TYPES = [
  'Event promoter',
  'Restaurant / supper club',
  'Concert venue',
  'Cultural organisation',
  'Corporate events',
  'Other',
]

function Signup() {
  const [step, setStep] = useState(1)
  const [bizType, setBizType] = useState('')

  return (
    <div className="cq-auth-wrap">

      {/* Left panel — brand */}
      <aside className="cq-auth-aside">
        <Link to="/" className="cq-auth-logo">
          <CheqinLogoMark size={32} />
          <span className="cq-auth-brand">cheqin</span>
        </Link>

        <div className="cq-auth-aside-body">
          <div className="cq-auth-aside-tag">For event hosts &amp; businesses</div>
          <h2 className="cq-auth-aside-headline">
            List your event.<br />
            <span className="accent">Own</span> your<br />
            <span className="accent-green">audience.</span>
          </h2>
          <p className="cq-auth-aside-sub">
            Join Nigerian event hosts and businesses already using Cheqin to sell tickets, manage access, and build loyal audiences.
          </p>

          <ul className="cq-auth-perks">
            {[
              'Free to list your first event',
              'QR check-in included on every ticket',
              'Real-time attendee analytics',
              'Payouts within 48 hours',
              'Dedicated host support',
            ].map((perk) => (
              <li key={perk}>
                <span className="cq-perk-check" aria-hidden="true">✓</span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div className="cq-auth-aside-quote">
          <p>"Set up our event page in under 10 minutes. Sold out in 3 days."</p>
          <span>— Amara O., Afrobeats Live</span>
        </div>
      </aside>

      {/* Right panel — form */}
      <main className="cq-auth-main" style={{ background: '#f5f4f0' }} >
        <div className="cq-auth-form-wrap">

          {/* Step indicator */}
          <div className="cq-steps">
            {['Your account', 'Your business', 'Done'].map((label, i) => {
              const num = i + 1
              const active = num === step
              const done = num < step
              return (
                <div key={label} className={`cq-step ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
                  <div className="cq-step-dot">
                    {done ? '✓' : num}
                  </div>
                  <div className="cq-step-label">{label}</div>
                  {i < 2 && <div className="cq-step-line" />}
                </div>
              )
            })}
          </div>

          {step === 1 && (
            <>
              <div className="cq-auth-form-header">
                <h1>
                    {/* <span className="cq-auth-aside-headline" > */}
                    Create your account
                    {/* </span> */}
                </h1>
                <p>Start for free — no card required</p>
              </div>

              <form className="cq-auth-form" onSubmit={e => { e.preventDefault(); setStep(2) }}>
                <div className="cq-field-pair">
                  <div className="cq-field">
                    <label htmlFor="fname">First name</label>
                    <input id="fname" type="text" placeholder="Tunde" autoComplete="given-name" required />
                  </div>
                  <div className="cq-field">
                    <label htmlFor="lname">Last name</label>
                    <input id="lname" type="text" placeholder="Adeyemi" autoComplete="family-name" required />
                  </div>
                </div>

                <div className="cq-field">
                  <label htmlFor="email">Business email</label>
                  <input id="email" type="email" placeholder="hello@yourbusiness.com" autoComplete="email" required />
                </div>

                <div className="cq-field">
                  <label htmlFor="phone">Phone number</label>
                  <div className="cq-input-prefix-wrap">
                    <span className="cq-input-prefix">🇳🇬 +234</span>
                    <input id="phone" type="tel" placeholder="080 0000 0000" autoComplete="tel" />
                  </div>
                </div>

                <div className="cq-field">
                  <label htmlFor="password">Password</label>
                  <input id="password" type="password" placeholder="At least 8 characters" autoComplete="new-password" required />
                  <div className="cq-field-hint">Use a mix of letters, numbers, and symbols.</div>
                </div>

                <button type="submit" className="btn-auth-primary">
                  Continue →
                </button>
              </form>

              <div className="cq-auth-divider"><span>or sign up with</span></div>

              <div className="cq-oauth-row">
                <button className="btn-oauth">
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Google
                </button>
                <button className="btn-oauth">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  GitHub
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="cq-auth-form-header">
                <h1>Tell us about your business</h1>
                <p>This helps us set up the right tools for you</p>
              </div>

              <form className="cq-auth-form" onSubmit={e => { e.preventDefault(); setStep(3) }}>
                <div className="cq-field">
                  <label htmlFor="bizname">Business name</label>
                  <input id="bizname" type="text" placeholder="e.g. Afrobeats Live Events" required />
                </div>

                <div className="cq-field">
                  <label>Business type</label>
                  <div className="cq-biz-types">
                    {BUSINESS_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        className={`cq-biz-type-btn ${bizType === type ? 'selected' : ''}`}
                        onClick={() => setBizType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="cq-field">
                  <label htmlFor="city">Primary city</label>
                  <select id="city">
                    {['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Benin City', 'Enugu', 'Other'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="cq-field">
                  <label htmlFor="events-per-year">How many events do you host per year?</label>
                  <select id="events-per-year">
                    <option>1–3 events</option>
                    <option>4–10 events</option>
                    <option>11–25 events</option>
                    <option>25+ events</option>
                  </select>
                </div>

                <div className="cq-field">
                  <label htmlFor="referral">How did you hear about Cheqin?</label>
                  <input id="referral" type="text" placeholder="Instagram, a friend, Google…" />
                </div>

                <div className="cq-checkbox-row">
                  <input type="checkbox" id="terms" required />
                  <label htmlFor="terms">
                    I agree to Cheqin's{' '}
                    <a href="#" className="cq-field-link">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="cq-field-link">Privacy Policy</a>
                  </label>
                </div>

                <div className="cq-btn-row">
                  <button type="button" className="btn-auth-outline" onClick={() => setStep(1)}>
                    ← Back
                  </button>
                  <button type="submit" className="btn-auth-primary">
                    Create account →
                  </button>
                </div>
              </form>
            </>
          )}

          {step === 3 && (
            <div className="cq-auth-success">
              <div className="cq-success-icon" aria-hidden="true">
                <CheqinLogoMark size={48} />
              </div>
              <h1>You're in.</h1>
              <p>Your business account is ready. Start by listing your first event — it takes under 5 minutes.</p>
              <Link to="/dashboard" className="btn-auth-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
                Go to your dashboard →
              </Link>
              <div className="cq-success-links">
                <Link to="/events/new">List an event</Link>
                <span>·</span>
                <Link to="/settings">Set up your profile</Link>
              </div>
            </div>
          )}

          {step < 3 && (
            <p className="cq-auth-switch">
              Already have an account?{' '}
              <Link to="/login">Sign in →</Link>
            </p>
          )}

        </div>
      </main>

    </div>
  )
}

export default Signup