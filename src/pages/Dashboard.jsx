import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Dashboard.css'

/* ── Logo ── */
const CheqinLogoMark = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="24" height="24" rx="2" stroke="#1A47E5" strokeWidth="3" fill="none" />
    <rect x="10" y="10" width="12" height="12" rx="1" stroke="#1A47E5" strokeWidth="2.5" fill="none" />
    <rect x="14" y="14" width="4" height="4" rx="0.5" fill="#1A47E5" />
    <path d="M28 16 L36 16 L36 36 L16 36 L16 28" stroke="#1A47E5" strokeWidth="3" strokeLinecap="square" fill="none" />
  </svg>
)

/* ── Mock data ── */
const events = [
  { id: 1, name: 'Afrobeats Live — Garden Edition', date: 'Jun 21, 2026', location: 'Victoria Island', sold: 94, capacity: 120, revenue: 1410000, status: 'on-sale', color: 'green' },
  { id: 2, name: 'Lagos Cultural Night — Eko Edition', date: 'Jul 5, 2026', location: 'Lekki Phase 1', sold: 47, capacity: 200, revenue: 235000, status: 'on-sale', color: 'blue' },
  { id: 3, name: 'Curated Supper Club No. 7', date: 'Jul 12, 2026', location: 'Ikoyi', sold: 12, capacity: 12, revenue: 300000, status: 'sold-out', color: 'purple' },
  { id: 4, name: 'OUTSYD Run: Benin', date: 'Jun 14, 2026', location: 'Benin City', sold: 47, capacity: 47, revenue: 0, status: 'ended', color: 'gray' },
]

const recentTransactions = [
  { id: 'TXN-0091', name: 'Amara Osei', event: 'Afrobeats Live', amount: 15000, date: 'Today, 11:42 AM', type: 'ticket' },
  { id: 'TXN-0090', name: 'Kelechi Eze', event: 'Lagos Cultural Night', amount: 5000, date: 'Today, 10:17 AM', type: 'ticket' },
  { id: 'TXN-0089', name: 'Fatima Bello', event: 'Afrobeats Live', amount: 15000, date: 'Yesterday, 8:55 PM', type: 'ticket' },
  { id: 'TXN-0088', name: 'Tunde Adeyemi', event: 'Supper Club No. 7', amount: 25000, date: 'Yesterday, 6:30 PM', type: 'ticket' },
  { id: 'TXN-0087', name: 'Withdrawal', event: 'GTBank — 0123456789', amount: -500000, date: 'Jun 10, 2026', type: 'withdrawal' },
  { id: 'TXN-0086', name: 'Ngozi Okeke', event: 'OUTSYD Run: Benin', amount: 0, date: 'Jun 8, 2026', type: 'ticket' },
]

const payoutHistory = [
  { id: 'WD-014', amount: 500000, bank: 'GTBank', account: '•••• 6789', date: 'Jun 10, 2026', status: 'completed' },
  { id: 'WD-013', amount: 320000, bank: 'Access Bank', account: '•••• 4412', date: 'May 28, 2026', status: 'completed' },
  { id: 'WD-012', amount: 180000, bank: 'GTBank', account: '•••• 6789', date: 'May 14, 2026', status: 'completed' },
  { id: 'WD-011', amount: 95000, bank: 'GTBank', account: '•••• 6789', date: 'Apr 30, 2026', status: 'completed' },
]

const navItems = [
  { id: 'overview', label: 'Overview', icon: 'ti-layout-dashboard' },
  { id: 'events', label: 'My events', icon: 'ti-calendar-event' },
  { id: 'checkins', label: 'Check-ins', icon: 'ti-qrcode' },
  { id: 'payouts', label: 'Payouts', icon: 'ti-wallet' },
  { id: 'audience', label: 'Audience', icon: 'ti-users' },
  { id: 'settings', label: 'Settings', icon: 'ti-settings' },
]

const fmt = (n) => '₦' + Math.abs(n).toLocaleString('en-NG')

/* ── Sparkline SVG ── */
function Sparkline({ data, color = '#1A47E5' }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const w = 80, h = 32
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Donut chart ── */
function DonutChart({ sold, capacity }) {
  const pct = sold / capacity
  const r = 20, cx = 26, cy = 26
  const circ = 2 * Math.PI * r
  const dash = pct * circ
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" aria-hidden="true">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e8e6e0" strokeWidth="5" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1A47E5" strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`}
        strokeDashoffset={circ / 4}
        strokeLinecap="round" />
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="10" fontWeight="600" fill="#0a0a0a">
        {Math.round(pct * 100)}%
      </text>
    </svg>
  )
}

/* ── Revenue Bar Chart ── */
function RevenueChart() {
  const weeks = [
    { label: 'W1', val: 210000 },
    { label: 'W2', val: 380000 },
    { label: 'W3', val: 155000 },
    { label: 'W4', val: 520000 },
    { label: 'W5', val: 290000 },
    { label: 'W6', val: 640000 },
    { label: 'W7', val: 410000 },
    { label: 'W8', val: 725000 },
  ]
  const max = Math.max(...weeks.map(w => w.val))
  return (
    <div className="cq-revenue-chart">
      {weeks.map((w, i) => {
        const pct = (w.val / max) * 100
        return (
          <div key={w.label} className="cq-bar-col">
            <div className="cq-bar-tooltip">{fmt(w.val)}</div>
            <div className="cq-bar-track">
              <div
                className="cq-bar-fill"
                style={{ height: `${pct}%`, animationDelay: `${i * 60}ms` }}
              />
            </div>
            <div className="cq-bar-label">{w.label}</div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Withdrawal Modal ── */
function WithdrawalModal({ available, onClose }) {
  const [amount, setAmount] = useState('')
  const [bank, setBank] = useState('GTBank — 0123456789')
  const [step, setStep] = useState(1)

  const fee = amount ? Math.round(Number(amount.replace(/,/g, '')) * 0.015) : 0
  const net = amount ? Number(amount.replace(/,/g, '')) - fee : 0

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setAmount(raw ? Number(raw).toLocaleString() : '')
  }

  return (
    <div className="cq-modal-overlay" onClick={onClose}>
      <div className="cq-modal" onClick={e => e.stopPropagation()}>
        <div className="cq-modal-header">
          <div>
            <div className="cq-modal-title">Withdraw funds</div>
            <div className="cq-modal-sub">Available: <b>{fmt(available)}</b></div>
          </div>
          <button className="cq-modal-close" onClick={onClose} aria-label="Close">
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </div>

        {step === 1 && (
          <div className="cq-modal-body">
            <div className="cq-wd-field">
              <label>Amount to withdraw</label>
              <div className="cq-wd-amount-wrap">
                <span className="cq-wd-currency">₦</span>
                <input
                  type="text"
                  placeholder="0"
                  value={amount}
                  onChange={handleAmountChange}
                  className="cq-wd-amount-input"
                  autoFocus
                />
              </div>
              <div className="cq-wd-quick">
                {[100000, 250000, 500000].map(v => (
                  <button key={v} className="cq-wd-quick-btn"
                    onClick={() => setAmount(v.toLocaleString())}>
                    {fmt(v)}
                  </button>
                ))}
                <button className="cq-wd-quick-btn"
                  onClick={() => setAmount(available.toLocaleString())}>
                  Max
                </button>
              </div>
            </div>

            <div className="cq-wd-field">
              <label>Destination account</label>
              <select value={bank} onChange={e => setBank(e.target.value)} className="cq-wd-select">
                <option>GTBank — 0123456789</option>
                <option>Access Bank — 0987654321</option>
              </select>
              <button className="cq-wd-add-bank">
                <i className="ti ti-plus" aria-hidden="true" /> Add bank account
              </button>
            </div>

            {amount && (
              <div className="cq-wd-summary">
                <div className="cq-wd-summary-row">
                  <span>Amount</span><span>{fmt(Number(amount.replace(/,/g, '')))} </span>
                </div>
                <div className="cq-wd-summary-row">
                  <span>Processing fee (1.5%)</span><span className="muted">− {fmt(fee)}</span>
                </div>
                <div className="cq-wd-summary-row total">
                  <span>You'll receive</span><span>{fmt(net)}</span>
                </div>
                <div className="cq-wd-eta">
                  <i className="ti ti-clock" aria-hidden="true" /> Arrives in 24–48 hours
                </div>
              </div>
            )}

            <button
              className="btn-wd-primary"
              disabled={!amount || Number(amount.replace(/,/g, '')) < 1000}
              onClick={() => setStep(2)}
            >
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="cq-modal-body">
            <div className="cq-wd-confirm">
              <div className="cq-wd-confirm-amount">{fmt(net)}</div>
              <div className="cq-wd-confirm-label">will be sent to</div>
              <div className="cq-wd-confirm-bank">
                <i className="ti ti-building-bank" aria-hidden="true" />
                {bank}
              </div>
              <p className="cq-wd-confirm-note">
                You'll receive a confirmation SMS and email once the transfer is processed. Funds typically arrive within 24–48 hours.
              </p>
            </div>
            <div className="cq-wd-confirm-btns">
              <button className="btn-wd-outline" onClick={() => setStep(1)}>← Back</button>
              <button className="btn-wd-primary" onClick={() => setStep(3)}>Confirm withdrawal</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="cq-modal-body cq-wd-success">
            <div className="cq-wd-success-icon">
              <i className="ti ti-circle-check" aria-hidden="true" />
            </div>
            <div className="cq-wd-success-title">Withdrawal initiated</div>
            <p>{fmt(net)} is on its way to {bank}. You'll hear from us within 48 hours.</p>
            <button className="btn-wd-primary" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   Dashboard
══════════════════════════════════════ */
function Dashboard() {
  const [activeNav, setActiveNav] = useState('overview')
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const availableBalance = 945000
  const pendingBalance = 360000

  return (
    <div className="cq-db-wrap">

      {/* ── Sidebar ── */}
      <aside className={`cq-db-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="cq-db-sidebar-top">
          <Link to="/" className="cq-db-logo">
            <CheqinLogoMark size={26} />
            <span className="cq-db-brand">cheqin</span>
          </Link>
          <button className="cq-db-close-sidebar" onClick={() => setSidebarOpen(false)}>
            <i className="ti ti-x" aria-hidden="true" />
          </button>
        </div>

        <div className="cq-db-biz-badge">
          <div className="cq-db-biz-avatar">AO</div>
          <div>
            <div className="cq-db-biz-name">Afrobeats Live</div>
            <div className="cq-db-biz-role">Business account</div>
          </div>
        </div>

        <nav className="cq-db-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`cq-db-nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => { setActiveNav(item.id); setSidebarOpen(false) }}
            >
              <i className={`ti ${item.icon}`} aria-hidden="true" />
              {item.label}
              {item.id === 'checkins' && <span className="cq-db-nav-badge">3</span>}
            </button>
          ))}
        </nav>

        <div className="cq-db-sidebar-bottom">
          <div className="cq-db-balance-card">
            <div className="cq-db-balance-label">Available balance</div>
            <div className="cq-db-balance-amount">{fmt(availableBalance)}</div>
            <div className="cq-db-balance-pending">+ {fmt(pendingBalance)} pending</div>
            <button className="btn-withdraw" onClick={() => setShowWithdraw(true)}>
              <i className="ti ti-arrow-up-right" aria-hidden="true" />
              Withdraw
            </button>
          </div>
          <button className="cq-db-logout">
            <i className="ti ti-logout" aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="cq-db-main">

        {/* Topbar */}
        <header className="cq-db-topbar">
          <button className="cq-db-hamburger" onClick={() => setSidebarOpen(true)}>
            <i className="ti ti-menu-2" aria-hidden="true" />
          </button>
          <div className="cq-db-topbar-title">
            {navItems.find(n => n.id === activeNav)?.label}
          </div>
          <div className="cq-db-topbar-right">
            <button className="cq-db-icon-btn" aria-label="Notifications">
              <i className="ti ti-bell" aria-hidden="true" />
              <span className="cq-db-notif-dot" />
            </button>
            <Link to="/events/new" className="btn-new-event">
              <i className="ti ti-plus" aria-hidden="true" />
              New event
            </Link>
          </div>
        </header>

        <div className="cq-db-content" style={{ backgroundColor: '#f5f4f0', fontSize: '16px' }} >

          {/* ══ OVERVIEW TAB ══ */}
          {activeNav === 'overview' && (
            <>
              <div className="cq-db-greeting">
                <div>
                  <h1>Good afternoon, Amara 👋</h1>
                  <p>Here's how your events are performing this month.</p>
                </div>
                <div className="cq-db-date">Sun, Jun 1 · 2026</div>
              </div>

              {/* KPI cards */}
              <div className="cq-kpi-grid">
                {[
                  { label: 'Total revenue', value: '₦1,945,000', sub: '+₦340k this week', spark: [120,180,140,210,175,240,195,280], color: '#1A47E5', up: true },
                  { label: 'Tickets sold', value: '200', sub: '47 this week', spark: [18,22,15,28,20,35,25,37], color: '#16a34a', up: true },
                  { label: 'Active events', value: '2', sub: '1 ending soon', spark: [1,2,2,2,3,3,2,2], color: '#d97706', up: false },
                  { label: 'Check-in rate', value: '82%', sub: 'Across all events', spark: [65,72,78,74,80,78,82,82], color: '#7c3aed', up: true },
                ].map((kpi) => (
                  <div key={kpi.label} className="cq-kpi-card">
                    <div className="cq-kpi-top">
                      <div className="cq-kpi-label">{kpi.label}</div>
                      <Sparkline data={kpi.spark} color={kpi.color} />
                    </div>
                    <div className="cq-kpi-value">{kpi.value}</div>
                    <div className={`cq-kpi-sub ${kpi.up ? 'up' : ''}`}>{kpi.sub}</div>
                  </div>
                ))}
              </div>

              {/* Revenue chart + Recent transactions */}
              <div className="cq-db-two-col">
                <div className="cq-db-card cq-revenue-card">
                  <div className="cq-card-header">
                    <div className="cq-card-title">Revenue — last 8 weeks</div>
                    <span className="cq-card-tag">₦3.3M total</span>
                  </div>
                  <RevenueChart />
                </div>

                <div className="cq-db-card">
                  <div className="cq-card-header">
                    <div className="cq-card-title">Recent transactions</div>
                    <button className="cq-card-link" onClick={() => setActiveNav('payouts')}>View all</button>
                  </div>
                  <div className="cq-txn-list">
                    {recentTransactions.map(txn => (
                      <div key={txn.id} className="cq-txn-row">
                        <div className={`cq-txn-icon ${txn.type}`}>
                          <i className={`ti ${txn.type === 'withdrawal' ? 'ti-arrow-up-right' : 'ti-ticket'}`} aria-hidden="true" />
                        </div>
                        <div className="cq-txn-info">
                          <div className="cq-txn-name">{txn.name}</div>
                          <div className="cq-txn-event">{txn.event}</div>
                        </div>
                        <div className="cq-txn-right">
                          <div className={`cq-txn-amount ${txn.amount < 0 ? 'neg' : txn.amount === 0 ? 'zero' : 'pos'}`}>
                            {txn.amount === 0 ? 'Free' : (txn.amount < 0 ? '−' : '+') + fmt(txn.amount)}
                          </div>
                          <div className="cq-txn-date">{txn.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Events summary */}
              <div className="cq-db-card">
                <div className="cq-card-header">
                  <div className="cq-card-title">Your events</div>
                  <button className="cq-card-link" onClick={() => setActiveNav('events')}>Manage all</button>
                </div>
                <div className="cq-events-table">
                  <div className="cq-events-thead">
                    <span>Event</span>
                    <span>Date</span>
                    <span>Tickets</span>
                    <span>Revenue</span>
                    <span>Status</span>
                  </div>
                  {events.map(ev => (
                    <div key={ev.id} className="cq-events-row">
                      <div className="cq-ev-name-cell">
                        <div className={`cq-ev-dot cq-ev-dot--${ev.color}`} />
                        <span>{ev.name}</span>
                      </div>
                      <span className="cq-ev-date">{ev.date}</span>
                      <div className="cq-ev-tickets-cell">
                        <DonutChart sold={ev.sold} capacity={ev.capacity} />
                        <span>{ev.sold}/{ev.capacity}</span>
                      </div>
                      <span className="cq-ev-revenue">{ev.revenue === 0 ? '—' : fmt(ev.revenue)}</span>
                      <span className={`cq-ev-status cq-ev-status--${ev.status}`}>
                        {ev.status === 'on-sale' ? 'On sale' : ev.status === 'sold-out' ? 'Sold out' : 'Ended'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ══ EVENTS TAB ══ */}
          {activeNav === 'events' && (
            <>
              <div className="cq-tab-header">
                <h2>My events</h2>
                <Link to="/events/new" className="btn-new-event">
                  <i className="ti ti-plus" aria-hidden="true" /> New event
                </Link>
              </div>
              <div className="cq-events-cards">
                {events.map(ev => (
                  <div key={ev.id} className="cq-ev-manage-card">
                    <div className={`cq-ev-manage-thumb cq-ev-manage-thumb--${ev.color}`}>
                      <span className={`cq-ev-status cq-ev-status--${ev.status}`}>
                        {ev.status === 'on-sale' ? 'On sale' : ev.status === 'sold-out' ? 'Sold out' : 'Ended'}
                      </span>
                    </div>
                    <div className="cq-ev-manage-body">
                      <div className="cq-ev-manage-name">{ev.name}</div>
                      <div className="cq-ev-manage-meta">
                        <span><i className="ti ti-calendar" aria-hidden="true" />{ev.date}</span>
                        <span><i className="ti ti-map-pin" aria-hidden="true" />{ev.location}</span>
                      </div>
                      <div className="cq-ev-manage-stats">
                        <div>
                          <div className="cq-ev-stat-val">{ev.sold}/{ev.capacity}</div>
                          <div className="cq-ev-stat-label">Tickets sold</div>
                        </div>
                        <div>
                          <div className="cq-ev-stat-val">{ev.revenue === 0 ? '₦0' : fmt(ev.revenue)}</div>
                          <div className="cq-ev-stat-label">Revenue</div>
                        </div>
                        <div>
                          <div className="cq-ev-stat-val">{Math.round((ev.sold / ev.capacity) * 100)}%</div>
                          <div className="cq-ev-stat-label">Sold out</div>
                        </div>
                      </div>
                      <div className="cq-ev-manage-actions">
                        <button className="btn-ev-action">
                          <i className="ti ti-edit" aria-hidden="true" /> Edit
                        </button>
                        <button className="btn-ev-action">
                          <i className="ti ti-qrcode" aria-hidden="true" /> Check-ins
                        </button>
                        <button className="btn-ev-action">
                          <i className="ti ti-chart-bar" aria-hidden="true" /> Analytics
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ══ PAYOUTS TAB ══ */}
          {activeNav === 'payouts' && (
            <>
              <div className="cq-tab-header">
                <h2>Payouts</h2>
              </div>

              {/* Balance overview */}
              <div className="cq-payout-hero">
                <div className="cq-payout-balance-main">
                  <div className="cq-payout-label">Available to withdraw</div>
                  <div className="cq-payout-big">{fmt(availableBalance)}</div>
                  <div className="cq-payout-pending">
                    <i className="ti ti-clock" aria-hidden="true" />
                    {fmt(pendingBalance)} pending clearance (2–3 days)
                  </div>
                  <button className="btn-withdraw-lg" onClick={() => setShowWithdraw(true)}>
                    <i className="ti ti-arrow-up-right" aria-hidden="true" />
                    Withdraw funds
                  </button>
                </div>
                <div className="cq-payout-stats-side">
                  {[
                    { label: 'Total earned', val: fmt(3330000) },
                    { label: 'Total withdrawn', val: fmt(1095000) },
                    { label: 'This month', val: fmt(725000) },
                    { label: 'Withdrawals made', val: '4' },
                  ].map(s => (
                    <div key={s.label} className="cq-payout-stat">
                      <div className="cq-payout-stat-val">{s.val}</div>
                      <div className="cq-payout-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bank accounts */}
              <div className="cq-db-card" style={{ marginBottom: '1.5rem' }}>
                <div className="cq-card-header">
                  <div className="cq-card-title">Bank accounts</div>
                  <button className="cq-card-link">
                    <i className="ti ti-plus" aria-hidden="true" /> Add account
                  </button>
                </div>
                <div className="cq-bank-list">
                  {[
                    { bank: 'GTBank', name: 'Amara Osei', number: '•••• •••• 6789', primary: true },
                    { bank: 'Access Bank', name: 'Amara Osei', number: '•••• •••• 4412', primary: false },
                  ].map(acc => (
                    <div key={acc.number} className="cq-bank-row">
                      <div className="cq-bank-icon">
                        <i className="ti ti-building-bank" aria-hidden="true" />
                      </div>
                      <div className="cq-bank-info">
                        <div className="cq-bank-name">{acc.bank} — {acc.number}</div>
                        <div className="cq-bank-holder">{acc.name}</div>
                      </div>
                      <div className="cq-bank-right">
                        {acc.primary && <span className="cq-bank-primary-badge">Primary</span>}
                        {!acc.primary && <button className="cq-card-link">Set primary</button>}
                        <button className="cq-bank-remove" aria-label="Remove account">
                          <i className="ti ti-trash" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payout history */}
              <div className="cq-db-card">
                <div className="cq-card-header">
                  <div className="cq-card-title">Withdrawal history</div>
                  <span className="cq-card-tag">{payoutHistory.length} withdrawals</span>
                </div>
                <div className="cq-payout-table">
                  <div className="cq-payout-thead">
                    <span>Reference</span>
                    <span>Amount</span>
                    <span>Bank</span>
                    <span>Date</span>
                    <span>Status</span>
                  </div>
                  {payoutHistory.map(p => (
                    <div key={p.id} className="cq-payout-row">
                      <span className="cq-payout-ref">{p.id}</span>
                      <span className="cq-payout-amt">{fmt(p.amount)}</span>
                      <span className="cq-payout-bank">{p.bank} {p.account}</span>
                      <span className="cq-payout-date">{p.date}</span>
                      <span className="cq-ev-status cq-ev-status--on-sale">Completed</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fee note */}
              <div className="cq-payout-note">
                <i className="ti ti-info-circle" aria-hidden="true" />
                A 1.5% processing fee applies to all withdrawals. Funds arrive within 24–48 hours on business days.
              </div>
            </>
          )}

          {/* ══ CHECK-INS TAB ══ */}
          {activeNav === 'checkins' && (
            <>
              <div className="cq-tab-header">
                <h2>Check-ins</h2>
                <button className="btn-new-event">
                  <i className="ti ti-qrcode" aria-hidden="true" /> Scan QR
                </button>
              </div>
              <div className="cq-kpi-grid" style={{ marginBottom: '1.5rem' }}>
                {[
                  { label: 'Total checked in', value: '141', sub: 'Across all events' },
                  { label: 'Check-in rate', value: '82%', sub: 'Of tickets sold' },
                  { label: 'Today', value: '0', sub: 'No active events today' },
                  { label: 'Pending', value: '59', sub: 'Not yet checked in' },
                ].map(k => (
                  <div key={k.label} className="cq-kpi-card">
                    <div className="cq-kpi-label">{k.label}</div>
                    <div className="cq-kpi-value">{k.value}</div>
                    <div className="cq-kpi-sub">{k.sub}</div>
                  </div>
                ))}
              </div>
              <div className="cq-db-card">
                <div className="cq-card-header">
                  <div className="cq-card-title">Attendee check-in list</div>
                  <input className="cq-search-input" type="search" placeholder="Search attendee…" />
                </div>
                <div className="cq-checkin-list">
                  {[
                    { name: 'Amara Osei', event: 'Afrobeats Live', ticket: 'TXN-0091', time: '7:42 PM', checked: true },
                    { name: 'Kelechi Eze', event: 'Lagos Cultural Night', ticket: 'TXN-0090', time: '—', checked: false },
                    { name: 'Fatima Bello', event: 'Afrobeats Live', ticket: 'TXN-0089', time: '8:01 PM', checked: true },
                    { name: 'Tunde Adeyemi', event: 'Supper Club No. 7', ticket: 'TXN-0088', time: '7:30 PM', checked: true },
                    { name: 'Ngozi Okeke', event: 'OUTSYD Run', ticket: 'TXN-0086', time: '9:00 AM', checked: true },
                  ].map(a => (
                    <div key={a.ticket} className="cq-checkin-row">
                      <div className="cq-checkin-avatar">{a.name.split(' ').map(n => n[0]).join('')}</div>
                      <div className="cq-checkin-info">
                        <div className="cq-checkin-name">{a.name}</div>
                        <div className="cq-checkin-event">{a.event} · {a.ticket}</div>
                      </div>
                      <div className="cq-checkin-time">{a.time}</div>
                      <span className={`cq-checkin-badge ${a.checked ? 'in' : 'out'}`}>
                        {a.checked ? 'Checked in' : 'Not in'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ══ AUDIENCE TAB ══ */}
          {activeNav === 'audience' && (
            <>
              <div className="cq-tab-header"><h2>Audience</h2></div>
              <div className="cq-kpi-grid" style={{ marginBottom: '1.5rem' }}>
                {[
                  { label: 'Total attendees', value: '200' },
                  { label: 'Repeat attendees', value: '34' },
                  { label: 'Avg. ticket value', value: '₦9,725' },
                  { label: 'Cities reached', value: '3' },
                ].map(k => (
                  <div key={k.label} className="cq-kpi-card">
                    <div className="cq-kpi-label">{k.label}</div>
                    <div className="cq-kpi-value">{k.value}</div>
                  </div>
                ))}
              </div>
              <div className="cq-db-card">
                <div className="cq-card-header">
                  <div className="cq-card-title">Top attendees</div>
                </div>
                <div className="cq-checkin-list">
                  {[
                    { name: 'Amara Osei', events: 3, spent: 45000 },
                    { name: 'Tunde Adeyemi', events: 2, spent: 40000 },
                    { name: 'Fatima Bello', events: 2, spent: 30000 },
                    { name: 'Kelechi Eze', events: 1, spent: 5000 },
                  ].map(a => (
                    <div key={a.name} className="cq-checkin-row">
                      <div className="cq-checkin-avatar">{a.name.split(' ').map(n => n[0]).join('')}</div>
                      <div className="cq-checkin-info">
                        <div className="cq-checkin-name">{a.name}</div>
                        <div className="cq-checkin-event">{a.events} event{a.events > 1 ? 's' : ''} attended</div>
                      </div>
                      <div className="cq-txn-amount pos">{fmt(a.spent)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ══ SETTINGS TAB ══ */}
          {activeNav === 'settings' && (
            <>
              <div className="cq-tab-header"><h2>Settings</h2></div>
              <div className="cq-db-card" style={{ marginBottom: '1rem' }}>
                <div className="cq-card-title" style={{ marginBottom: '1.25rem' }}>Business profile</div>
                <div className="cq-settings-grid">
                  {[
                    { label: 'Business name', val: 'Afrobeats Live Events' },
                    { label: 'Contact email', val: 'hello@afrobeatslive.com' },
                    { label: 'Phone', val: '+234 801 234 5678' },
                    { label: 'City', val: 'Lagos' },
                  ].map(f => (
                    <div key={f.label} className="cq-settings-field">
                      <label>{f.label}</label>
                      <input type="text" defaultValue={f.val} />
                    </div>
                  ))}
                </div>
                <button className="btn-settings-save">Save changes</button>
              </div>
              <div className="cq-db-card">
                <div className="cq-card-title" style={{ marginBottom: '1.25rem' }}>Notifications</div>
                {[
                  { label: 'New ticket sale', sub: 'Get notified when someone buys a ticket' },
                  { label: 'Check-in alerts', sub: 'Real-time alerts as attendees scan in' },
                  { label: 'Payout confirmed', sub: 'When a withdrawal is processed' },
                  { label: 'Event reminders', sub: '24 hours before your event goes live' },
                ].map(n => (
                  <div key={n.label} className="cq-notif-row">
                    <div>
                      <div className="cq-notif-label">{n.label}</div>
                      <div className="cq-notif-sub">{n.sub}</div>
                    </div>
                    <label className="cq-toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="cq-toggle-track" />
                    </label>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>

      {/* ── Withdrawal modal ── */}
      {showWithdraw && (
        <WithdrawalModal
          available={availableBalance}
          onClose={() => setShowWithdraw(false)}
        />
      )}

      {/* Sidebar overlay */}
      {sidebarOpen && (
        <div className="cq-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

    </div>
  )
}

export default Dashboard