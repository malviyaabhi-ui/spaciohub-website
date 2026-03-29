import React, { useState } from 'react'
import { useModal } from '../components/ModalContext'
import SEO from '../components/SEO'
import { POSTS } from './blogPosts'

function RenderContent({ blocks, openModal }) {
  return (
    <div>
      {blocks.map((block, i) => {
        if (block.type === 'intro') return (
          <div key={i} style={{ fontSize: 17, color: '#374151', lineHeight: 1.85, marginBottom: 36, borderLeft: '3px solid #00c07a', paddingLeft: 20 }}>
            {block.text.split('\n\n').map((p, j) => <p key={j} style={{ marginBottom: 12 }}>{p}</p>)}
          </div>
        )
        if (block.type === 'h2') return (
          <h2 key={i} style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginTop: 48, marginBottom: 16, letterSpacing: -0.5 }}>{block.text}</h2>
        )
        if (block.type === 'text') return (
          <div key={i} style={{ marginBottom: 24 }}>
            {block.text.split('\n\n').map((para, j) => (
              <p key={j} style={{ fontSize: 15, color: '#374151', lineHeight: 1.85, marginBottom: 14 }}
                dangerouslySetInnerHTML={{ __html: para
                  .replace(/\n/g, '<br/>')
                  .replace(/\*\*([^*]+)\*\*/g, '<strong style="color:#0f172a">$1</strong>') }} />
            ))}
          </div>
        )
        if (block.type === 'cta') return (
          <div key={i} style={{ marginTop: 56, background: 'linear-gradient(135deg,#0f172a,#1e293b)', borderRadius: 20, padding: '40px 36px', textAlign: 'center' }}>
            <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.7, marginBottom: 24 }}>{block.plan}</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://go.spaciohub.com" target="_blank" rel="noreferrer" className="btn btn-primary btn-lg" style={{ boxShadow: '0 0 32px rgba(0,192,122,0.35)' }}>
                Start free 14-day trial
              </a>
              <button onClick={openModal} style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.2)', color: '#fff', background: 'rgba(255,255,255,0.06)', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                Request a Demo
              </button>
            </div>
          </div>
        )
        return null
      })}
    </div>
  )
}

function PostCard({ post, onClick }) {
  return (
    <button onClick={onClick} style={{ textAlign: 'left', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 20, overflow: 'hidden', cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.25s', display: 'flex', flexDirection: 'column', width: '100%' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.10)'; e.currentTarget.style.borderColor = post.color + '44' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = '#e2e8f0' }}>
      <div style={{ height: 4, background: `linear-gradient(90deg,${post.color},${post.color}88)` }} />
      <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span style={{ fontSize: 20 }}>{post.icon}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: post.color, textTransform: 'uppercase', letterSpacing: '0.8px' }}>{post.category}</span>
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', marginBottom: 10, lineHeight: 1.3, letterSpacing: -0.3 }}>{post.title}</h3>
        <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.7, flex: 1, marginBottom: 20 }}>{post.excerpt}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: '#94a3b8' }}>{post.date} · {post.readTime}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: post.color }}>Read →</span>
        </div>
      </div>
    </button>
  )
}

export default function Blog() {
  const { openModal } = useModal()
  const [activePost, setActivePost] = useState(null)
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...new Set(POSTS.map(p => p.category))]
  const filtered = filter === 'All' ? POSTS : POSTS.filter(p => p.category === filter)

  const open = (post) => { setActivePost(post); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const close = () => { setActivePost(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <>
      <SEO
        title={activePost ? `${activePost.title} — SpacioHub Blog` : 'Blog — SpacioHub Workspace Insights'}
        description={activePost ? activePost.excerpt : 'Workspace management tips, how-to guides, and product updates from the SpacioHub team.'}
        path="/blog"
      />
      <main style={{ paddingTop: 64, fontFamily: 'Inter,sans-serif' }}>

        {!activePost ? (
          <>
            {/* Hero */}
            <section style={{ background: '#060d1a', borderBottom: '1px solid #1e293b', padding: '80px 0 64px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '20%', left: '5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,192,122,0.08),transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(15,121,155,0.08),transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
              <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
                <span className="tag" style={{ color: '#00c07a' }}>Blog</span>
                <h1 style={{ fontSize: 'clamp(36px,5vw,60px)', fontWeight: 900, color: '#fff', marginBottom: 16, letterSpacing: -2, lineHeight: 1.05 }}>
                  Workspace insights and<br />
                  <span style={{ background: 'linear-gradient(135deg,#00c07a,#0cb8b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>practical guides</span>
                </h1>
                <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', maxWidth: 460, margin: '0 auto' }}>
                  Tips on room booking, hybrid work, visitor management, and space optimisation from the SpacioHub team.
                </p>
              </div>
            </section>

            {/* Category filter */}
            <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '16px 0', position: 'sticky', top: 64, zIndex: 100 }}>
              <div className="container" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setFilter(cat)}
                    style={{ padding: '6px 16px', borderRadius: 20, border: `1px solid ${filter === cat ? '#00c07a' : '#e2e8f0'}`, background: filter === cat ? '#00c07a' : '#fff', color: filter === cat ? '#fff' : '#374151', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter,sans-serif', transition: 'all 0.15s' }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts grid */}
            <section style={{ padding: '56px 0 80px', background: '#f8fafc' }}>
              <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ marginBottom: 64 }}>
                  {filtered.map(post => (
                    <PostCard key={post.slug} post={post} onClick={() => open(post)} />
                  ))}
                </div>

                {/* Newsletter */}
                <div style={{ background: 'linear-gradient(135deg,#0f172a,#1e293b)', borderRadius: 20, padding: '48px 40px', textAlign: 'center' }}>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Get new posts in your inbox</h3>
                  <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>New articles every week. No spam, ever.</p>
                  <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 420, margin: '0 auto' }}>
                    <input type="email" placeholder="your@email.com" required
                      style={{ flex: 1, minWidth: 180, background: '#1e293b', border: '1px solid #334155', borderRadius: 8, padding: '10px 16px', fontSize: 14, color: '#fff', fontFamily: 'Inter,sans-serif', outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = '#00c07a'}
                      onBlur={e => e.target.style.borderColor = '#334155'} />
                    <button type="submit" className="btn btn-primary">Subscribe</button>
                  </form>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Article view */
          <>
            {/* Article hero */}
            <div style={{ background: `linear-gradient(135deg,${activePost.bg},#fff)`, borderBottom: '1px solid #e2e8f0', padding: '56px 0 40px' }}>
              <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
                <button onClick={close} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: 13, fontFamily: 'Inter,sans-serif', marginBottom: 28, padding: 0 }}>
                  ← Back to Blog
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: 22 }}>{activePost.icon}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: activePost.color, textTransform: 'uppercase', letterSpacing: '1px' }}>{activePost.category}</span>
                </div>
                <h1 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 900, color: '#0f172a', marginBottom: 20, lineHeight: 1.15, letterSpacing: -1 }}>{activePost.title}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: activePost.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#fff' }}>S</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>SpacioHub Team</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{activePost.date} · {activePost.readTime}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Article body */}
            <section style={{ padding: '48px 0 80px', background: '#fff' }}>
              <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
                <RenderContent blocks={activePost.content} openModal={openModal} />

                {/* Bottom nav */}
                <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <button onClick={close} style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: 8, padding: '8px 20px', fontSize: 13, color: '#64748b', cursor: 'pointer', fontFamily: 'Inter,sans-serif' }}>
                    All posts
                  </button>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a href="https://linkedin.com/company/spaciohub" target="_blank" rel="noreferrer" style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12, color: '#64748b', textDecoration: 'none', fontWeight: 600 }}>Share on LinkedIn</a>
                    <a href="https://twitter.com/spaciohub" target="_blank" rel="noreferrer" style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12, color: '#64748b', textDecoration: 'none', fontWeight: 600 }}>Share on X</a>
                  </div>
                </div>

                {/* Related posts */}
                <div style={{ marginTop: 56 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 20 }}>More from SpacioHub</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {POSTS.filter(p => p.slug !== activePost.slug).slice(0, 2).map(post => (
                      <PostCard key={post.slug} post={post} onClick={() => open(post)} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  )
}
