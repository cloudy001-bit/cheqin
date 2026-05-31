import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/NewEvent.css'

const CheqinLogoMark = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="24" height="24" rx="2" stroke="#1A47E5" strokeWidth="3" fill="none" />
    <rect x="10" y="10" width="12" height="12" rx="1" stroke="#1A47E5" strokeWidth="2.5" fill="none" />
    <rect x="14" y="14" width="4" height="4" rx="0.5" fill="#1A47E5" />
    <path d="M28 16 L36 16 L36 36 L16 36 L16 28" stroke="#1A47E5" strokeWidth="3" strokeLinecap="square" fill="none" />
  </svg>
)

const STEPS = ['Basics', 'Details', 'Tickets', 'Publish']

const CATEGORIES = ['Music', 'Arts & Culture', 'Food & Drink', 'Sports & Fitness', 'Business', 'Tech', 'Comedy', 'Community', 'Fashion', 'Film']

const COLORS = [
  { id: 'blue',   label: 'Ocean',   style: 'linear-gradient(135deg, #1A47E5 0%, #0A1F8F 100%)' },
  { id: 'green',  label: 'Forest',  style: 'linear-gradient(135deg, #0d2e0d 0%, #1a5c1a 100%)' },
  { id: 'purple', label: 'Dusk',    style: 'linear-gradient(135deg, #1a1a2e 0%, #4a1a7a 100%)' },
  { id: 'red',    label: 'Ember',   style: 'linear-gradient(135deg, #2a0a0a 0%, #8f1a1a 100%)' },
  { id: 'gold',   label: 'Amber',   style: 'linear-gradient(135deg, #2a1f00 0%, #7a5500 100%)' },
  { id: 'teal',   label: 'Lagoon',  style: 'linear-gradient(135deg, #002a2a 0%, #005c5c 100%)' },
]

function StepIndicator({ current }) {
  return (
    <div className="ne-steps">
      {STEPS.map((s, i) => (
        <div key={s} className={`ne-step ${i === current ? 'active' : ''} ${i < current ? 'done' : ''}`}>
          <div className="ne-step-dot">
            {i < current ? <i className="ti ti-check" aria-hidden="true" /> : i + 1}
          </div>
          <span className="ne-step-label">{s}</span>
          {i < STEPS.length - 1 && <div className="ne-step-line" />}
        </div>
      ))}
    </div>
  )
}

/* ── Step 1 — Basics ── */
function StepBasics({ data, onChange }) {
  return (
    <div className="ne-form-section">
      <div className="ne-form-group">
        <label className="ne-label">Event name <span className="ne-required">*</span></label>
        <input
          className="ne-input"
          type="text"
          placeholder="e.g. Afrobeats Live — Garden Edition"
          value={data.name}
          onChange={e => onChange('name', e.target.value)}
          maxLength={80}
        />
        <div className="ne-hint">{data.name.length}/80</div>
      </div>

      <div className="ne-form-row">
        <div className="ne-form-group">
          <label className="ne-label">Category <span className="ne-required">*</span></label>
          <div className="ne-select-wrap">
            <select
              className="ne-select"
              value={data.category}
              onChange={e => onChange('category', e.target.value)}
            >
              <option value="">Select category</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <i className="ti ti-chevron-down ne-select-icon" aria-hidden="true" />
          </div>
        </div>

        <div className="ne-form-group">
          <label className="ne-label">Event type</label>
          <div className="ne-radio-group">
            {['In-person', 'Online', 'Hybrid'].map(t => (
              <label key={t} className={`ne-radio-btn ${data.type === t ? 'active' : ''}`}>
                <input type="radio" name="type" value={t} checked={data.type === t}
                  onChange={e => onChange('type', e.target.value)} />
                {t}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="ne-form-group">
        <label className="ne-label">Description <span className="ne-required">*</span></label>
        <textarea
          className="ne-textarea"
          placeholder="Tell attendees what to expect — the vibe, lineup, dress code, anything that sets the scene…"
          value={data.description}
          onChange={e => onChange('description', e.target.value)}
          rows={5}
        />
      </div>

      <div className="ne-form-group">
        <label className="ne-label">Cover theme</label>
        <div className="ne-color-picker">
          {COLORS.map(c => (
            <button
              key={c.id}
              type="button"
              className={`ne-color-swatch ${data.color === c.id ? 'active' : ''}`}
              style={{ background: c.style }}
              onClick={() => onChange('color', c.id)}
              title={c.label}
            >
              {data.color === c.id && <i className="ti ti-check" aria-hidden="true" />}
            </button>
          ))}
        </div>
        <div className="ne-color-preview" style={{ background: COLORS.find(c => c.id === data.color)?.style }}>
          <span className="ne-color-preview-name">{data.name || 'Your event name'}</span>
          <span className="ne-color-preview-badge">Preview</span>
        </div>
      </div>
    </div>
  )
}

/* ── Step 2 — Details ── */
function StepDetails({ data, onChange }) {
  return (
    <div className="ne-form-section">
      <div className="ne-form-row">
        <div className="ne-form-group">
          <label className="ne-label">Start date <span className="ne-required">*</span></label>
          <input className="ne-input" type="date" value={data.startDate}
            onChange={e => onChange('startDate', e.target.value)} />
        </div>
        <div className="ne-form-group">
          <label className="ne-label">Start time <span className="ne-required">*</span></label>
          <input className="ne-input" type="time" value={data.startTime}
            onChange={e => onChange('startTime', e.target.value)} />
        </div>
      </div>

      <div className="ne-form-row">
        <div className="ne-form-group">
          <label className="ne-label">End date</label>
          <input className="ne-input" type="date" value={data.endDate}
            onChange={e => onChange('endDate', e.target.value)} />
        </div>
        <div className="ne-form-group">
          <label className="ne-label">End time</label>
          <input className="ne-input" type="time" value={data.endTime}
            onChange={e => onChange('endTime', e.target.value)} />
        </div>
      </div>

      {data.type !== 'Online' && (
        <>
          <div className="ne-form-group">
            <label className="ne-label">Venue name <span className="ne-required">*</span></label>
            <input className="ne-input" type="text" placeholder="e.g. Eko Hotel & Suites"
              value={data.venue} onChange={e => onChange('venue', e.target.value)} />
          </div>

          <div className="ne-form-row">
            <div className="ne-form-group">
              <label className="ne-label">Address</label>
              <input className="ne-input" type="text" placeholder="Street address"
                value={data.address} onChange={e => onChange('address', e.target.value)} />
            </div>
            <div className="ne-form-group">
              <label className="ne-label">City <span className="ne-required">*</span></label>
              <input className="ne-input" type="text" placeholder="e.g. Lagos"
                value={data.city} onChange={e => onChange('city', e.target.value)} />
            </div>
          </div>
        </>
      )}

      {data.type !== 'In-person' && (
        <div className="ne-form-group">
          <label className="ne-label">Online link</label>
          <input className="ne-input" type="url" placeholder="https://zoom.us/j/..."
            value={data.onlineLink} onChange={e => onChange('onlineLink', e.target.value)} />
          <div className="ne-hint">Shared with attendees after ticket purchase</div>
        </div>
      )}

      <div className="ne-form-group">
        <label className="ne-label">Capacity <span className="ne-required">*</span></label>
        <input className="ne-input" type="number" placeholder="e.g. 150" min={1}
          value={data.capacity} onChange={e => onChange('capacity', e.target.value)} />
      </div>

      <div className="ne-form-group">
        <label className="ne-label">Tags</label>
        <input className="ne-input" type="text" placeholder="afrobeats, lagos, live music (comma separated)"
          value={data.tags} onChange={e => onChange('tags', e.target.value)} />
      </div>
    </div>
  )
}

/* ── Step 3 — Tickets ── */
function StepTickets({ tickets, onAdd, onRemove, onChange }) {
  return (
    <div className="ne-form-section">
      <div className="ne-tickets-header">
        <div>
          <p className="ne-tickets-sub">Add one or more ticket tiers for your event.</p>
        </div>
        <button type="button" className="ne-add-ticket-btn" onClick={onAdd}>
          <i className="ti ti-plus" aria-hidden="true" /> Add tier
        </button>
      </div>

      {tickets.length === 0 && (
        <div className="ne-empty-tickets">
          <i className="ti ti-ticket" aria-hidden="true" />
          <p>No ticket tiers yet. Add one to get started.</p>
        </div>
      )}

      <div className="ne-ticket-list">
        {tickets.map((t, i) => (
          <div key={t.id} className="ne-ticket-card">
            <div className="ne-ticket-card-header">
              <span className="ne-ticket-num">Tier {i + 1}</span>
              <button type="button" className="ne-ticket-remove" onClick={() => onRemove(t.id)}
                aria-label="Remove tier">
                <i className="ti ti-trash" aria-hidden="true" />
              </button>
            </div>

            <div className="ne-form-row">
              <div className="ne-form-group">
                <label className="ne-label">Tier name</label>
                <input className="ne-input" type="text" placeholder="e.g. General, VIP, Early Bird"
                  value={t.name} onChange={e => onChange(t.id, 'name', e.target.value)} />
              </div>
              <div className="ne-form-group">
                <label className="ne-label">Ticket type</label>
                <div className="ne-select-wrap">
                  <select className="ne-select" value={t.ticketType}
                    onChange={e => onChange(t.id, 'ticketType', e.target.value)}>
                    <option value="paid">Paid</option>
                    <option value="free">Free</option>
                    <option value="donation">Donation</option>
                  </select>
                  <i className="ti ti-chevron-down ne-select-icon" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="ne-form-row">
              {t.ticketType === 'paid' && (
                <div className="ne-form-group">
                  <label className="ne-label">Price (₦)</label>
                  <div className="ne-price-wrap">
                    <span className="ne-price-symbol">₦</span>
                    <input className="ne-input ne-price-input" type="number" placeholder="0" min={0}
                      value={t.price} onChange={e => onChange(t.id, 'price', e.target.value)} />
                  </div>
                </div>
              )}
              <div className="ne-form-group">
                <label className="ne-label">Quantity available</label>
                <input className="ne-input" type="number" placeholder="e.g. 50" min={1}
                  value={t.quantity} onChange={e => onChange(t.id, 'quantity', e.target.value)} />
              </div>
            </div>

            <div className="ne-form-group">
              <label className="ne-label">Description <span className="ne-hint-inline">(optional)</span></label>
              <input className="ne-input" type="text"
                placeholder="e.g. Includes backstage access and welcome drink"
                value={t.description} onChange={e => onChange(t.id, 'description', e.target.value)} />
            </div>

            {t.ticketType === 'paid' && t.price && (
              <div className="ne-ticket-fee-note">
                <i className="ti ti-info-circle" aria-hidden="true" />
                Attendee pays ₦{Number(t.price).toLocaleString()} · You receive ₦{Math.round(t.price * 0.95).toLocaleString()} after 5% platform fee
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Step 4 — Publish ── */
function StepPublish({ data, tickets }) {
  const color = COLORS.find(c => c.id === data.color)
  const totalCapacity = tickets.reduce((s, t) => s + (Number(t.quantity) || 0), 0)

  return (
    <div className="ne-form-section">
      <div className="ne-publish-preview">
        <div className="ne-preview-thumb" style={{ background: color?.style }}>
          <span className="ne-preview-name">{data.name || 'Untitled Event'}</span>
        </div>
        <div className="ne-preview-body">
          <div className="ne-preview-row">
            <i className="ti ti-calendar" aria-hidden="true" />
            <span>{data.startDate ? new Date(data.startDate).toDateString() : '—'}{data.startTime ? ` · ${data.startTime}` : ''}</span>
          </div>
          {data.venue && (
            <div className="ne-preview-row">
              <i className="ti ti-map-pin" aria-hidden="true" />
              <span>{data.venue}{data.city ? `, ${data.city}` : ''}</span>
            </div>
          )}
          <div className="ne-preview-row">
            <i className="ti ti-users" aria-hidden="true" />
            <span>{data.capacity || totalCapacity || '—'} capacity</span>
          </div>
          <div className="ne-preview-row">
            <i className="ti ti-ticket" aria-hidden="true" />
            <span>{tickets.length} ticket tier{tickets.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      <div className="ne-publish-options">
        <div className="ne-publish-option-label">How do you want to publish?</div>
        <div className="ne-publish-cards">
          {[
            { id: 'now', icon: 'ti-rocket', title: 'Publish now', sub: 'Go live immediately — tickets open for sale' },
            { id: 'schedule', icon: 'ti-clock', title: 'Schedule', sub: 'Set a future date and time to go live' },
            { id: 'draft', icon: 'ti-file', title: 'Save as draft', sub: 'Come back and finish later' },
          ].map(opt => (
            <label key={opt.id} className="ne-publish-card">
              <input type="radio" name="publish" value={opt.id} defaultChecked={opt.id === 'now'} />
              <i className={`ti ${opt.icon}`} aria-hidden="true" />
              <div>
                <div className="ne-publish-card-title">{opt.title}</div>
                <div className="ne-publish-card-sub">{opt.sub}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="ne-publish-checklist">
        <div className="ne-checklist-title">Pre-publish checklist</div>
        {[
          { label: 'Event name', done: !!data.name },
          { label: 'Description', done: !!data.description },
          { label: 'Date & time', done: !!data.startDate && !!data.startTime },
          { label: 'Location or link', done: !!(data.venue || data.onlineLink) },
          { label: 'At least one ticket tier', done: tickets.length > 0 },
        ].map(item => (
          <div key={item.label} className={`ne-checklist-item ${item.done ? 'done' : ''}`}>
            <i className={`ti ${item.done ? 'ti-circle-check' : 'ti-circle'}`} aria-hidden="true" />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════
   Main page
══════════════════════════════════════ */
export default function NewEvent() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  const [basics, setBasics] = useState({
    name: '', category: '', type: 'In-person', description: '', color: 'blue',
  })

  const [details, setDetails] = useState({
    startDate: '', startTime: '', endDate: '', endTime: '',
    venue: '', address: '', city: '', capacity: '', tags: '', onlineLink: '',
  })

  const [tickets, setTickets] = useState([])

  const updateBasics = (k, v) => setBasics(p => ({ ...p, [k]: v }))
  const updateDetails = (k, v) => setDetails(p => ({ ...p, [k]: v }))

  const addTicket = () => setTickets(p => [...p, {
    id: Date.now(), name: '', ticketType: 'paid', price: '', quantity: '', description: '',
  }])

  const removeTicket = (id) => setTickets(p => p.filter(t => t.id !== id))

  const updateTicket = (id, k, v) =>
    setTickets(p => p.map(t => t.id === id ? { ...t, [k]: v } : t))

  const canNext = () => {
    if (step === 0) return basics.name && basics.category && basics.description
    if (step === 1) return details.startDate && details.startTime && (details.venue || details.onlineLink || basics.type === 'Online')
    return true
  }

  const handlePublish = () => {
    // TODO: wire to API
    navigate('/dashboard')
  }

  return (
    <div className="ne-wrap">
      {/* Sidebar */}
      <aside className="ne-sidebar">
        <Link to="/dashboard" className="ne-sidebar-logo">
          <CheqinLogoMark size={24} />
          <span className="ne-brand">cheqin</span>
        </Link>

        <div className="ne-sidebar-heading">New event</div>
        <StepIndicator current={step} />

        <div className="ne-sidebar-bottom">
          <Link to="/dashboard" className="ne-cancel-link">
            <i className="ti ti-arrow-left" aria-hidden="true" /> Back to dashboard
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="ne-main">
        <header className="ne-topbar">
          <div className="ne-topbar-step">{STEPS[step]}</div>
          <div className="ne-topbar-right">
            <span className="ne-topbar-count">Step {step + 1} of {STEPS.length}</span>
          </div>
        </header>

        <div className="ne-content">
          <div className="ne-content-inner">
            {step === 0 && <StepBasics data={basics} onChange={updateBasics} />}
            {step === 1 && <StepDetails data={{ ...details, type: basics.type }} onChange={updateDetails} />}
            {step === 2 && <StepTickets tickets={tickets} onAdd={addTicket} onRemove={removeTicket} onChange={updateTicket} />}
            {step === 3 && <StepPublish data={{ ...basics, ...details }} tickets={tickets} />}
          </div>
        </div>

        <footer className="ne-footer">
          <button
            className="ne-btn-back"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
          >
            <i className="ti ti-arrow-left" aria-hidden="true" /> Back
          </button>

          <div className="ne-footer-right">
            <button className="ne-btn-draft">Save draft</button>
            {step < STEPS.length - 1 ? (
              <button
                className="ne-btn-next"
                onClick={() => setStep(s => s + 1)}
                disabled={!canNext()}
              >
                Continue <i className="ti ti-arrow-right" aria-hidden="true" />
              </button>
            ) : (
              <button className="ne-btn-publish" onClick={handlePublish}>
                <i className="ti ti-rocket" aria-hidden="true" /> Publish event
              </button>
            )}
          </div>
        </footer>
      </div>
    </div>
  )
}