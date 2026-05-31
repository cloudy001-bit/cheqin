import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Checkout.css'

/* ── Mock event data (replace with real props/API) ── */
const EVENT = {
  id: 1,
  name: 'Afrobeats Live — Garden Edition',
  date: 'Saturday, June 21, 2026',
  time: '7:00 PM',
  venue: 'Harbour Point',
  city: 'Victoria Island, Lagos',
  color: 'linear-gradient(135deg, #1A47E5 0%, #0A1F8F 100%)',
  organizer: 'Afrobeats Live Events',
  tickets: [
    { id: 'gen',  name: 'General Admission', price: 15000, available: 26, desc: 'Access to main floor and all stages' },
    { id: 'vip',  name: 'VIP Experience',    price: 35000, available: 8,  desc: 'Dedicated lounge, welcome drink & merch bag' },
    { id: 'table',name: 'Table for 4',       price: 120000, available: 3, desc: 'Reserved table, bottle service, priority entry' },
  ]
}

const fmt = (n) => '₦' + Number(n).toLocaleString('en-NG')

/* ── QR Code SVG (simple placeholder pattern) ── */
function QRCode({ value, size = 120 }) {
  // Generate a deterministic-looking QR pattern from the value string
  const cells = 21
  const cell = size / cells
  const hash = [...value].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 0)
  const rng = (seed) => {
    let s = seed
    return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff }
  }
  const rand = rng(Math.abs(hash))
  const grid = Array.from({ length: cells }, (_, r) =>
    Array.from({ length: cells }, (_, c) => {
      // Always fill corners (finder patterns)
      if ((r < 7 && c < 7) || (r < 7 && c >= cells - 7) || (r >= cells - 7 && c < 7)) return true
      return rand() > 0.55
    })
  )
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="Ticket QR code">
      {grid.map((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <rect key={`${r}-${c}`} x={c * cell} y={r * cell}
              width={cell - 0.5} height={cell - 0.5} fill="currentColor" rx="0.5" />
          ) : null
        )
      )}
    </svg>
  )
}

/* ══ TICKET CARD (the beautiful ticket design) ══ */
export function TicketCard({ ticket, event, animate = false }) {
  return (
    <div className={`tkt-wrap ${animate ? 'tkt-animate' : ''}`}>
      <div className="tkt">
        {/* Left stub */}
        <div className="tkt-stub">
          <div className="tkt-stub-inner">
            <div className="tkt-stub-label">cheqin</div>
            <div className="tkt-stub-num">{ticket.id.slice(-6).toUpperCase()}</div>
            <div className="tkt-stub-admit">ADMIT ONE</div>
          </div>
          <div className="tkt-perforation" />
        </div>

        {/* Main body */}
        <div className="tkt-body">
          <div className="tkt-header" style={{ background: event.color }}>
            <div className="tkt-event-name">{event.name}</div>
            <div className="tkt-tier-badge">{ticket.tier}</div>
          </div>

          <div className="tkt-content">
            <div className="tkt-meta-grid">
              <div className="tkt-meta-item">
                <div className="tkt-meta-label">Date</div>
                <div className="tkt-meta-val">{event.date}</div>
              </div>
              <div className="tkt-meta-item">
                <div className="tkt-meta-label">Time</div>
                <div className="tkt-meta-val">{event.time}</div>
              </div>
              <div className="tkt-meta-item">
                <div className="tkt-meta-label">Venue</div>
                <div className="tkt-meta-val">{event.venue}</div>
              </div>
              <div className="tkt-meta-item">
                <div className="tkt-meta-label">City</div>
                <div className="tkt-meta-val">{event.city}</div>
              </div>
            </div>

            <div className="tkt-divider">
              <div className="tkt-notch tkt-notch--left" />
              <div className="tkt-dash-line" />
              <div className="tkt-notch tkt-notch--right" />
            </div>

            <div className="tkt-bottom">
              <div className="tkt-holder">
                <div className="tkt-holder-label">Ticket holder</div>
                <div className="tkt-holder-name">{ticket.holderName}</div>
                <div className="tkt-holder-email">{ticket.holderEmail}</div>
              </div>
              <div className="tkt-qr">
                <QRCode value={ticket.id} size={88} />
                <div className="tkt-qr-id">{ticket.id.slice(-8).toUpperCase()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══ CHECKOUT PAGE ══ */
export default function Checkout() {
  const navigate = useNavigate()
  const [quantities, setQuantities] = useState({ gen: 0, vip: 0, table: 0 })
  const [step, setStep] = useState('select') // select | details | payment | confirm
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [payMethod, setPayMethod] = useState('card')
  const [cardNum, setCardNum] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [processing, setProcessing] = useState(false)
  const [tickets, setTickets] = useState([])

  const selectedItems = EVENT.tickets.filter(t => quantities[t.id] > 0)
  const subtotal = EVENT.tickets.reduce((s, t) => s + t.price * (quantities[t.id] || 0), 0)
  const fee = Math.round(subtotal * 0.05)
  const total = subtotal + fee
  const totalQty = Object.values(quantities).reduce((a, b) => a + b, 0)

  const updateQty = (id, delta) => {
    const t = EVENT.tickets.find(t => t.id === id)
    setQuantities(q => ({
      ...q,
      [id]: Math.max(0, Math.min(t.available, (q[id] || 0) + delta))
    }))
  }

  const formatCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, '').slice(0, 4)
    return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d
  }

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => {
      // Generate tickets
      const generated = []
      EVENT.tickets.forEach(tier => {
        for (let i = 0; i < (quantities[tier.id] || 0); i++) {
          generated.push({
            id: 'CQN-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
            tier: tier.name,
            holderName: `${form.firstName} ${form.lastName}`,
            holderEmail: form.email,
          })
        }
      })
      setTickets(generated)
      setProcessing(false)
      setStep('confirm')
    }, 2200)
  }

  const canProceedSelect = totalQty > 0
  const canProceedDetails = form.firstName && form.lastName && form.email && form.phone
  const canProceedPayment = payMethod === 'transfer' ||
    (cardNum.replace(/\s/g, '').length === 16 && cardExpiry.length === 5 && cardCvv.length === 3)

  return (
    <div className="co-page">
      {/* ── Header ── */}
      <header className="co-header">
        <Link to="/" className="co-logo">
          <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
            <rect x="4" y="4" width="24" height="24" rx="2" stroke="#1A47E5" strokeWidth="3" fill="none" />
            <rect x="10" y="10" width="12" height="12" rx="1" stroke="#1A47E5" strokeWidth="2.5" fill="none" />
            <rect x="14" y="14" width="4" height="4" rx="0.5" fill="#1A47E5" />
            <path d="M28 16 L36 16 L36 36 L16 36 L16 28" stroke="#1A47E5" strokeWidth="3" strokeLinecap="square" fill="none" />
          </svg>
          <span className="co-logo-name">cheqin</span>
        </Link>
        <div className="co-header-secure">
          <i className="ti ti-lock" aria-hidden="true" /> Secure checkout
        </div>
      </header>

      {step !== 'confirm' && (
        <div className="co-layout">
          {/* ── Left: form area ── */}
          <div className="co-left">

            {/* Step pills */}
            <div className="co-steps">
              {['select', 'details', 'payment'].map((s, i) => {
                const labels = ['Tickets', 'Your info', 'Payment']
                const idx = ['select', 'details', 'payment'].indexOf(step)
                const done = i < idx
                const active = s === step
                return (
                  <div key={s} className={`co-step-pill ${active ? 'active' : ''} ${done ? 'done' : ''}`}>
                    <span className="co-step-pill-num">
                      {done ? <i className="ti ti-check" aria-hidden="true" /> : i + 1}
                    </span>
                    {labels[i]}
                  </div>
                )
              })}
            </div>

            {/* ── STEP: Select tickets ── */}
            {step === 'select' && (
              <div className="co-section">
                <div className="co-section-title">Choose your tickets</div>
                <div className="co-ticket-tiers">
                  {EVENT.tickets.map(t => (
                    <div key={t.id} className={`co-tier ${quantities[t.id] > 0 ? 'selected' : ''}`}>
                      <div className="co-tier-info">
                        <div className="co-tier-name">{t.name}</div>
                        <div className="co-tier-desc">{t.desc}</div>
                        <div className="co-tier-avail">{t.available} left</div>
                      </div>
                      <div className="co-tier-right">
                        <div className="co-tier-price">{fmt(t.price)}</div>
                        <div className="co-qty-ctrl">
                          <button className="co-qty-btn" onClick={() => updateQty(t.id, -1)}
                            disabled={!quantities[t.id]}>
                            <i className="ti ti-minus" aria-hidden="true" />
                          </button>
                          <span className="co-qty-num">{quantities[t.id] || 0}</span>
                          <button className="co-qty-btn" onClick={() => updateQty(t.id, 1)}
                            disabled={quantities[t.id] >= t.available}>
                            <i className="ti ti-plus" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="co-btn-primary" disabled={!canProceedSelect}
                  onClick={() => setStep('details')}>
                  Continue <i className="ti ti-arrow-right" aria-hidden="true" />
                </button>
              </div>
            )}

            {/* ── STEP: Details ── */}
            {step === 'details' && (
              <div className="co-section">
                <div className="co-section-title">Your details</div>
                <p className="co-section-sub">Your tickets will be sent to this email address.</p>
                <div className="co-form-row">
                  <div className="co-form-group">
                    <label className="co-label">First name</label>
                    <input className="co-input" type="text" placeholder="Amara"
                      value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
                  </div>
                  <div className="co-form-group">
                    <label className="co-label">Last name</label>
                    <input className="co-input" type="text" placeholder="Osei"
                      value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
                  </div>
                </div>
                <div className="co-form-group">
                  <label className="co-label">Email address</label>
                  <input className="co-input" type="email" placeholder="amara@example.com"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div className="co-form-group">
                  <label className="co-label">Phone number</label>
                  <input className="co-input" type="tel" placeholder="+234 801 234 5678"
                    value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </div>
                <div className="co-btn-row">
                  <button className="co-btn-back" onClick={() => setStep('select')}>
                    <i className="ti ti-arrow-left" aria-hidden="true" /> Back
                  </button>
                  <button className="co-btn-primary" disabled={!canProceedDetails}
                    onClick={() => setStep('payment')}>
                    Continue <i className="ti ti-arrow-right" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP: Payment ── */}
            {step === 'payment' && (
              <div className="co-section">
                <div className="co-section-title">Payment</div>

                <div className="co-pay-methods">
                  {[
                    { id: 'card', icon: 'ti-credit-card', label: 'Debit / Credit card' },
                    { id: 'transfer', icon: 'ti-building-bank', label: 'Bank transfer' },
                    { id: 'ussd', icon: 'ti-device-mobile', label: 'USSD' },
                  ].map(m => (
                    <label key={m.id} className={`co-pay-method ${payMethod === m.id ? 'active' : ''}`}>
                      <input type="radio" name="pay" value={m.id} checked={payMethod === m.id}
                        onChange={() => setPayMethod(m.id)} />
                      <i className={`ti ${m.icon}`} aria-hidden="true" />
                      {m.label}
                    </label>
                  ))}
                </div>

                {payMethod === 'card' && (
                  <div className="co-card-form">
                    <div className="co-form-group">
                      <label className="co-label">Card number</label>
                      <div className="co-card-input-wrap">
                        <input className="co-input" type="text" placeholder="0000 0000 0000 0000"
                          value={cardNum} onChange={e => setCardNum(formatCard(e.target.value))}
                          maxLength={19} />
                        <div className="co-card-icons">
                          <span className="co-card-icon-visa">VISA</span>
                          <span className="co-card-icon-mc">MC</span>
                        </div>
                      </div>
                    </div>
                    <div className="co-form-row">
                      <div className="co-form-group">
                        <label className="co-label">Expiry</label>
                        <input className="co-input" type="text" placeholder="MM/YY"
                          value={cardExpiry} onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                          maxLength={5} />
                      </div>
                      <div className="co-form-group">
                        <label className="co-label">CVV</label>
                        <input className="co-input" type="password" placeholder="•••"
                          value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                          maxLength={3} />
                      </div>
                    </div>
                  </div>
                )}

                {payMethod === 'transfer' && (
                  <div className="co-transfer-info">
                    <div className="co-transfer-row">
                      <span>Bank</span><strong>GTBank</strong>
                    </div>
                    <div className="co-transfer-row">
                      <span>Account number</span>
                      <strong className="co-transfer-acct">0123456789
                        <button className="co-copy-btn" onClick={() => navigator.clipboard?.writeText('0123456789')}>
                          <i className="ti ti-copy" aria-hidden="true" />
                        </button>
                      </strong>
                    </div>
                    <div className="co-transfer-row">
                      <span>Account name</span><strong>Cheqin Payments Ltd</strong>
                    </div>
                    <div className="co-transfer-row total">
                      <span>Amount</span><strong>{fmt(total)}</strong>
                    </div>
                    <p className="co-transfer-note">
                      <i className="ti ti-info-circle" aria-hidden="true" />
                      Transfer the exact amount. Your tickets will be issued within 5 minutes of confirmation.
                    </p>
                  </div>
                )}

                {payMethod === 'ussd' && (
                  <div className="co-ussd-info">
                    <div className="co-ussd-code">*737*{total}*1234#</div>
                    <p>Dial this code on your mobile phone to complete payment via GTBank USSD.</p>
                  </div>
                )}

                <div className="co-btn-row">
                  <button className="co-btn-back" onClick={() => setStep('details')}>
                    <i className="ti ti-arrow-left" aria-hidden="true" /> Back
                  </button>
                  <button className="co-btn-pay" disabled={!canProceedPayment || processing}
                    onClick={handlePay}>
                    {processing ? (
                      <><span className="co-spinner" /> Processing…</>
                    ) : (
                      <><i className="ti ti-lock" aria-hidden="true" /> Pay {fmt(total)}</>
                    )}
                  </button>
                </div>

                <div className="co-secure-note">
                  <i className="ti ti-shield-check" aria-hidden="true" />
                  Payments are encrypted and processed securely
                </div>
              </div>
            )}
          </div>

          {/* ── Right: order summary ── */}
          <div className="co-right">
            <div className="co-summary-card">
              <div className="co-event-thumb" style={{ background: EVENT.color }}>
                <div className="co-event-thumb-name">{EVENT.name}</div>
              </div>
              <div className="co-summary-body">
                <div className="co-summary-meta">
                  <div className="co-summary-meta-row">
                    <i className="ti ti-calendar" aria-hidden="true" />
                    {EVENT.date} · {EVENT.time}
                  </div>
                  <div className="co-summary-meta-row">
                    <i className="ti ti-map-pin" aria-hidden="true" />
                    {EVENT.venue}, {EVENT.city}
                  </div>
                </div>

                {selectedItems.length > 0 && (
                  <>
                    <div className="co-summary-divider" />
                    <div className="co-summary-items">
                      {selectedItems.map(t => (
                        <div key={t.id} className="co-summary-item">
                          <span>{quantities[t.id]}× {t.name}</span>
                          <span>{fmt(t.price * quantities[t.id])}</span>
                        </div>
                      ))}
                    </div>
                    <div className="co-summary-divider" />
                    <div className="co-summary-totals">
                      <div className="co-summary-row">
                        <span>Subtotal</span><span>{fmt(subtotal)}</span>
                      </div>
                      <div className="co-summary-row muted">
                        <span>Service fee (5%)</span><span>{fmt(fee)}</span>
                      </div>
                      <div className="co-summary-row total">
                        <span>Total</span><span>{fmt(total)}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ CONFIRMATION + TICKETS ══ */}
      {step === 'confirm' && (
        <div className="co-confirm-page">
          <div className="co-confirm-hero">
            <div className="co-confirm-icon">
              <i className="ti ti-circle-check" aria-hidden="true" />
            </div>
            <h1 className="co-confirm-title">You're going! 🎉</h1>
            <p className="co-confirm-sub">
              Your tickets have been sent to <strong>{form.email}</strong>.<br />
              Show your QR code at the door.
            </p>
          </div>

          <div className="co-tickets-section">
            <div className="co-tickets-label">Your ticket{tickets.length > 1 ? 's' : ''}</div>
            <div className="co-tickets-grid">
              {tickets.map((tkt, i) => (
                <TicketCard
                  key={tkt.id}
                  ticket={tkt}
                  event={EVENT}
                  animate={true}
                />
              ))}
            </div>
          </div>

          <div className="co-confirm-actions">
            <button className="co-btn-dl">
              <i className="ti ti-download" aria-hidden="true" /> Download tickets
            </button>
            <Link to="/" className="co-btn-home">Back to home</Link>
          </div>
        </div>
      )}
    </div>
  )
}