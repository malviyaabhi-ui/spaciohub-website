import React, { useEffect, useRef, useState } from 'react'

// Interactive 3D SpacioHub One on a clear glass meeting-room wall.
// three.js loads only when the section is about to scroll into view (its own chunk), the still render shows until
// then, and rendering pauses while the section is off screen. Phones and browsers without WebGL get the orbit video,
// because dragging a 3D model fights with page scrolling on touch screens.

const A = '/hardware/spaciohub-one/3d/'
const VIEWS = [['hero', '3/4 view'], ['front', 'Front'], ['right', 'Right'], ['side', 'Side profile']]
const LIGHTS = [['#1fe84e', 'Free'], ['#f59e0b', 'Starts soon'], ['#ef4444', 'In use']]

function webglOk() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')) } catch { return false }
}

export default function PanelViewer3D() {
  const wrap = useRef(null), canvas = useRef(null), api = useRef(null)
  const [mode, setMode] = useState('poster')        // poster | loading | live | video
  const [view, setView] = useState('hero')
  const [light, setLight] = useState(LIGHTS[0][0])
  const [spin, setSpin] = useState(true)

  useEffect(() => {
    const small = window.matchMedia('(max-width: 767px)').matches
    if (small || !webglOk()) { setMode('video'); return }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) setSpin(false)
    let disposed = false, started = false
    const io = new IntersectionObserver(async ([e]) => {
      if (api.current) api.current.setActive(e.isIntersecting)
      if (!e.isIntersecting || started) return
      started = true; setMode('loading')
      try {
        const { mountPanel } = await import('./panel3d/scene.js')
        if (disposed) return
        api.current = await mountPanel(canvas.current, { screenUrl: A + 'screen.jpg', zoom: false, reducedMotion: reduced, onInteract: () => setSpin(false) })
        if (disposed) { api.current.dispose(); return }
        setMode('live')
      } catch (err) { console.warn('3D viewer unavailable:', err); setMode('video') }
    }, { rootMargin: '200px 0px' })
    io.observe(wrap.current)
    return () => { disposed = true; io.disconnect(); api.current?.dispose(); api.current = null }
  }, [])

  const pickView = (v) => { setView(v); setSpin(false); api.current?.goPreset(v) }
  const pickLight = (c) => { setLight(c); api.current?.setStatus(c) }
  const toggleSpin = () => setSpin(api.current ? api.current.setSpin(!spin) : !spin)
  const live = mode === 'live'

  const chip = (on, color) => ({
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 10, cursor: live ? 'pointer' : 'default',
    fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: on ? '#fff' : 'rgba(255,255,255,0.7)',
    background: on ? 'rgba(255,255,255,0.12)' : 'transparent', border: `1px solid ${on ? (color || 'rgba(12,184,182,0.6)') : 'transparent'}`,
    opacity: live ? 1 : 0.5, transition: 'all .25s',
  })

  return (
    <section style={{ background: 'linear-gradient(180deg,#060d0b,#0b1220)', padding: '96px 0', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="tag reveal" style={{ color: '#00c07a' }}>Interactive 3D</span>
          <h2 className="h2 reveal" style={{ color: '#fff' }}>Turn it around <span style={{ color: '#00c07a' }}>on the glass</span></h2>
          <p className="reveal" style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', maxWidth: 560, margin: '12px auto 0' }}>
            {mode === 'video'
              ? 'Mounted on a glass meeting-room wall, 22 mm deep, shown from every angle.'
              : 'Mounted on a glass meeting-room wall, 22 mm deep. Drag to look around it and switch the light bar between room states.'}
          </p>
        </div>

        <div ref={wrap} className="reveal" style={{ position: 'relative', width: '100%', maxWidth: '100%', aspectRatio: mode === 'video' ? '16/9' : '16/8.5', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: '#0b1220', boxShadow: `0 30px 90px -30px ${light}55`, transition: 'box-shadow .5s' }}>
          {mode === 'video' ? (
            <video autoPlay muted loop playsInline poster={A + 'poster.webp'} aria-label="SpacioHub One shown from every angle on a glass meeting-room wall"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
              <source src={A + 'orbit.mp4'} type="video/mp4" />
            </video>
          ) : (
            <>
              <canvas ref={canvas} aria-label="3D model of SpacioHub One. Drag to rotate."
                style={{ display: 'block', width: '100%', height: '100%', cursor: live ? 'grab' : 'default', touchAction: 'pan-y' }} />
              <img src={A + 'poster.webp'} alt="SpacioHub One mounted on a clear glass meeting-room wall" width="1600" height="1066"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: live ? 0 : 1, transition: 'opacity .8s', pointerEvents: 'none' }} />
              {mode === 'loading' && (
                <div style={{ position: 'absolute', left: 16, top: 16, fontSize: 12, color: '#fff', background: 'rgba(6,13,11,0.6)', padding: '6px 12px', borderRadius: 999 }}>Loading 3D…</div>
              )}
              {live && (
                <div style={{ position: 'absolute', right: 16, top: 16, fontSize: 12, color: 'rgba(255,255,255,0.8)', background: 'rgba(6,13,11,0.5)', padding: '6px 12px', borderRadius: 999 }}>Drag to rotate</div>
              )}
            </>
          )}
        </div>

        {mode !== 'video' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', marginTop: 16 }}>
            <div role="group" aria-label="Camera view" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {VIEWS.map(([k, l]) => (
                <button key={k} type="button" disabled={!live} aria-pressed={view === k && !spin} onClick={() => pickView(k)} style={chip(view === k && !spin)}>{l}</button>
              ))}
              <button type="button" disabled={!live} aria-pressed={spin} onClick={toggleSpin} style={chip(spin)}>Auto-rotate</button>
            </div>
            <div role="group" aria-label="Light bar colour" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {LIGHTS.map(([c, l]) => (
                <button key={c} type="button" disabled={!live} aria-pressed={light === c} onClick={() => pickLight(c)} style={chip(light === c, c)}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: c, boxShadow: `0 0 10px ${c}` }} />{l}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
