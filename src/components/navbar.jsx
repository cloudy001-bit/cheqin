import { Link } from 'react-router-dom'
// import '../styles/Navbar.css'

const CheqinLogo = () => (
  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="24" height="24" rx="2" stroke="#1A47E5" strokeWidth="3" fill="none" />
    <rect x="10" y="10" width="12" height="12" rx="1" stroke="#1A47E5" strokeWidth="2.5" fill="none" />
    <rect x="14" y="14" width="4" height="4" rx="0.5" fill="#1A47E5" />
    <path d="M28 16 L36 16 L36 36 L16 36 L16 28" stroke="#1A47E5" strokeWidth="3" strokeLinecap="square" fill="none" />
  </svg>
)

function Navbar() {
  return (
    <nav className="cq-nav">
      <Link to="/" className="cq-logo">
        <CheqinLogo />
        <span className="cq-logo-name">CHEQIN</span>
      </Link>

      <ul className="cq-nav-links">
        <li><Link to="/discover">Discover</Link></li>
        <li><Link to="/organizers">For Organizers</Link></li>
        <li><Link to="/venues">Venues</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <div className="cq-nav-cta">
        <Link to="/Signup" className="btn-ghost">Log in</Link>
        <Link to="/Signup" className="btn-primary">Get started</Link>
      </div>
    </nav>
  )
}

export default Navbar