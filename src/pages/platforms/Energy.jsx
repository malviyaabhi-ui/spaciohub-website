import SEO from '../../components/SEO'
import React, { useState } from 'react'
import { useModal } from '../../components/ModalContext'

const FEATURES = [
  { icon: '⚡', title: 'kWh Estimates per Room', desc: 'Calculates energy used and wasted based on actual booking data and room power profiles — no hardware needed.', color: '#fefce8', border: '#fde68a' },
  { icon: '🌿', title: 'CO₂ Sustainability Report', desc: 'Tracks carbon emissions from unoccupied rooms using UAE grid intensity (0.45 kg CO₂/kWh). Report-ready for ESG compliance.', color: '#f0fdf4', border: '#a7f3d0' },
  { icon: '🇦🇪', title: 'UAE Grid Calibrated', desc: 'Calculations use UAE DEWA/ADEWA grid carbon intensity and commercial electricity tariff (0.23 AED/kWh) out of the box.', color: '#eff6ff', border: '#bfdbfe' },
  { icon: '🔥', title: 'Usage Heatmap', desc: 'See exactly which hours and days drive your energy spend. Spot peak demand at a glance across the full working week.', color: '#fff7ed', border: '#fed7aa' },
  { icon: '💡', title: 'Smart Recommendations', desc: 'AI-powered suggestions — consolidate underused rooms, flag high performers, and quantify the monthly AED saving.', color: '#f5f3ff', border: '#ddd6fe' },
  { icon: '🔌', title: 'Hardware Integration Ready', desc: 'Connect Shelly smart plugs, Eastron meters, or any BMS to replace estimates with real kWh per room. Phase 2 roadmap.', color: '#fdf2f8', border: '#fbcfe8' },
]

// Live mock dashboard visual
function EnergyDashboardVisual() {
  const rooms = [
    { name: 'Board Room', color: '#ef4444', util: 9, bookedH: 17, totalH: 189, kwhUsed: 22.5, kwhWasted: 450.0, co2: 202.5, aed: 103.5 },
    { name: 'Voyager', color: '#10b981', util: 9, bookedH: 16.3, totalH: 189, kwhUsed: 40.6, kwhWasted: 431.9, co2: 194.3, aed: 99.3 },
    { name: 'Test Room', color: '#3b82f6', util: 8, bookedH: 14.8, totalH: 189, kwhUsed: 17.7, kwhWasted: 209.1, co2: 94.1, aed: 48.1 },
  ]

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
      {/* Header */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Energy Dashboard</div>
            <div style={{ fontSize: 10, color: '#94a3b8' }}>Occupancy-based estimates · UAE grid</div>
          </div>
        </div>
        <div style={{ fontSize: 10, color: '#3b82f6', fontWeight: 600, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 6, padding: '3px 8px' }}>Last 30 days</div>
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, borderBottom: '1px solid #f1f5f9' }}>
        {[
          { label: 'Avg Utilisation', value: '7%', sub: 'across 3 rooms', color: '#16a34a', bg: '#f0fdf4', border: '#16a34a' },
          { label: 'Est. kWh Used', value: '81', sub: '19 AED est. cost', color: '#ca8a04', bg: '#fefce8', border: 'transparent' },
          { label: 'Est. kWh Wasted', value: '1,091', sub: 'from unoccupied time', color: '#dc2626', bg: '#fff', border: '#dc2626' },
          { label: 'CO₂ from Waste', value: '491 kg', sub: '251 AED wasted', color: '#16a34a', bg: '#f0fdf4', border: 'transparent' },
        ].map((k, i) => (
          <div key={i} style={{ padding: '14px 14px', borderRight: i < 3 ? '1px solid #f1f5f9' : 'none', borderLeft: i === 0 ? '3px solid #16a34a' : i === 2 ? '3px solid #dc2626' : 'none', background: k.bg }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 3 }}>{k.label}</div>
            <div style={{ fontSize: i === 2 ? 16 : 18, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 3 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Room breakdown */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>Room Utilisation & Energy Breakdown</div>
        <div style={{ fontSize: 9, color: '#94a3b8', marginBottom: 12 }}>Based on 21 working days · 189 available hours per room</div>
        {rooms.map((r, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.color }} />
                <span style={{ fontSize: 11, fontWeight: 600, color: '#0f172a' }}>{r.name}</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: '#dc2626', background: '#fee2e2', padding: '1px 6px', borderRadius: 100 }}>Low</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 10, color: '#94a3b8' }}>{r.bookedH}h / {r.totalH}h</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#dc2626' }}>{r.util}%</span>
              </div>
            </div>
            <div style={{ height: 6, background: '#f1f5f9', borderRadius: 100, overflow: 'hidden', marginBottom: 4 }}>
              <div style={{ height: '100%', width: `${r.util}%`, background: '#dc2626', borderRadius: 100 }} />
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 9, color: '#94a3b8' }}>
              <span>⚡ {r.kwhUsed} kWh used</span>
              <span style={{ color: '#dc2626', fontWeight: 600 }}>🔴 {r.kwhWasted} kWh wasted</span>
              <span>≈ {r.co2} kg CO₂</span>
              <span>≈ {r.aed} AED</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation */}
      <div style={{ padding: '12px 18px' }}>
        <div style={{ padding: '10px 12px', background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 10, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ fontSize: 13, flexShrink: 0 }}>⚠️</span>
          <span style={{ fontSize: 11, color: '#92400e' }}>Board Room is only 5% utilised — consider consolidating or repurposing to save <strong>~104 AED/month</strong></span>
        </div>
        <div style={{ padding: '10px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 6 }}>
          <span style={{ fontSize: 13, flexShrink: 0 }}>💡</span>
          <span style={{ fontSize: 11, color: '#1e40af' }}>491 kg CO₂ emitted from unused room time in 30 days. Reducing idle time by 20% would save <strong>98 kg CO₂</strong>.</span>
        </div>
      </div>
    </div>
  )
}

// Heatmap visual
function HeatmapVisual() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const hours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm']
  // Based on real screenshot data
  const data = [
    [0,0,0,0,0,0,0,0,0,0], // Sun
    [0,0,0,0,0,0,0,0,0,0], // Mon
    [0,0,0,0,0,0,0.4,0,0,0], // Tue
    [0,0,0,0,0,0,0.5,0,0.3,0], // Wed
    [0.6,0.7,0.5,0.8,0.6,0.7,0.5,1,0.7,0.8], // Thu — busiest
    [0.5,0.7,0.4,0,0,0.3,0,0,0.4,0], // Fri
    [0,0.3,0,0,0,0,0,0,0,0], // Sat
  ]

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Usage Heatmap</div>
      <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 14 }}>Bookings by hour and day — darker = more activity</div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 4, marginLeft: 36 }}>
        {hours.map(h => <div key={h} style={{ flex: 1, fontSize: 8, color: '#94a3b8', textAlign: 'center' }}>{h}</div>)}
      </div>
      {days.map((day, d) => (
        <div key={day} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 3 }}>
          <div style={{ width: 28, fontSize: 9, color: '#94a3b8', textAlign: 'right', flexShrink: 0 }}>{day}</div>
          {hours.map((_, h) => {
            const v = data[d][h]
            return (
              <div key={h} style={{
                flex: 1, height: 22, borderRadius: 4,
                background: v === 0 ? '#f1f5f9' : `rgba(34,197,94,${0.15 + v * 0.85})`,
                transition: 'opacity 0.2s'
              }} />
            )
          })}
        </div>
      ))}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, marginLeft: 36 }}>
        <span style={{ fontSize: 9, color: '#94a3b8' }}>Low</span>
        {[0.15, 0.35, 0.55, 0.75, 1].map(v => (
          <div key={v} style={{ width: 18, height: 10, borderRadius: 3, background: `rgba(34,197,94,${v})` }} />
        ))}
        <span style={{ fontSize: 9, color: '#94a3b8' }}>High</span>
      </div>
    </div>
  )
}

export default function EnergyPage() {
  const { openModal } = useModal()

  return (
    <>
      <SEO {...(PAGE_SEO?.energy || {
        title: 'Energy Dashboard — SpacioHub',
        description: 'Track energy consumption, CO₂ emissions, and AED cost per meeting room. Occupancy-based estimates calibrated to UAE grid. No hardware needed.',
      })} />

      <main>

        {/* ══ HERO ════════════════════════════════════════════ */}
        <section style={{ padding: '96px 0 80px', background: 'linear-gradient(170deg,#0c1a0e 0%,#0f172a 60%,#111827 100%)', overflow: 'hidden', position: 'relative' }}>
          {/* Background glow */}
          <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse,rgba(34,197,94,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />

          <div className="container" style={{ position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div className="animate-fade-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', letterSpacing: '0.5px' }}>New — Energy Dashboard</span>
              </div>
              <h1 className="animate-fade-up h1" style={{ color: '#fff', marginBottom: 20, maxWidth: 700, margin: '0 auto 20px' }}>
                Know exactly what your empty rooms are <span style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>costing you</span>
              </h1>
              <p className="animate-fade-up body" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '0 auto 36px', fontSize: 17, lineHeight: 1.65 }}>
                SpacioHub calculates energy waste, CO₂ emissions, and AED cost from unoccupied meeting rooms — no hardware, no sensors, no setup. Just your booking data.
              </p>
              <div className="animate-fade-up" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={openModal} style={{ boxShadow: '0 6px 20px rgba(34,197,94,0.3)', background: '#22c55e', border: 'none' }}>
                  See it live →
                </button>
                <a href="/pricing" style={{ display: 'inline-flex', alignItems: 'center', padding: '11px 22px', borderRadius: 9, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                  View pricing
                </a>
              </div>

              {/* Stats row */}
              <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 48, flexWrap: 'wrap' }}>
                {[
                  { value: '0.45 kg', label: 'CO₂ per kWh · UAE grid' },
                  { value: '0.23 AED', label: 'per kWh · UAE tariff' },
                  { value: 'No hardware', label: 'required to start' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#22c55e' }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero dashboard visual */}
            <div className="animate-fade-up" style={{ maxWidth: 820, margin: '0 auto' }}>
              <EnergyDashboardVisual />
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ════════════════════════════════════ */}
        <section style={{ padding: '80px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <span className="tag reveal">How It Works</span>
              <h2 className="h2 reveal">Energy insights from your <span style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>booking data</span></h2>
              <p className="body reveal" style={{ maxWidth: 520, margin: '16px auto 0', color: '#64748b' }}>No wiring. No sensors. No IT project. SpacioHub uses your existing room booking data to calculate energy consumption and waste from day one.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 reveal" style={{ gap: 24 }}>
              {[
                { step: '01', title: 'Booking data is captured', desc: 'Every room booking records start time, end time, and room. SpacioHub already has this from your daily operations.', color: '#eff6ff', border: '#bfdbfe', accent: '#3b82f6' },
                { step: '02', title: 'Power profiles applied', desc: 'Rooms are assigned power draw by capacity — 800W for huddle rooms, up to 2,500W for boardrooms — reflecting real office equipment loads.', color: '#f0fdf4', border: '#a7f3d0', accent: '#22c55e' },
                { step: '03', title: 'kWh, CO₂ and AED calculated', desc: 'Booked hours × watts = kWh used. Unbooked hours × watts = kWh wasted. Multiplied by UAE grid intensity and commercial tariff.', color: '#fefce8', border: '#fde68a', accent: '#ca8a04' },
              ].map((s, i) => (
                <div key={i} style={{ background: s.color, border: `1px solid ${s.border}`, borderRadius: 16, padding: '28px 24px' }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: s.accent, opacity: 0.3, marginBottom: 12, fontFamily: 'DM Mono, monospace' }}>{s.step}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FEATURES ════════════════════════════════════════ */}
        <section style={{ padding: '80px 0', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <span className="tag reveal">Features</span>
              <h2 className="h2 reveal">Everything in the <span style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>Energy Dashboard</span></h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 reveal" style={{ gap: 16 }}>
              {FEATURES.map((f, i) => (
                <div key={f.title} style={{ animationDelay: `${i * 0.06}s`, background: f.color, border: `1px solid ${f.border}`, borderRadius: 16, padding: '24px 22px', transition: 'transform 0.25s, box-shadow 0.25s', cursor: 'default' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${f.border}80` }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                  <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HEATMAP SECTION ═════════════════════════════════ */}
        <section style={{ padding: '80px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 reveal" style={{ gap: 64, alignItems: 'center' }}>
              <div>
                <span className="tag">Usage Heatmap</span>
                <h2 className="h2" style={{ marginBottom: 16 }}>
                  See exactly <span style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>when energy is wasted</span>
                </h2>
                <p className="body" style={{ marginBottom: 24 }}>
                  The usage heatmap shows booking density by hour and day across the working week. Dark green = high activity. Light = empty room with lights and AC running.
                </p>
                <div className="check-list">
                  {[
                    '<strong>9am–6pm coverage</strong> — full working day tracked per room',
                    '<strong>Day-of-week patterns</strong> — identify your quietest days',
                    '<strong>Peak demand visibility</strong> — schedule maintenance around busy slots',
                    '<strong>Facilities planning</strong> — consolidate rooms on low-demand days',
                    '<strong>7 / 30 / 90 day ranges</strong> — spot trends across quarters',
                  ].map((c, i) => (
                    <div key={i} className="check-item">
                      <div className="check-ic"><svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5"><polyline points="2,6 5,9 10,3" /></svg></div>
                      <div className="check-text" dangerouslySetInnerHTML={{ __html: c }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="reveal"><HeatmapVisual /></div>
            </div>
          </div>
        </section>

        {/* ══ RECOMMENDATIONS ═════════════════════════════════ */}
        <section style={{ padding: '80px 0', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 reveal" style={{ gap: 64, alignItems: 'center' }}>
              <div className="reveal">
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18 }}>👍</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Recommendations</span>
                  </div>
                  <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { type: 'warning', icon: '⚠️', text: 'Voyager is only 9% utilised — consider consolidating or repurposing to save ~99 AED/month', bg: '#fef9c3', border: '#fde68a', color: '#92400e' },
                      { type: 'warning', icon: '⚠️', text: 'Test Room is only 8% utilised — consider consolidating or repurposing to save ~48 AED/month', bg: '#fef9c3', border: '#fde68a', color: '#92400e' },
                      { type: 'warning', icon: '⚠️', text: 'Board Room is only 5% utilised — consider consolidating or repurposing to save ~104 AED/month', bg: '#fef9c3', border: '#fde68a', color: '#92400e' },
                      { type: 'warning', icon: '⚠️', text: 'Overall utilisation is 7% — scheduling desk-free days or consolidating rooms could significantly reduce energy costs.', bg: '#fef9c3', border: '#fde68a', color: '#92400e' },
                      { type: 'info', icon: '💡', text: '491 kg CO₂ emitted from unused room time in the last 30 days. Reducing idle time by 20% would save 98 kg CO₂.', bg: '#eff6ff', border: '#bfdbfe', color: '#1e40af' },
                    ].map((r, i) => (
                      <div key={i} style={{ padding: '11px 14px', background: r.bg, border: `1px solid ${r.border}`, borderRadius: 10, display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                        <span style={{ fontSize: 14, flexShrink: 0 }}>{r.icon}</span>
                        <span style={{ fontSize: 12, color: r.color, lineHeight: 1.5 }}>{r.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <span className="tag">Smart Recommendations</span>
                <h2 className="h2" style={{ marginBottom: 16 }}>
                  Actionable <span style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>energy insights</span> — not just data
                </h2>
                <p className="body" style={{ marginBottom: 24 }}>
                  SpacioHub doesn't just show you numbers — it tells you what to do about them. Every insight comes with a specific AED saving estimate so facilities managers can prioritise.
                </p>
                <div className="check-list">
                  {[
                    '<strong>Per-room consolidation alerts</strong> — flags rooms below 20% utilisation with estimated monthly saving',
                    '<strong>High performer recognition</strong> — celebrates rooms above 85% and suggests adding similar spaces',
                    '<strong>CO₂ reduction targets</strong> — quantifies sustainability improvement from simple scheduling changes',
                    '<strong>Overall utilisation score</strong> — single-number benchmark across your entire office',
                  ].map((c, i) => (
                    <div key={i} className="check-item">
                      <div className="check-ic"><svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5"><polyline points="2,6 5,9 10,3" /></svg></div>
                      <div className="check-text" dangerouslySetInnerHTML={{ __html: c }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 28 }}>
                  <button className="btn btn-primary" onClick={openModal} style={{ boxShadow: '0 6px 20px rgba(34,197,94,0.3)', background: '#22c55e', border: 'none' }}>See it in action →</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ HARDWARE ROADMAP ════════════════════════════════ */}
        <section style={{ padding: '80px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span className="tag reveal">Phase 2 — Coming Soon</span>
              <h2 className="h2 reveal">Upgrade to <span style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>real energy data</span></h2>
              <p className="body reveal" style={{ maxWidth: 520, margin: '16px auto 0', color: '#64748b' }}>
                Connect a smart meter or BMS to replace occupancy estimates with actual kWh per room. SpacioHub is hardware-agnostic — works with any vendor.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 reveal" style={{ gap: 16 }}>
              {[
                { icon: '🔌', title: 'Shelly Smart Plugs', desc: 'Per-device power monitoring via REST API. Low cost, easy install.', badge: 'Roadmap' },
                { icon: '⚡', title: 'Eastron Smart Meters', desc: 'Sub-meter per room or zone. MQTT or HTTP push to SpacioHub.', badge: 'Roadmap' },
                { icon: '🏢', title: 'BMS Integration', desc: 'Siemens, Honeywell, Schneider — BACnet or Modbus to REST bridge.', badge: 'Roadmap' },
                { icon: '🔗', title: 'IoT Middleware', desc: 'Home Assistant, Node-RED, or AWS IoT as a normalised data source.', badge: 'Roadmap' },
              ].map((h, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: '24px 20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{h.icon}</div>
                  <div style={{ display: 'inline-block', fontSize: 9, fontWeight: 700, color: '#7c3aed', background: '#ede9fe', border: '1px solid #ddd6fe', borderRadius: 100, padding: '2px 8px', marginBottom: 10, letterSpacing: '0.5px' }}>{h.badge}</div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{h.title}</h3>
                  <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>{h.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <a href="mailto:support@risertechnologies.net?subject=SpacioHub Energy Integration" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#22c55e', textDecoration: 'none' }}>
                Contact us to set up hardware integration →
              </a>
            </div>
          </div>
        </section>

        {/* ══ CTA ═════════════════════════════════════════════ */}
        <section style={{ padding: '88px 0', background: 'linear-gradient(135deg,#0c1a0e,#0f172a)', textAlign: 'center' }}>
          <div className="container">
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg,#22c55e,#16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            </div>
            <h2 className="h2 reveal" style={{ color: '#fff', marginBottom: 16 }}>
              Start tracking your energy waste <span style={{ background: 'linear-gradient(135deg,#22c55e,#16a34a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 900 }}>today — free</span>
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.55)', maxWidth: 460, margin: '0 auto 36px', lineHeight: 1.65 }}>
              No sensors. No hardware. No setup. Just connect SpacioHub to your rooms and your Energy Dashboard is ready immediately.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={openModal} style={{ background: '#22c55e', border: 'none', boxShadow: '0 6px 20px rgba(34,197,94,0.35)', fontSize: 15, padding: '13px 28px' }}>
                Get started free →
              </button>
              <a href="/contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 24px', borderRadius: 9, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                Contact us →
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
