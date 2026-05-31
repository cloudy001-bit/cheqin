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

function Login() {
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
            Your dashboard.<br />
            Your <span className="accent">audience.</span><br />
            Your data.
          </h2>
          <p className="cq-auth-aside-sub">
            Sell tickets, manage check-ins, and grow your attendee base — all from one place.
          </p>

          <div className="cq-auth-aside-stats">
            <div className="cq-auth-stat">
              <div className="cq-auth-stat-num">500+</div>
              <div className="cq-auth-stat-label">Active attendees</div>
            </div>
            <div className="cq-auth-stat-divider" />
            <div className="cq-auth-stat">
              <div className="cq-auth-stat-num">₦0</div>
              <div className="cq-auth-stat-label">Setup fee</div>
            </div>
            <div className="cq-auth-stat-divider" />
            <div className="cq-auth-stat">
              <div className="cq-auth-stat-num">Real-time</div>
              <div className="cq-auth-stat-label">Check-in data</div>
            </div>
          </div>
        </div>

        <div className="cq-auth-aside-quote">
          <p>"Cheqin made our check-in seamless. No queues, no stress."</p>
          <span>— Tunde A., Lagos Cultural Night</span>
        </div>
      </aside>

      {/* Right panel — form */}
      <main className="cq-auth-main" style={{ background: '#f5f4f0' }} >
        <div className="cq-auth-form-wrap">
          <div className="cq-auth-form-header">
            <h1>Welcome back</h1>
            <p>Sign in to your business account</p>
          </div>

          <form className="cq-auth-form" onSubmit={e => e.preventDefault()}>
            <div className="cq-field">
              <label htmlFor="email">Business email</label>
              <input
                id="email"
                type="email"
                placeholder="hello@yourbusiness.com"
                autoComplete="email"
              />
            </div>

            <div className="cq-field">
              <div className="cq-field-row">
                <label htmlFor="password">Password</label>
                <Link to="/forgot-password" className="cq-field-link">Forgot password?</Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            <div className="cq-checkbox-row">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Keep me signed in for 30 days</label>
            </div>

            <button type="submit" className="btn-auth-primary">
              Sign in
            </button>
          </form>

          <div className="cq-auth-divider">
            <span>or continue with</span>
          </div>

          <div className="cq-oauth-row">
            <button className="btn-oauth">
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
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

          <p className="cq-auth-switch">
            Don't have a business account?{' '}
            <Link to="/signup">Create one free →</Link>
          </p>
        </div>
      </main>

    </div>
  )
}

export default Login