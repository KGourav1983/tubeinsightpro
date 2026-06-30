import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function formatNumber(n) {
  if (!n) return "0";
  const num = parseInt(n);
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}

function useCountUp(target, duration = 1400, startWhenVisible) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startWhenVisible) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration, startWhenVisible]);

  return [value, ref];
}

// ============ NAV ============
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "18px 32px",
      background: scrolled ? "rgba(11,14,20,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      transition: "all 0.3s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: "var(--red)", boxShadow: "0 0 12px var(--red)"
        }} />
        <span style={{ fontFamily: "var(--display)", fontSize: 15, letterSpacing: 0.5 }}>
          TUBEINSIGHT <span style={{ color: "var(--red)" }}>PRO</span>
        </span>
      </div>
      <div style={{ display: "flex", gap: 28, alignItems: "center", fontSize: 14, color: "var(--text-dim)" }}>
        <a href="#why" style={{ display: window.innerWidth > 640 ? "block" : "none" }}>Why it works</a>
        <a href="#samples" style={{ display: window.innerWidth > 640 ? "block" : "none" }}>Sample reports</a>
        <a href="#contact" style={{
          background: "var(--red)", color: "#0B0E14", padding: "9px 18px",
          borderRadius: 8, fontWeight: 700, fontSize: 13
        }}>Get your report</a>
      </div>
    </nav>
  );
}

// ============ HERO ============
function Hero() {
  const [viewsVal, viewsRef] = useCountUp(2840000, 1800, true);
  const [reportsVal, reportsRef] = useCountUp(340, 1400, true);
  const [creatorsVal, creatorsRef] = useCountUp(58, 1200, true);

  return (
    <section style={{
      minHeight: "92vh", display: "flex", alignItems: "center",
      padding: "120px 32px 60px", position: "relative", overflow: "hidden"
    }}>
      {/* ambient glow */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,77,77,0.12) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 60, alignItems: "center" }}
        className="hero-grid">
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid var(--line-bright)", borderRadius: 100,
            padding: "6px 14px", fontSize: 12, color: "var(--text-dim)",
            marginBottom: 28, fontFamily: "var(--mono)"
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)" }} />
            AI MODELS ANALYZING LIVE VIDEOS
          </div>

          <h1 style={{
            fontFamily: "var(--display)", fontSize: "clamp(40px, 5.5vw, 72px)",
            lineHeight: 1.02, marginBottom: 24, letterSpacing: -1
          }}>
            STOP GUESSING<br />
            WHY YOUR<br />
            <span style={{ color: "var(--red)" }}>VIDEOS FLOP.</span>
          </h1>

          <p style={{ fontSize: 18, color: "var(--text-dim)", maxWidth: 480, marginBottom: 12, lineHeight: 1.7 }}>
            Every upload leaves a trail of data — title, thumbnail, comments, timing.
            Our AI models read that trail the way an algorithm and a real viewer do,
            then turn it into a report that tells you exactly what to fix
            before your next upload, not after.
          </p>

          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 32,
            fontSize: 13, color: "var(--text-faint)"
          }}>
            <span style={{ fontFamily: "var(--mono)", color: "var(--red)" }}>AI-POWERED</span>
            <span>· vision + language models score every frame, word, and comment</span>
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
            <a href="#contact" style={{
              background: "var(--red)", color: "#0B0E14", padding: "16px 28px",
              borderRadius: 10, fontWeight: 700, fontSize: 15,
              display: "inline-flex", alignItems: "center", gap: 8
            }}>
              Get my video analyzed →
            </a>
            <a href="#samples" style={{
              border: "1px solid var(--line-bright)", padding: "16px 28px",
              borderRadius: 10, fontWeight: 600, fontSize: 15, color: "var(--text)"
            }}>
              See a sample report
            </a>
          </div>

          <div ref={viewsRef} style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 26, fontWeight: 700, color: "var(--text)" }}>
                {formatNumber(viewsVal)}+
              </div>
              <div style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 2 }}>views analyzed</div>
            </div>
            <div ref={reportsRef}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 26, fontWeight: 700, color: "var(--text)" }}>
                {reportsVal}+
              </div>
              <div style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 2 }}>reports generated</div>
            </div>
            <div ref={creatorsRef}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 26, fontWeight: 700, color: "var(--text)" }}>
                {creatorsVal}+
              </div>
              <div style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 2 }}>creators served</div>
            </div>
          </div>
        </div>

        {/* Signature element: live report preview card */}
        <ReportPreviewCard />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============ SIGNATURE: animated report card ============
function ReportPreviewCard() {
  const scores = [
    { label: "TITLE", value: 91 },
    { label: "THUMBNAIL", value: 64 },
    { label: "SEO", value: 78 },
    { label: "TIMING", value: 45 },
  ];
  return (
    <div style={{
      background: "var(--bg-card)", border: "1px solid var(--line)",
      borderRadius: 16, padding: 24, position: "relative",
      boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--text-faint)", letterSpacing: 1 }}>
          AI_REPORT_2026_0630.json
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--line-bright)" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--line-bright)" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--red)" }} />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          border: "4px solid var(--red)", display: "flex", alignItems: "center",
          justifyContent: "center", fontFamily: "var(--display)", fontSize: 18,
          flexShrink: 0
        }}>
          73
        </div>
        <div>
          <div style={{ fontSize: 11, color: "var(--text-faint)", marginBottom: 3 }}>OVERALL SCORE</div>
          <div style={{ fontSize: 14, color: "var(--amber)" }}>Room to grow</div>
        </div>
      </div>

      <div style={{ display: "grid", gap: 12, marginBottom: 22 }}>
        {scores.map((s, i) => (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 11, color: "var(--text-dim)", fontFamily: "var(--mono)" }}>{s.label}</span>
              <span style={{ fontSize: 11, color: "var(--text)", fontFamily: "var(--mono)" }}>{s.value}</span>
            </div>
            <div style={{ height: 5, background: "var(--bg-raised)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${s.value}%`,
                background: s.value > 70 ? "var(--green)" : s.value > 50 ? "var(--amber)" : "var(--red)",
                animation: `growBar 1.6s ease ${i * 0.15}s both`
              }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: "var(--bg-raised)", border: "1px solid var(--line)",
        borderRadius: 10, padding: 14, fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6
      }}>
        <span style={{ color: "var(--red)" }}>→</span> Your thumbnail text is unreadable at small sizes —
        this alone may be costing you 15-20% of potential clicks.
      </div>

      <style>{`
        @keyframes growBar {
          from { width: 0; }
        }
      `}</style>
    </div>
  );
}

// ============ WHY SECTION ============
function WhySection() {
  const reasons = [
    {
      title: "You're flying blind",
      tag: "LANGUAGE MODEL",
      body: "YouTube Studio tells you what happened. It never tells you why. Our AI reads your title, thumbnail, tags, and timing the way an algorithm and an audience actually do, then explains the gap."
    },
    {
      title: "Comments hide the real feedback",
      tag: "LANGUAGE MODEL",
      body: "Buried in 200+ comments is exactly what your next video should be. AI clusters every comment into themes — praise, complaints, requests — so you stop scrolling and start acting."
    },
    {
      title: "Your thumbnail is doing 80% of the work",
      tag: "VISION MODEL",
      body: "Most creators obsess over content and treat the thumbnail as an afterthought. Our AI vision model scores contrast, faces, and emotional pull the same way a scrolling viewer's eye does."
    },
  ];

  return (
    <section id="why" style={{ padding: "100px 32px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 60, maxWidth: 600 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--red)", marginBottom: 14, letterSpacing: 1 }}>
          WHY AI FEEDBACK WORKS
        </div>
        <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1 }}>
          MORE VIEWS START WITH<br />KNOWING WHAT'S BROKEN.
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--line)" }}
        className="why-grid">
        {reasons.map((r, i) => (
          <div key={i} style={{ background: "var(--bg)", padding: "36px 28px" }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18
            }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--text-faint)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{
                fontFamily: "var(--mono)", fontSize: 10, color: "var(--red)",
                border: "1px solid var(--red-dim)", borderRadius: 4, padding: "3px 7px",
                letterSpacing: 0.5
              }}>
                {r.tag}
              </span>
            </div>
            <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 12 }}>{r.title}</h3>
            <p style={{ fontSize: 14, color: "var(--text-dim)", lineHeight: 1.7 }}>{r.body}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 800px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ============ SAMPLE REPORTS ============
// Hardcoded, fully anonymized sample report — no real video, no name, no thumbnail
const DEMO_REPORT = {
  video_data: {
    id: "demo",
    snippet: {
      title: "How I Edited This Video In Under 10 Minutes",
      channelTitle: "Sample Channel",
      publishedAt: "2026-04-18T00:00:00Z",
      thumbnails: {}, // intentionally no thumbnail urls
    },
    statistics: {
      viewCount: 184300,
      likeCount: 9120,
      commentCount: 412,
    },
  },
  analysis: {
    overallScore: 73,
    scores: { title: 91, seo: 78, engagement: 64, description: 52, timing: 45 },
    keyInsight: "Your title is doing the heavy lifting here — strong curiosity gap and clear promise. The thumbnail and posting time are quietly costing you 15-20% of the views this video could have gotten.",
    whatWorked: [
      { point: "Title creates a curiosity gap", detail: "The specific time claim (\"under 10 minutes\") gives viewers a concrete, skimmable reason to click instead of a vague promise." },
      { point: "Strong opening retention", detail: "Comment patterns suggest viewers stayed past the first 30 seconds, which is the biggest single driver of this video's reach." },
    ],
    whatToImprove: [
      { point: "Thumbnail text is too small at preview size", detail: "On mobile, the supporting text is unreadable until full-screen. Increase font size by at least 40% and simplify to 3-4 words max." },
      { point: "Uploaded at a low-traffic window", detail: "Published at 2:00 PM on a Tuesday in a timezone where most of your audience is asleep. Shifting to your audience's evening window could meaningfully lift first-hour velocity." },
    ],
    titleAlternatives: [
      "I Edited a Full Video in 10 Minutes (No Skipping)",
      "The 10-Minute Edit Challenge",
      "10 Minutes. One Video. No Cuts to the Process.",
    ],
    tagSuggestions: ["video editing", "fast editing", "editing tutorial", "editing workflow", "beginner editing tips"],
  },
  thumb_analysis: {
    overallScore: 64,
    verdict: "Good color contrast, but the supporting text disappears at small sizes — exactly where most viewers will actually see it.",
  },
  comment_analysis: {
    sentimentScore: 82,
    summary: "Audience response is largely positive, with the most common thread being requests for a follow-up video breaking down the software shortcuts used. A smaller cluster questions the audio mix in the back half.",
  },
};

function SampleReports() {
  const [open, setOpen] = useState(false);

  return (
    <section id="samples" style={{ padding: "100px 32px", background: "var(--bg-raised)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 50, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--red)", marginBottom: 14, letterSpacing: 1 }}>
              SEE THE FORMAT
            </div>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, maxWidth: 560 }}>
              THIS IS WHAT YOU GET BACK.
            </h2>
          </div>
          <p style={{ color: "var(--text-dim)", fontSize: 14, maxWidth: 320 }}>
            An anonymized sample report below — same structure and depth you'll
            receive for your own video. Real reports go deeper with comment
            mining and thumbnail vision scoring.
          </p>
        </div>

        <button onClick={() => setOpen(true)} style={{
          background: "var(--bg-card)", border: "1px solid var(--line)",
          borderRadius: 16, overflow: "hidden", display: "block",
          width: "100%", maxWidth: 420, padding: 0, textAlign: "left",
          transition: "border-color 0.2s, transform 0.2s"
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          {/* Placeholder thumbnail — no real video art */}
          <div style={{
            width: "100%", aspectRatio: "16 / 9",
            background: "linear-gradient(135deg, #1a1d27, #0f1117)",
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative"
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              border: "2px solid var(--line-bright)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, color: "var(--text-faint)"
            }}>▶</div>
            <div style={{
              position: "absolute", top: 12, left: 12,
              fontFamily: "var(--mono)", fontSize: 10, color: "var(--text-faint)",
              border: "1px solid var(--line-bright)", borderRadius: 4, padding: "3px 8px"
            }}>
              SAMPLE · NO REAL VIDEO
            </div>
          </div>
          <div style={{ padding: 18 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, lineHeight: 1.4, color: "var(--text)" }}>
              {DEMO_REPORT.video_data.snippet.title}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "var(--text-faint)" }}>{formatNumber(DEMO_REPORT.video_data.statistics.viewCount)} views</span>
              <span style={{
                fontFamily: "var(--mono)", fontSize: 13, fontWeight: 700,
                color: DEMO_REPORT.analysis.overallScore > 70 ? "var(--green)" : "var(--amber)"
              }}>
                {DEMO_REPORT.analysis.overallScore}/100
              </span>
            </div>
          </div>
          <div style={{
            borderTop: "1px solid var(--line)", padding: "10px 18px",
            fontSize: 11, color: "var(--text-faint)", display: "flex", justifyContent: "space-between"
          }}>
            <span>ANONYMIZED SAMPLE</span>
            <span style={{ color: "var(--red)" }}>View full report →</span>
          </div>
        </button>
      </div>

      {open && (
        <ReportModal report={DEMO_REPORT} onClose={() => setOpen(false)} />
      )}
    </section>
  );
}

// ============ REPORT MODAL (matches original TubeInsight report styling) ============
function ScoreRing({ score, size = 80 }) {
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1e293b" strokeWidth="8" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1s ease" }} />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        fill={color} fontSize={size * 0.22} fontWeight="700"
        style={{ transform: "rotate(90deg)", transformOrigin: "center" }}>
        {score}
      </text>
    </svg>
  );
}

function ReportStatCard({ label, value }) {
  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12, padding: "16px 20px", flex: 1, minWidth: 100 }}>
      <div style={{ color: "#64748b", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>{label}</div>
      <div style={{ color: "#f8fafc", fontSize: 22, fontWeight: 700, marginTop: 4 }}>{value}</div>
    </div>
  );
}

function ReportTag({ children }) {
  return (
    <span style={{ background: "#1e293b", color: "#f1f5f9", fontSize: 11, padding: "3px 10px", borderRadius: 20, display: "inline-block", margin: "2px 3px" }}>{children}</span>
  );
}

function ReportSection({ title, icon, children }) {
  return (
    <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: 24, marginBottom: 16 }}>
      <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <span>{icon}</span>{title}
      </div>
      {children}
    </div>
  );
}

function ReportModal({ report, onClose }) {
  const v = report.video_data;
  const a = report.analysis;
  const tc = report.thumb_analysis;
  const cc = report.comment_analysis;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!v || !a) return null;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(2,6,23,0.85)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      padding: "40px 20px", overflowY: "auto"
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#020617", border: "1px solid #1e293b",
        borderRadius: 20, maxWidth: 760, width: "100%",
        position: "relative", animation: "modalIn 0.25s ease",
        fontFamily: "'Inter', system-ui, sans-serif", color: "#f8fafc"
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: "fixed", top: 56, right: "calc(50% - 380px + 20px)", zIndex: 2,
          width: 36, height: 36, borderRadius: "50%",
          background: "#0f172a", border: "1px solid #1e293b",
          color: "#f8fafc", fontSize: 16, display: "flex",
          alignItems: "center", justifyContent: "center"
        }}>✕</button>

        <div style={{ padding: "32px 28px 28px" }}>
          {/* Default report badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#1e293b", borderRadius: 20, padding: "4px 12px",
            fontSize: 11, color: "#94a3b8", marginBottom: 20, fontFamily: "monospace"
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3b82f6" }} />
            DEFAULT REPORT — SAMPLE PREVIEW
          </div>

          {/* Video Info */}
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 16, padding: 24, marginBottom: 16, display: "flex", gap: 16, alignItems: "flex-start" }}>
            {v.snippet?.thumbnails?.medium?.url ? (
              <img src={v.snippet.thumbnails.medium.url} alt="thumbnail" style={{ width: 140, borderRadius: 10, flexShrink: 0 }} />
            ) : (
              <div style={{
                width: 140, aspectRatio: "16/9", borderRadius: 10, flexShrink: 0,
                background: "linear-gradient(135deg, #1a1d27, #0f1117)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#475569", fontSize: 18
              }}>▶</div>
            )}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.4, marginBottom: 8 }}>{v.snippet?.title}</div>
              <div style={{ color: "#64748b", fontSize: 13, marginBottom: 12 }}>
                {v.snippet?.channelTitle} · {v.snippet?.publishedAt && new Date(v.snippet.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <ReportStatCard label="Views" value={formatNumber(v.statistics?.viewCount)} />
                <ReportStatCard label="Likes" value={formatNumber(v.statistics?.likeCount)} />
                <ReportStatCard label="Comments" value={formatNumber(v.statistics?.commentCount)} />
              </div>
            </div>
          </div>

          {/* Key Insight */}
          {a.keyInsight && (
            <div style={{ background: "linear-gradient(135deg, #1e1b4b, #1e1052)", border: "1px solid #312e81", borderRadius: 16, padding: "20px 24px", marginBottom: 16, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 28 }}>💡</div>
              <div>
                <div style={{ fontSize: 11, color: "#818cf8", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Key Insight</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#e0e7ff" }}>{a.keyInsight}</div>
              </div>
            </div>
          )}

          {/* Scores */}
          {a.scores && (
            <ReportSection title="Performance Scores" icon="📊">
              <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
                <div style={{ textAlign: "center" }}>
                  <ScoreRing score={a.overallScore} size={90} />
                  <div style={{ fontSize: 11, color: "#64748b", marginTop: 6 }}>Overall</div>
                </div>
                <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {Object.entries(a.scores).map(([key, val]) => (
                    <div key={key}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 12, color: "#94a3b8", textTransform: "capitalize" }}>{key}</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: val >= 70 ? "#22c55e" : val >= 45 ? "#f59e0b" : "#ef4444" }}>{val}</span>
                      </div>
                      <div style={{ background: "#1e293b", borderRadius: 4, height: 6 }}>
                        <div style={{ height: 6, borderRadius: 4, width: `${val}%`, background: val >= 70 ? "#22c55e" : val >= 45 ? "#f59e0b" : "#ef4444" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ReportSection>
          )}

          {/* Thumbnail score, if available */}
          {tc && (
            <ReportSection title="Thumbnail Scorer" icon="🖼️">
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  {v.snippet?.thumbnails?.high?.url ? (
                    <img src={v.snippet.thumbnails.high.url} alt="" style={{ width: 160, borderRadius: 10, display: "block", border: "1px solid #1e293b" }} />
                  ) : (
                    <div style={{
                      width: 160, aspectRatio: "16/9", borderRadius: 10,
                      background: "linear-gradient(135deg, #1a1d27, #0f1117)",
                      border: "1px solid #1e293b",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#475569", fontSize: 20
                    }}>▶</div>
                  )}
                  <div style={{
                    position: "absolute", top: -8, right: -8,
                    background: tc.overallScore >= 75 ? "#22c55e" : tc.overallScore >= 50 ? "#f59e0b" : "#ef4444",
                    color: "#000", fontWeight: 800, fontSize: 14,
                    width: 36, height: 36, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "3px solid #020617"
                  }}>{tc.overallScore}</div>
                </div>
                <div style={{ flex: 1, fontSize: 13, color: "#94a3b8", fontStyle: "italic", lineHeight: 1.6 }}>
                  "{tc.verdict}"
                </div>
              </div>
            </ReportSection>
          )}

          {/* Comment sentiment, if available */}
          {cc && (
            <ReportSection title="Comment Sentiment" icon="💬">
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <ScoreRing score={cc.sentimentScore} size={70} />
                <div style={{ flex: 1, fontSize: 13, color: "#94a3b8", lineHeight: 1.7 }}>{cc.summary}</div>
              </div>
            </ReportSection>
          )}

          {/* What Worked */}
          {a.whatWorked?.length > 0 && (
            <ReportSection title="What Worked" icon="✅">
              {a.whatWorked.map((w, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < a.whatWorked.length - 1 ? 16 : 0, paddingBottom: i < a.whatWorked.length - 1 ? 16 : 0, borderBottom: i < a.whatWorked.length - 1 ? "1px solid #1e293b" : "none" }}>
                  <div style={{ width: 28, height: 28, background: "#052e16", border: "1px solid #166534", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>✓</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#4ade80", marginBottom: 4 }}>{w.point}</div>
                    <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{w.detail}</div>
                  </div>
                </div>
              ))}
            </ReportSection>
          )}

          {/* What to Improve */}
          {a.whatToImprove?.length > 0 && (
            <ReportSection title="What to Improve" icon="🔧">
              {a.whatToImprove.map((w, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < a.whatToImprove.length - 1 ? 16 : 0, paddingBottom: i < a.whatToImprove.length - 1 ? 16 : 0, borderBottom: i < a.whatToImprove.length - 1 ? "1px solid #1e293b" : "none" }}>
                  <div style={{ width: 28, height: 28, background: "#2d1515", border: "1px solid #7f1d1d", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>!</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#fca5a5", marginBottom: 4 }}>{w.point}</div>
                    <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6 }}>{w.detail}</div>
                  </div>
                </div>
              ))}
            </ReportSection>
          )}

          {/* Title Alternatives */}
          {a.titleAlternatives?.length > 0 && (
            <ReportSection title="Better Title Options" icon="✏️">
              <div style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>
                Original: <span style={{ color: "#94a3b8" }}>"{v.snippet?.title}"</span>
              </div>
              {a.titleAlternatives.map((t, i) => (
                <div key={i} style={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 10, padding: "12px 16px", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, color: "#e2e8f0" }}>{t}</span>
                </div>
              ))}
            </ReportSection>
          )}

          {/* Tags */}
          {a.tagSuggestions?.length > 0 && (
            <ReportSection title="Suggested Tags" icon="🏷️">
              <div>{a.tagSuggestions.map((t, i) => <ReportTag key={i}>{t}</ReportTag>)}</div>
            </ReportSection>
          )}

          {/* CTA footer */}
          <div style={{
            background: "linear-gradient(135deg, #1e1b4b, #0c1a2e)", border: "1px solid #312e81",
            borderRadius: 16, padding: "20px 24px", textAlign: "center", marginTop: 8
          }}>
            <div style={{ fontSize: 13, color: "#c7d2fe", marginBottom: 14, lineHeight: 1.6 }}>
              This is a default-tier preview. Full reports also include deep comment mining,
              GPT-4o thumbnail vision scoring, and a rewritten description.
            </div>
            <a href="#contact" onClick={onClose} style={{
              display: "inline-block", background: "#FF4D4D", color: "#0B0E14",
              padding: "12px 24px", borderRadius: 10, fontWeight: 700, fontSize: 14
            }}>
              Get this for my video →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 820px) {
          button[style*="position: fixed"][style*="top: 56"] {
            position: absolute !important;
            right: 18px !important;
            top: 18px !important;
          }
        }
      `}</style>
    </div>
  );
}


// ============ CONTACT FORM ============
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", videoUrl: "", notes: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.videoUrl) {
      setStatus("error");
      setErrMsg("Email and video URL are required.");
      return;
    }
    setStatus("sending");
    setErrMsg("");
    try {
      // Save lead to Supabase
      const { error } = await supabase.from("leads").insert({
        name: form.name,
        email: form.email,
        video_url: form.videoUrl,
        notes: form.notes,
      });
      if (error) throw new Error(error.message);
      setStatus("sent");
      setForm({ name: "", email: "", videoUrl: "", notes: "" });
    } catch (err) {
      setStatus("error");
      setErrMsg(err.message || "Something went wrong. Try again or email directly.");
    }
  }

  return (
    <section id="contact" style={{ padding: "100px 32px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--red)", marginBottom: 14, letterSpacing: 1 }}>
            GET YOUR REPORT
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, marginBottom: 16 }}>
            SEND YOUR VIDEO.<br />WE'LL DO THE REST.
          </h2>
          <p style={{ color: "var(--text-dim)", fontSize: 15, maxWidth: 460, margin: "0 auto" }}>
            Drop your YouTube URL below. We'll run the full analysis and send your
            report link — typically within 24 hours.
          </p>
        </div>

        {status === "sent" ? (
          <div style={{
            background: "var(--bg-card)", border: "1px solid var(--green)",
            borderRadius: 16, padding: "48px 32px", textAlign: "center"
          }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>✓</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Got it.</div>
            <div style={{ color: "var(--text-dim)", fontSize: 14 }}>
              We'll review your video and send your report link by email shortly.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            background: "var(--bg-card)", border: "1px solid var(--line)",
            borderRadius: 16, padding: 32
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}
              className="form-grid">
              <Field label="Your name (optional)">
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Alex Chen" style={inputStyle} />
              </Field>
              <Field label="Email *">
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@channel.com" type="email" required style={inputStyle} />
              </Field>
            </div>

            <Field label="YouTube video URL *" style={{ marginBottom: 16 }}>
              <input value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })}
                placeholder="https://youtube.com/watch?v=..." required style={inputStyle} />
            </Field>

            <Field label="Anything specific you want us to look at? (optional)" style={{ marginBottom: 24 }}>
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
                placeholder="e.g. Why did this video underperform compared to my usual average?"
                rows={4} style={{ ...inputStyle, resize: "vertical", fontFamily: "var(--body)" }} />
            </Field>

            {status === "error" && (
              <div style={{
                background: "#2d1515", border: "1px solid #7f1d1d", borderRadius: 8,
                padding: "10px 14px", color: "#fca5a5", fontSize: 13, marginBottom: 16
              }}>{errMsg}</div>
            )}

            <button type="submit" disabled={status === "sending"} style={{
              width: "100%", padding: 16, background: status === "sending" ? "var(--line-bright)" : "var(--red)",
              border: "none", borderRadius: 10, color: "#0B0E14", fontWeight: 700, fontSize: 15,
              cursor: status === "sending" ? "not-allowed" : "pointer"
            }}>
              {status === "sending" ? "Sending..." : "Request my report →"}
            </button>
          </form>
        )}
      </div>

      <style>{`
        @media (max-width: 560px) {
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Field({ label, children, style }) {
  return (
    <div style={style}>
      <label style={{ fontSize: 12, color: "var(--text-dim)", display: "block", marginBottom: 7 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", background: "var(--bg-raised)", border: "1px solid var(--line)",
  borderRadius: 8, padding: "12px 14px", color: "var(--text)", fontSize: 14, outline: "none"
};

// ============ FOOTER ============
function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--line)", padding: "40px 32px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 16
    }}>
      <div style={{ fontFamily: "var(--display)", fontSize: 13, color: "var(--text-faint)" }}>
        TUBEINSIGHT <span style={{ color: "var(--red)" }}>PRO</span>
      </div>
      <div style={{ fontSize: 12, color: "var(--text-faint)" }}>
        AI reports for YouTube creators · {new Date().getFullYear()}
      </div>
    </footer>
  );
}

// ============ APP ROOT ============
export default function App() {
  return (
    <div>
      <Nav />
      <Hero />
      <WhySection />
      <SampleReports />
      <ContactSection />
      <Footer />
    </div>
  );
}
