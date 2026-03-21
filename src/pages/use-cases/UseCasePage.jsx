import React from 'react'
import { Link } from 'react-router-dom'
import { useModal } from '../../components/ModalContext'

export default function UseCasePage({ icon, title, subtitle, desc, hero_features, sections, testimonial, related }) {
  const { openModal } = useModal()

  return (
    <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(180deg,#f0fdf8,#fff)', borderBottom: '1px solid #e2e8f0', padding: '80px 0 64px' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 64, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 300 }}>
              <span className="tag animate-fade-up">{subtitle}</span>
              <div style={{ fontSize: 52, marginBottom: 16, animation: 'fadeIn 0.4s ease' }}>{icon}</div>
              <h1 className="h1 animate-fade-up delay-1" style={{ fontSize: 'clamp(32px,4vw,52px)', marginBottom: 20 }}>{title}</h1>
              <p className="lead animate-fade-up delay-2" style={{ maxWidth: 480, marginBottom: 36 }}>{desc}</p>
              <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={openModal}>Request a Demo →</button>
                <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Try free for 14 days</a>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {hero_features.map((f, i) => (
                <div key={i} className="animate-fade-up" style={{ animationDelay: `${0.2 + i * 0.1}s`, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 3 }}>{f.title}</div>
                    <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.55 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      {sections.map((sec, si) => (
        <section key={si} style={{ padding: '72px 0', borderBottom: '1px solid #e2e8f0', background: si % 2 === 1 ? '#f8fafc' : '#fff' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
              <div style={{ order: si % 2 === 1 ? 1 : 0 }}>
                <span className="tag reveal">{sec.tag}</span>
                <h2 className="h2 reveal" style={{ marginBottom: 16 }}>{sec.title}</h2>
                <p className="body reveal" style={{ marginBottom: 24 }}>{sec.desc}</p>
                <div className="check-list reveal">
                  {sec.checks.map((c, i) => (
                    <div key={i} className="check-item">
                      <div className="check-ic">
                        <svg viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5"><polyline points="2,6 5,9 10,3"/></svg>
                      </div>
                      <div className="check-text" dangerouslySetInnerHTML={{ __html: c }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="reveal" style={{ order: si % 2 === 1 ? 0 : 1 }}>
                <div style={{ background: sec.visual?.bg || '#f1f5f9', borderRadius: 16, padding: 32, border: '1px solid #e2e8f0', minHeight: 220, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {sec.visual?.items?.map((item, i) => (
                    <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '14px 18px', border: '1px solid #e2e8f0', display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ fontSize: 20 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>{item.title}</div>
                        {item.sub && <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{item.sub}</div>}
                      </div>
                      {item.badge && <div style={{ marginLeft: 'auto', background: '#ecfdf5', color: '#00c07a', fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 100 }}>{item.badge}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* TESTIMONIAL */}
      {testimonial && (
        <section style={{ padding: '72px 0', background: 'linear-gradient(135deg,#0f172a,#1e293b)', borderBottom: '1px solid #1e293b' }}>
          <div className="container" style={{ maxWidth: 760, margin: '0 auto', padding: '0 48px', textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 24 }}>❝</div>
            <p style={{ fontSize: 20, color: '#e2e8f0', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 24 }}>{testimonial.quote}</p>
            <div style={{ fontSize: 14, color: '#64748b' }}><strong style={{ color: '#94a3b8' }}>{testimonial.name}</strong> · {testimonial.role}</div>
          </div>
        </section>
      )}

      {/* RELATED */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <h2 className="h2 reveal" style={{ marginBottom: 32 }}>Explore more use cases</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {related.map(r => (
              <Link key={r.title} to={r.href} className="card reveal" style={{ textDecoration: 'none' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{r.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, color: '#0f172a' }}>{r.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{r.desc}</p>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 600, color: '#00c07a' }}>Learn more →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#f0fdf8', borderTop: '1px solid #d1fae5', padding: '64px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 className="h2 reveal" style={{ marginBottom: 14 }}>Ready to get started?</h2>
          <p className="lead reveal" style={{ marginBottom: 32, color: '#64748b' }}>14-day free trial. No credit card required.</p>
          <div className="reveal" style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn btn-primary btn-lg" onClick={openModal}>Request a Demo →</button>
            <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">Start free trial</a>
          </div>
        </div>
      </section>
    </main>
  )
}
