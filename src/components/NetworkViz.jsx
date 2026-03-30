import React, { useEffect, useRef } from 'react'

// ── Colour palette per node type ────────────────────────────────
const C = {
  core:    { bg:'#06b6d4', glow:'rgba(6,182,212,.45)',   border:'#22d3ee', lbl:'#a5f3fc' },
  space:   { bg:'#3b82f6', glow:'rgba(59,130,246,.4)',   border:'#60a5fa', lbl:'#bfdbfe' },
  billing: { bg:'#10b981', glow:'rgba(16,185,129,.4)',   border:'#34d399', lbl:'#a7f3d0' },
  comms:   { bg:'#ec4899', glow:'rgba(236,72,153,.4)',   border:'#f472b6', lbl:'#fbcfe8' },
  data:    { bg:'#f59e0b', glow:'rgba(245,158,11,.4)',   border:'#fbbf24', lbl:'#fde68a' },
  infra:   { bg:'#8b5cf6', glow:'rgba(139,92,246,.38)',  border:'#a78bfa', lbl:'#ddd6fe' },
}

// ── Icon drawing functions (canvas paths) ────────────────────────
const ICONS = {
  hub: (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'; ctx.lineJoin='round'
    const h=s*.7,w=s*.6,bx=x-w/2,by=y-h/2
    ctx.strokeRect(bx,by,w,h)
    ctx.strokeRect(bx+w*.6,by+h*.1,w*.35,h*.9)
    ctx.beginPath(); ctx.moveTo(bx,by+h*.45); ctx.lineTo(bx+w*.6,by+h*.45); ctx.stroke()
    ctx.strokeRect(bx+w*.1,by+h*.55,s*.12,s*.15)
    ctx.strokeRect(bx+w*.35,by+h*.55,s*.12,s*.15)
    ctx.strokeRect(bx+w*.1,by+h*.2,s*.1,s*.1)
    ctx.strokeRect(bx+w*.35,by+h*.2,s*.1,s*.1)
  },
  portal: (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'
    ctx.beginPath(); ctx.arc(x,y-s*.15,s*.22,0,Math.PI*2); ctx.stroke()
    ctx.beginPath(); ctx.arc(x,y+s*.55,s*.38,Math.PI,0); ctx.stroke()
  },
  mobile: (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'; ctx.lineJoin='round'
    const pw=s*.38,ph=s*.65
    ctx.strokeRect(x-pw/2,y-ph/2,pw,ph)
    ctx.beginPath(); ctx.arc(x,y+ph/2-s*.08,s*.04,0,Math.PI*2); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x-s*.08,y-ph/2+s*.1); ctx.lineTo(x+s*.08,y-ph/2+s*.1); ctx.stroke()
  },
  admin: (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'; ctx.lineJoin='round'
    ctx.beginPath()
    ctx.moveTo(x,y-s*.4); ctx.lineTo(x+s*.35,y-s*.2); ctx.lineTo(x+s*.35,y+s*.1)
    ctx.quadraticCurveTo(x+s*.35,y+s*.4,x,y+s*.45)
    ctx.quadraticCurveTo(x-s*.35,y+s*.4,x-s*.35,y+s*.1)
    ctx.lineTo(x-s*.35,y-s*.2); ctx.closePath(); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x-s*.12,y); ctx.lineTo(x,y+s*.15); ctx.lineTo(x+s*.18,y-s*.15); ctx.stroke()
  },
  api: (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'; ctx.lineJoin='round'
    ctx.beginPath(); ctx.moveTo(x,y+s*.4); ctx.lineTo(x,y+s*.05); ctx.stroke()
    ctx.strokeRect(x-s*.28,y-s*.28,s*.56,s*.33)
    ctx.beginPath(); ctx.moveTo(x-s*.14,y-s*.28); ctx.lineTo(x-s*.14,y-s*.44); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x+s*.14,y-s*.28); ctx.lineTo(x+s*.14,y-s*.44); ctx.stroke()
  },
  'room-booking': (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'; ctx.lineJoin='round'
    const bx=x-s*.35,by=y-s*.3,bw=s*.7,bh=s*.65
    ctx.strokeRect(bx,by,bw,bh)
    ctx.beginPath(); ctx.moveTo(bx,by+bh*.28); ctx.lineTo(bx+bw,by+bh*.28); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(bx+bw*.28,by-s*.1); ctx.lineTo(bx+bw*.28,by+s*.1); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(bx+bw*.72,by-s*.1); ctx.lineTo(bx+bw*.72,by+s*.1); ctx.stroke()
    ;[.25,.5,.75].forEach(dx=>[.5,.75].forEach(dy=>{
      ctx.beginPath(); ctx.arc(bx+bw*dx,by+bh*dy,s*.04,0,Math.PI*2); ctx.fillStyle=c; ctx.fill()
    }))
  },
  'meeting-room': (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'; ctx.lineJoin='round'
    ctx.strokeRect(x-s*.32,y-s*.12,s*.64,s*.26)
    ;[x-s*.38,x+s*.38].forEach(px=>{ ctx.beginPath(); ctx.arc(px,y,s*.11,0,Math.PI*2); ctx.stroke() })
    ;[x-s*.18,x,x+s*.18].forEach(px=>{ ctx.beginPath(); ctx.arc(px,y+s*.38,s*.09,0,Math.PI*2); ctx.stroke() })
  },
  'visitor-mgmt': (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'; ctx.lineJoin='round'
    ctx.strokeRect(x-s*.3,y-s*.38,s*.6,s*.76)
    ctx.beginPath(); ctx.arc(x,y-s*.12,s*.15,0,Math.PI*2); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x-s*.18,y+s*.15); ctx.lineTo(x+s*.18,y+s*.15); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x-s*.18,y+s*.28); ctx.lineTo(x+s*.1,y+s*.28); ctx.stroke()
    ctx.strokeRect(x-s*.12,y-s*.52,s*.24,s*.14)
  },
  'door-display': (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'; ctx.lineJoin='round'
    ctx.strokeRect(x-s*.38,y-s*.28,s*.76,s*.5)
    ctx.beginPath(); ctx.moveTo(x,y+s*.22); ctx.lineTo(x,y+s*.38); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x-s*.18,y+s*.38); ctx.lineTo(x+s*.18,y+s*.38); ctx.stroke()
    ctx.beginPath(); ctx.arc(x+s*.22,y-s*.1,s*.08,0,Math.PI*2)
    ctx.fillStyle='#34d399'; ctx.fill()
  },
  'qr-checkin': (ctx,x,y,s,c) => {
    ctx.fillStyle=c
    const g=s*.62,o=x-g/2,p=y-g/2,cs=g/7
    ;[[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2],[0,4],[0,5],[0,6],[1,4],[1,6],[2,4],[2,5],[2,6],[4,0],[4,1],[4,2],[5,0],[5,2],[6,0],[6,1],[6,2],[4,4],[4,6],[5,5],[6,4],[6,5],[6,6],[4,5]].forEach(([r,cc2])=>{
      ctx.fillRect(o+cc2*cs,p+r*cs,cs*.85,cs*.85)
    })
  },
  'ai-agent': (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'; ctx.lineJoin='round'
    ctx.strokeRect(x-s*.32,y-s*.15,s*.64,s*.48)
    ctx.beginPath(); ctx.moveTo(x,y-s*.15); ctx.lineTo(x,y-s*.38); ctx.stroke()
    ctx.beginPath(); ctx.arc(x,y-s*.38,s*.07,0,Math.PI*2); ctx.stroke()
    ctx.beginPath(); ctx.arc(x-s*.15,y+s*.06,s*.07,0,Math.PI*2); ctx.fillStyle=c; ctx.fill()
    ctx.beginPath(); ctx.arc(x+s*.15,y+s*.06,s*.07,0,Math.PI*2); ctx.fill()
    ctx.strokeStyle=c
    ctx.beginPath(); ctx.moveTo(x-s*.15,y+s*.22); ctx.lineTo(x+s*.15,y+s*.22); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x-s*.32,y+s*.05); ctx.lineTo(x-s*.46,y+s*.18); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x+s*.32,y+s*.05); ctx.lineTo(x+s*.46,y+s*.18); ctx.stroke()
  },
  'email-notif': (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'; ctx.lineJoin='round'
    ctx.strokeRect(x-s*.38,y-s*.25,s*.76,s*.5)
    ctx.beginPath(); ctx.moveTo(x-s*.38,y-s*.25); ctx.lineTo(x,y+s*.06); ctx.lineTo(x+s*.38,y-s*.25); ctx.stroke()
  },
  zoom: (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'; ctx.lineJoin='round'
    ctx.strokeRect(x-s*.38,y-s*.22,s*.5,s*.44)
    ctx.beginPath(); ctx.moveTo(x+s*.12,y-s*.18); ctx.lineTo(x+s*.42,y-s*.3); ctx.lineTo(x+s*.42,y+s*.3); ctx.lineTo(x+s*.12,y+s*.18); ctx.closePath(); ctx.stroke()
  },
  teams: (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'; ctx.lineJoin='round'
    ctx.beginPath(); ctx.moveTo(x-s*.32,y-s*.28); ctx.lineTo(x+s*.32,y-s*.28); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x,y-s*.28); ctx.lineTo(x,y+s*.32); ctx.stroke()
    ctx.strokeRect(x-s*.22,y-s*.05,s*.44,s*.36)
  },
  gcal: (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'; ctx.lineJoin='round'
    ctx.strokeRect(x-s*.35,y-s*.3,s*.7,s*.64)
    ctx.beginPath(); ctx.moveTo(x-s*.35,y-s*.08); ctx.lineTo(x+s*.35,y-s*.08); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x-s*.15,y-s*.42); ctx.lineTo(x-s*.15,y-s*.18); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x+s*.15,y-s*.42); ctx.lineTo(x+s*.15,y-s*.18); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(x-s*.14,y+s*.1); ctx.lineTo(x-s*.02,y+s*.24); ctx.lineTo(x+s*.18,y); ctx.stroke()
  },
  slack: (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'; ctx.lineJoin='round'
    ctx.beginPath()
    ctx.moveTo(x-s*.35,y-s*.3); ctx.lineTo(x+s*.35,y-s*.3)
    ctx.quadraticCurveTo(x+s*.42,y-s*.3,x+s*.42,y-s*.1)
    ctx.quadraticCurveTo(x+s*.42,y+s*.1,x+s*.35,y+s*.1)
    ctx.lineTo(x-s*.05,y+s*.1); ctx.lineTo(x-s*.28,y+s*.35)
    ctx.lineTo(x-s*.22,y+s*.1); ctx.lineTo(x-s*.35,y+s*.1)
    ctx.quadraticCurveTo(x-s*.42,y+s*.1,x-s*.42,y-s*.1)
    ctx.quadraticCurveTo(x-s*.42,y-s*.3,x-s*.35,y-s*.3)
    ctx.closePath(); ctx.stroke()
  },
  stripe: (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'; ctx.lineJoin='round'
    ctx.strokeRect(x-s*.38,y-s*.26,s*.76,s*.5)
    ctx.beginPath(); ctx.moveTo(x-s*.38,y-s*.08); ctx.lineTo(x+s*.38,y-s*.08); ctx.lineWidth=s*.12; ctx.stroke()
    ctx.lineWidth=s*.08
    ctx.strokeRect(x-s*.28,y+s*.06,s*.18,s*.1)
  },
  analytics: (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.08; ctx.lineCap='round'; ctx.lineJoin='round'
    ctx.beginPath(); ctx.moveTo(x-s*.38,y+s*.32); ctx.lineTo(x+s*.38,y+s*.32); ctx.stroke()
    ;[[-.26,-.12],[-.1,.08],[.1,-.22],[.26,.04]].forEach(([bx2,top])=>{
      ctx.strokeRect(x+bx2*s-s*.06,y+top*s,s*.12,s*.32-top*s)
    })
    ctx.beginPath(); ctx.moveTo(x-s*.28,y-s*.18); ctx.lineTo(x-.06*s,y+s*.02); ctx.lineTo(x+.1*s,y-s*.28); ctx.lineTo(x+s*.3,y-s*.05)
    ctx.strokeStyle=c; ctx.lineWidth=s*.05; ctx.stroke()
  },
  'integration-hub': (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.07
    const teeth=8,or=s*.38,ir=s*.24,tr=s*.08
    ctx.beginPath()
    for(let i=0;i<teeth;i++){
      const a=i/teeth*Math.PI*2,a1=(i+.35)/teeth*Math.PI*2,a2=(i+.65)/teeth*Math.PI*2
      if(i===0) ctx.moveTo(x+Math.cos(a)*or,y+Math.sin(a)*or)
      ctx.arc(x,y,or,a,a1); ctx.lineTo(x+Math.cos(a1)*(or+tr),y+Math.sin(a1)*(or+tr))
      ctx.arc(x,y,or+tr,a1,a2); ctx.lineTo(x+Math.cos(a2)*or,y+Math.sin(a2)*or)
    }
    ctx.closePath(); ctx.stroke()
    ctx.beginPath(); ctx.arc(x,y,ir,0,Math.PI*2); ctx.stroke()
  },
  cf: (ctx,x,y,s,c) => {
    ctx.strokeStyle=c; ctx.lineWidth=s*.07; ctx.lineCap='round'; ctx.lineJoin='round'
    ctx.beginPath()
    ctx.moveTo(x,y+s*.4)
    ctx.quadraticCurveTo(x-s*.35,y+s*.1,x-s*.2,y-s*.2)
    ctx.quadraticCurveTo(x-s*.1,y,x,y-s*.1)
    ctx.quadraticCurveTo(x+s*.05,y-s*.3,x+s*.02,y-s*.42)
    ctx.quadraticCurveTo(x+s*.28,y-s*.2,x+s*.3,y+s*.05)
    ctx.quadraticCurveTo(x+s*.35,y+s*.25,x,y+s*.4)
    ctx.stroke()
  },
}

const NODES = [
  { id:'hub',             label:'SpacioHub',          type:'core',    r:42, desc:'Central platform orchestrating all workspace features — bookings, visitors, billing and analytics.', tags:['Core','Owned'] },
  { id:'portal',          label:'Member Portal',       type:'core',    r:26, desc:'White-label self-service web portal for members to book, pay and manage their account.', tags:['White-label'] },
  { id:'mobile',          label:'Mobile App',          type:'core',    r:25, desc:'iOS & Android app. Book desks, check in via QR and manage everything on the go.', tags:['iOS & Android'] },
  { id:'admin',           label:'Admin Dashboard',     type:'core',    r:23, desc:'Full operator control — members, bookings, revenue and space configuration.', tags:['Internal'] },
  { id:'api',             label:'API',                 type:'core',    r:21, desc:'REST API and webhooks powering all integrations and connections.', tags:['REST / Webhooks'] },
  { id:'room-booking',    label:'Room Booking',        type:'space',   r:24, desc:'Real-time desk and office reservations with live availability and instant confirmation.', tags:['Core Feature'] },
  { id:'meeting-room',    label:'Meeting Rooms',       type:'space',   r:22, desc:'Hourly room booking with calendar sync and auto video meeting link generation.', tags:['Calendar Sync'] },
  { id:'visitor-mgmt',    label:'Visitor Management',  type:'space',   r:21, desc:'Digital visitor registration, host notifications and sign-in kiosk.', tags:['Reception'] },
  { id:'door-display',    label:'Door Display',        type:'space',   r:20, desc:'Tablet outside each room shows live status — green available, red occupied.', tags:['Real-time'] },
  { id:'qr-checkin',      label:'QR Check-in',         type:'space',   r:20, desc:'Contactless check-in for members and visitors via QR code scan.', tags:['Contactless'] },
  { id:'ai-agent',        label:'AI Agent',            type:'space',   r:21, desc:'AI assistant that answers queries, suggests spaces and automates bookings 24/7.', tags:['AI','24/7'] },
  { id:'email-notif',     label:'Email Notifications', type:'comms',   r:22, desc:'Booking confirmations, visitor alerts and renewal reminders sent automatically.', tags:['Automated'] },
  { id:'zoom',            label:'Zoom',                type:'comms',   r:20, desc:'Auto-generates a Zoom link every time a meeting room is booked.', tags:['Video Calls'] },
  { id:'teams',           label:'Microsoft Teams',     type:'comms',   r:20, desc:'Teams meeting links auto-created. Full Microsoft 365 calendar sync.', tags:['Microsoft 365'] },
  { id:'gcal',            label:'Google Calendar',     type:'comms',   r:20, desc:'2-way sync — bookings appear in Google Calendar and vice versa.', tags:['Google Workspace'] },
  { id:'slack',           label:'Slack',               type:'comms',   r:18, desc:'Booking alerts and announcements routed to Slack channels automatically.', tags:['Optional'] },
  { id:'stripe',          label:'Stripe',              type:'billing', r:25, desc:'Payment processor for memberships, day passes and recurring billing.', tags:['Always Required'] },
  { id:'analytics',       label:'Occupancy Analytics', type:'data',    r:23, desc:'Live occupancy, desk utilisation, revenue trends and peak hours.', tags:['Real-time'] },
  { id:'integration-hub', label:'Integrations',        type:'infra',   r:22, desc:'Connect SpacioHub to 500+ apps via native APIs and Zapier.', tags:['500+ Apps'] },
  { id:'cf',              label:'Cloudflare',          type:'infra',   r:17, desc:'CDN and edge routing for all SpacioHub web and API traffic.', tags:['Infrastructure'] },
]

const EDGES = [
  {f:'hub',t:'portal',r:true},{f:'hub',t:'mobile',r:true},{f:'hub',t:'admin',r:true},{f:'hub',t:'api',r:true},
  {f:'api',t:'room-booking',r:true},{f:'api',t:'meeting-room',r:true},{f:'api',t:'visitor-mgmt',r:true},
  {f:'api',t:'door-display',r:true},{f:'api',t:'qr-checkin',r:true},{f:'api',t:'ai-agent',r:false},
  {f:'meeting-room',t:'door-display',r:true},{f:'meeting-room',t:'gcal',r:true},
  {f:'meeting-room',t:'zoom',r:false},{f:'meeting-room',t:'teams',r:false},
  {f:'room-booking',t:'email-notif',r:true},{f:'visitor-mgmt',t:'email-notif',r:true},
  {f:'qr-checkin',t:'visitor-mgmt',r:true},{f:'api',t:'email-notif',r:true},
  {f:'api',t:'gcal',r:true},{f:'api',t:'slack',r:false},{f:'api',t:'stripe',r:true},
  {f:'hub',t:'analytics',r:true},{f:'room-booking',t:'analytics',r:true},
  {f:'api',t:'integration-hub',r:false},{f:'portal',t:'cf',r:true},
  {f:'integration-hub',t:'slack',r:false},{f:'mobile',t:'qr-checkin',r:true},
]

export default function NetworkViz() {
  const canvasRef = useRef(null)
  const stateRef  = useRef({ selN: null, hovN: null, particles: [], t0: 0, animId: null, nodes: [], W: 0, H: 0 })
  const cardRef   = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const st  = stateRef.current

    // Deep-clone nodes so layout props don't pollute module-level data
    st.nodes = NODES.map(n => ({ ...n }))

    function layout() {
      const rect = canvas.getBoundingClientRect()
      st.W = canvas.width  = rect.width
      st.H = canvas.height = rect.height
      const { W, H, nodes } = st
      const isMobile = W < 640
      const cx = W / 2, cy = H / 2
      // On mobile use width as the reference so nodes never overflow sides
      const m = isMobile ? W * 0.88 : Math.min(W, H)
      // Scale node radii down on mobile
      const rs = isMobile ? 0.62 : 1
      nodes.forEach(n => {
        const base = NODES.find(x => x.id === n.id)
        if (base) n.r = base.r * rs
      })

      const hub = nodes.find(n => n.id === 'hub')
      hub.x = cx; hub.y = cy; hub.bx = cx; hub.by = cy

      const core = nodes.filter(n => n.type === 'core' && n.id !== 'hub')
      core.forEach((n, i) => {
        const a = (i / core.length) * Math.PI * 2 - Math.PI / 2
        n.x = cx + Math.cos(a) * m * .19
        n.y = cy + Math.sin(a) * m * .19
        n.bx = n.x; n.by = n.y
      })

      const groups = [
        { ns: nodes.filter(n => n.type === 'space'),   base: 0.0,  extraR: 0 },
        { ns: nodes.filter(n => n.type === 'comms'),   base: 2.2,  extraR: 0 },
        { ns: nodes.filter(n => n.type === 'billing'), base: 3.55, extraR: isMobile ? 10 : 28 },
        { ns: nodes.filter(n => n.type === 'data'),    base: 4.35, extraR: isMobile ? 16 : 42 },
      ]
      const r2 = isMobile ? m * .38 : m * .43
      groups.forEach(g => {
        const base = g.base - Math.PI / 2
        const spread = Math.max(0.4, 1.7 / Math.max(g.ns.length, 1))
        g.ns.forEach((n, i) => {
          const a  = base + (i - (g.ns.length - 1) / 2) * spread
          const ro = r2 + (i % 2) * 38 + (g.extraR || 0)
          n.x = cx + Math.cos(a) * ro; n.y = cy + Math.sin(a) * ro
          n.bx = n.x; n.by = n.y
        })
      })

      // Stripe nudge upper-left
      const stripe = nodes.find(n => n.id === 'stripe')
      if (stripe) { stripe.bx -= m * .04; stripe.by -= m * .05; stripe.x = stripe.bx; stripe.y = stripe.by }

      // Integrations + Cloudflare — bottom-right cluster, overlapping
      const intHub = nodes.find(n => n.id === 'integration-hub')
      const cf     = nodes.find(n => n.id === 'cf')
      const clusterR = isMobile ? m * .34 : m * .38
      if (intHub) { intHub.bx = cx + clusterR; intHub.by = cy + clusterR; intHub.x = intHub.bx; intHub.y = intHub.by }
      if (cf)     { cf.bx = cx + clusterR + 22; cf.by = cy + clusterR - 18; cf.x = cf.bx; cf.y = cf.by }
    }

    // ── Particles ─────────────────────────────────────────────────
    let pTimer = 0
    function maybeSpawn(t) {
      if (t - pTimer < .22 || st.particles.length > 55) return
      pTimer = t
      if (Math.random() > .55) return
      const e   = EDGES[Math.floor(Math.random() * EDGES.length)]
      const f   = st.nodes.find(n => n.id === e.f)
      const to  = st.nodes.find(n => n.id === e.t)
      if (!f || !to) return
      st.particles.push({ f, to, e, p: 0, spd: .004 + Math.random() * .003, rev: Math.random() < .3 })
    }

    // ── Draw helpers ──────────────────────────────────────────────
    function drawEdge(e) {
      const f = st.nodes.find(n => n.id === e.f)
      const t = st.nodes.find(n => n.id === e.t)
      if (!f || !t) return
      const hi  = st.selN && (e.f === st.selN.id || e.t === st.selN.id)
      const col = C[f.type]
      ctx.save()
      ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(t.x, t.y)
      ctx.strokeStyle = e.r ? (hi ? col.border : 'rgba(255,255,255,.07)') : (hi ? 'rgba(255,255,255,.3)' : 'rgba(255,255,255,.04)')
      ctx.lineWidth   = e.r ? (hi ? 1.8 : 1) : 1
      if (!e.r) ctx.setLineDash([4, 7])
      ctx.stroke(); ctx.setLineDash([]); ctx.restore()
    }

    function drawParticle(p) {
      const src = p.rev ? p.to : p.f, dst = p.rev ? p.f : p.to
      const x   = src.x + (dst.x - src.x) * p.p
      const y   = src.y + (dst.y - src.y) * p.p
      const col = C[p.f.type]
      ctx.save()
      const g = ctx.createRadialGradient(x, y, 0, x, y, 5)
      g.addColorStop(0, col.bg); g.addColorStop(1, 'transparent')
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill()
      const tx = src.x + (dst.x - src.x) * Math.max(0, p.p - .09)
      const ty = src.y + (dst.y - src.y) * Math.max(0, p.p - .09)
      ctx.globalAlpha = .28; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x, y)
      ctx.strokeStyle = col.bg; ctx.lineWidth = 2; ctx.stroke(); ctx.restore()
    }

    function drawNode(n, t) {
      const col   = C[n.type]
      const isH   = st.hovN === n, isS = st.selN === n
      const isRel = st.selN && EDGES.some(e => (e.f === st.selN.id && e.t === n.id) || (e.t === st.selN.id && e.f === n.id))
      const dim   = st.selN && !isS && !isRel
      ctx.save(); if (dim) ctx.globalAlpha = .15
      const pulse = isS ? 1 + Math.sin(t * 3) * .05 : 1
      const r     = n.r * pulse

      if (isH || isS || n.id === 'hub') {
        const gr = ctx.createRadialGradient(n.x, n.y, r * .4, n.x, n.y, r * 3.2)
        gr.addColorStop(0, col.glow); gr.addColorStop(1, 'transparent')
        ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(n.x, n.y, r * 3.2, 0, Math.PI * 2); ctx.fill()
      }
      if (n.id === 'hub') {
        ctx.globalAlpha = (dim ? .1 : 1) * (.1 + Math.sin(t * 1.1) * .07)
        ctx.strokeStyle = col.bg; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(n.x, n.y, r + 12 + Math.sin(t * .7) * 5, 0, Math.PI * 2); ctx.stroke()
        ctx.globalAlpha = dim ? .15 : 1
      }

      const bg = ctx.createRadialGradient(n.x - r * .3, n.y - r * .3, 0, n.x, n.y, r)
      bg.addColorStop(0, col.bg + 'cc'); bg.addColorStop(1, col.bg + '3a')
      ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill()
      ctx.strokeStyle = isH || isS ? col.border : col.bg + '80'
      ctx.lineWidth = isS ? 2.5 : 1.5
      ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.stroke()

      // SVG-path icon
      const iconFn = ICONS[n.id] || ICONS.api
      ctx.save(); iconFn(ctx, n.x, n.y, r * 1.1, 'rgba(255,255,255,.92)'); ctx.restore()

      // Pill label
      const lx = n.x, ly = n.y + r + 8
      ctx.font = '600 11.5px -apple-system,Inter,sans-serif'
      ctx.textAlign = 'center'; ctx.textBaseline = 'top'
      const tw = ctx.measureText(n.label).width
      ctx.fillStyle = 'rgba(4,6,18,.85)'
      if (ctx.roundRect) ctx.roundRect(lx - tw / 2 - 7, ly - 2, tw + 14, 19, 6)
      else ctx.rect(lx - tw / 2 - 7, ly - 2, tw + 14, 19)
      ctx.fill()
      ctx.fillStyle = '#f1f5f9'; ctx.fillText(n.label, lx, ly + 1)
      ctx.restore()
    }

    // ── Animation loop ─────────────────────────────────────────────
    function animate(ts) {
      if (!st.t0) st.t0 = ts
      const t = (ts - st.t0) / 1000

      ctx.fillStyle = '#080c18'; ctx.fillRect(0, 0, st.W, st.H)

      const bgr = ctx.createRadialGradient(st.W / 2, st.H / 2, 0, st.W / 2, st.H / 2, Math.min(st.W, st.H) * .55)
      bgr.addColorStop(0, 'rgba(6,182,212,.04)'); bgr.addColorStop(.6, 'rgba(59,130,246,.02)'); bgr.addColorStop(1, 'transparent')
      ctx.fillStyle = bgr; ctx.fillRect(0, 0, st.W, st.H)

      ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.02)'; ctx.lineWidth = 1
      for (let x = 0; x < st.W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, st.H); ctx.stroke() }
      for (let y = 0; y < st.H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(st.W, y); ctx.stroke() }
      ctx.restore()

      st.nodes.forEach(n => {
        const ph = n.id.charCodeAt(0) * .41
        n.x = n.bx + Math.sin(t * .38 + ph) * 2.5
        n.y = n.by + Math.cos(t * .29 + ph) * 2.5
      })

      EDGES.forEach(e => drawEdge(e))
      maybeSpawn(t)
      st.particles = st.particles.filter(p => p.p < 1)
      st.particles.forEach(p => { p.p += p.spd; drawParticle(p) })
      ;[...st.nodes].sort((a, b) => a.r - b.r).forEach(n => drawNode(n, t))

      st.animId = requestAnimationFrame(animate)
    }

    layout()
    st.animId = requestAnimationFrame(animate)

    // ── Resize ─────────────────────────────────────────────────────
    const onResize = () => { layout() }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(st.animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // ── Node hit test ───────────────────────────────────────────────
  function nodeAt(mx, my) {
    const nodes = stateRef.current.nodes
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i], dx = mx - n.x, dy = my - n.y
      if (dx * dx + dy * dy < (n.r + 10) ** 2) return n
    }
    return null
  }

  function getCanvasXY(e) {
    const rect = canvasRef.current.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function showCard(n) {
    const col = C[n.type]
    const card = cardRef.current
    if (!card) return
    const typeLabel = { core:'Core Platform', space:'Space Management', comms:'Communications', billing:'Billing & Finance', data:'Analytics', infra:'Integrations' }[n.type]
    card.innerHTML = `
      <div style="width:42px;height:42px;border-radius:11px;background:${col.bg}28;display:flex;align-items:center;justify-content:center;margin-bottom:10px;font-size:20px;">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="${col.lbl}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="8"/>
        </svg>
      </div>
      <div style="font-size:14px;font-weight:700;color:#f8fafc;margin-bottom:3px;">${n.label}</div>
      <div style="font-size:10px;text-transform:uppercase;letter-spacing:1px;color:${col.lbl};margin-bottom:10px;">${typeLabel}</div>
      <div style="font-size:12px;color:#94a3b8;line-height:1.7;margin-bottom:12px;">${n.desc}</div>
      <div style="display:flex;flex-wrap:wrap;gap:5px;">
        ${n.tags.map(tag => `<span style="padding:3px 9px;border-radius:20px;font-size:10px;font-weight:600;color:${col.lbl};border:1px solid ${col.bg}55;background:${col.bg}18;">${tag}</span>`).join('')}
      </div>
    `
    card.style.opacity = '1'
    card.style.transform = 'translateY(0)'
    card.style.pointerEvents = 'auto'
  }

  function hideCard() {
    const card = cardRef.current
    if (!card) return
    card.style.opacity = '0'
    card.style.transform = 'translateY(14px)'
    card.style.pointerEvents = 'none'
  }

  function handleClick(e) {
    const { x, y } = getCanvasXY(e)
    const n = nodeAt(x, y)
    if (n === stateRef.current.selN) {
      stateRef.current.selN = null; hideCard()
    } else {
      stateRef.current.selN = n
      n ? showCard(n) : hideCard()
    }
  }

  function handleMouseMove(e) {
    const { x, y } = getCanvasXY(e)
    const n = nodeAt(x, y)
    stateRef.current.hovN = n
    canvasRef.current.style.cursor = n ? 'pointer' : 'default'
  }

  function handleTouchEnd(e) {
    e.preventDefault()
    const t = e.changedTouches[0]
    const { x, y } = getCanvasXY(t)
    const n = nodeAt(x, y)
    if (n === stateRef.current.selN) {
      stateRef.current.selN = null; hideCard()
    } else {
      stateRef.current.selN = n
      n ? showCard(n) : hideCard()
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: 860 }}>
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Detail card */}
      <div
        ref={cardRef}
        style={{
          position: 'absolute', bottom: 18,
          left: typeof window !== 'undefined' && window.innerWidth < 640 ? '50%' : 18,
          transform: typeof window !== 'undefined' && window.innerWidth < 640 ? 'translateX(-50%) translateY(14px)' : 'translateY(14px)',
          width: typeof window !== 'undefined' && window.innerWidth < 640 ? 'calc(100% - 36px)' : 264,
          background: 'rgba(6,9,20,.97)', border: '1px solid rgba(255,255,255,.12)',
          borderRadius: 16, padding: 18, backdropFilter: 'blur(24px)',
          opacity: 0,
          transition: 'all .3s cubic-bezier(.16,1,.3,1)', pointerEvents: 'none',
        }}
      />

      {/* Legend — desktop only */}
      <div style={{ position:'absolute', bottom:18, right:18, background:'rgba(6,9,20,.94)', border:'1px solid rgba(255,255,255,.09)', borderRadius:12, padding:'12px 16px', backdropFilter:'blur(20px)', display: typeof window !== 'undefined' && window.innerWidth < 640 ? 'none' : 'block' }}>
        <div style={{ fontSize:9, color:'#475569', textTransform:'uppercase', letterSpacing:'1.2px', marginBottom:9, fontWeight:600 }}>Legend</div>
        {[['#06b6d4','Core'],['#3b82f6','Spaces'],['#10b981','Billing'],['#ec4899','Comms'],['#f59e0b','Analytics'],['#8b5cf6','Integrations']].map(([color, label]) => (
          <div key={label} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5, fontSize:11, color:'#94a3b8' }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:color, flexShrink:0 }} />
            {label}
          </div>
        ))}
        <div style={{ height:1, background:'rgba(255,255,255,.07)', margin:'7px 0' }} />
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4, fontSize:11, color:'#94a3b8' }}>
          <div style={{ width:22, height:2, background:'#06b6d4', borderRadius:1, flexShrink:0 }} />Required
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:11, color:'#94a3b8' }}>
          <div style={{ width:22, borderTop:'1px dashed rgba(255,255,255,.3)', flexShrink:0 }} />Optional
        </div>
      </div>


    </div>
  )
}
