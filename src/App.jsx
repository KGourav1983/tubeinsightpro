import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Manually curated report IDs to feature — swap these for real ones
const FEATURED_REPORT_IDS = [
  // "dQw4w9WgXcQ-k7x2m9",
];

const TUBEINSIGHT_APP_URL = "https://tubeinsight.pages.dev";
const ADMIN_SECRET_PATH = "vault-9k2x"; // /reports/vault-9k2x

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
            NOW ANALYZING LIVE VIDEOS
          </div>

          <h1 style={{
            fontFamily: "var(--display)", fontSize: "clamp(40px, 5.5vw, 72px)",
            lineHeight: 1.02, marginBottom: 24, letterSpacing: -1
          }}>
            STOP GUESSING<br />
            WHY YOUR<br />
            <span style={{ color: "var(--red)" }}>VIDEOS FLOP.</span>
          </h1>

          <p style={{ fontSize: 18, color: "var(--text-dim)", maxWidth: 480, marginBottom: 36, lineHeight: 1.7 }}>
            Every upload leaves a trail of data — title, thumbnail, comments, timing.
            We turn that trail into a report that tells you exactly what to fix
            before your next upload, not after.
          </p>

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
              See a real report
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
          REPORT_2026_0630.json
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
      body: "YouTube Studio tells you what happened. It never tells you why. We read your title, thumbnail, tags, and timing the way an algorithm and an audience actually do, then explain the gap."
    },
    {
      title: "Comments hide the real feedback",
      body: "Buried in 200+ comments is exactly what your next video should be. We cluster every comment into themes — praise, complaints, requests — so you stop scrolling and start acting."
    },
    {
      title: "Your thumbnail is doing 80% of the work",
      body: "Most creators obsess over content and treat the thumbnail as an afterthought. Our vision model scores contrast, faces, and emotional pull the same way a scrolling viewer's eye does."
    },
  ];

  return (
    <section id="why" style={{ padding: "100px 32px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ marginBottom: 60, maxWidth: 600 }}>
        <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--red)", marginBottom: 14, letterSpacing: 1 }}>
          WHY CREATORS USE THIS
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
              fontFamily: "var(--mono)", fontSize: 13, color: "var(--text-faint)", marginBottom: 18
            }}>
              {String(i + 1).padStart(2, "0")}
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
function SampleReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (FEATURED_REPORT_IDS.length === 0) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("reports")
        .select("*")
        .in("id", FEATURED_REPORT_IDS);
      setReports(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section id="samples" style={{ padding: "100px 32px", background: "var(--bg-raised)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 50, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--red)", marginBottom: 14, letterSpacing: 1 }}>
              SEE IT FOR YOURSELF
            </div>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.1, maxWidth: 560 }}>
              REAL REPORTS. REAL VIDEOS.
            </h2>
          </div>
          <p style={{ color: "var(--text-dim)", fontSize: 14, maxWidth: 320 }}>
            These are default-tier reports. Every video we analyze can go deeper —
            comment mining, thumbnail vision scoring, competitor comparisons.
          </p>
        </div>

        {loading && (
          <div style={{ color: "var(--text-faint)", fontSize: 14, padding: "40px 0", textAlign: "center" }}>
            Loading sample reports...
          </div>
        )}

        {!loading && reports.length === 0 && (
          <div style={{
            border: "1px dashed var(--line-bright)", borderRadius: 16,
            padding: "60px 32px", textAlign: "center", color: "var(--text-dim)"
          }}>
            <div style={{ fontSize: 15, marginBottom: 8 }}>Sample reports coming soon.</div>
            <div style={{ fontSize: 13, color: "var(--text-faint)" }}>
              Want to be the first featured creator? <a href="#contact" style={{ color: "var(--red)" }}>Get in touch →</a>
            </div>
          </div>
        )}

        {!loading && reports.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
            {reports.map((r) => (
              <SampleReportCard key={r.id} report={r} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SampleReportCard({ report }) {
  const v = report.video_data;
  const a = report.analysis;
  if (!v || !a) return null;

  return (
    <a href={`${TUBEINSIGHT_APP_URL}/report/${report.id}`} target="_blank" rel="noreferrer"
      style={{
        background: "var(--bg-card)", border: "1px solid var(--line)",
        borderRadius: 14, overflow: "hidden", display: "block",
        transition: "border-color 0.2s, transform 0.2s"
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--red)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {v.snippet?.thumbnails?.medium?.url && (
        <img src={v.snippet.thumbnails.medium.url} alt="" style={{ width: "100%", height: 160, objectFit: "cover" }} />
      )}
      <div style={{ padding: 18 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, lineHeight: 1.4 }}>
          {v.snippet?.title?.slice(0, 60)}{v.snippet?.title?.length > 60 ? "…" : ""}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--text-faint)" }}>{formatNumber(v.statistics?.viewCount)} views</span>
          <span style={{
            fontFamily: "var(--mono)", fontSize: 13, fontWeight: 700,
            color: a.overallScore > 70 ? "var(--green)" : a.overallScore > 45 ? "var(--amber)" : "var(--red)"
          }}>
            {a.overallScore}/100
          </span>
        </div>
      </div>
      <div style={{
        borderTop: "1px solid var(--line)", padding: "10px 18px",
        fontSize: 11, color: "var(--text-faint)", display: "flex", justifyContent: "space-between"
      }}>
        <span>DEFAULT REPORT</span>
        <span style={{ color: "var(--red)" }}>View full report →</span>
      </div>
    </a>
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

            <div style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "var(--text-faint)" }}>
              Or email directly: <a href="mailto:kesarkar.gourav@gmail.com" style={{ color: "var(--red)" }}>kesarkar.gourav@gmail.com</a>
            </div>
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

// ============ ADMIN REPORTS LIST (secret URL) ============
function AdminReportsList() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("reports")
        .select("id, video_id, video_url, created_at, video_data, analysis")
        .order("created_at", { ascending: false });
      setReports(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", padding: "40px 32px", fontFamily: "var(--body)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--display)", fontSize: 28, marginBottom: 8 }}>ALL REPORTS</h1>
        <p style={{ color: "var(--text-faint)", fontSize: 13, marginBottom: 32 }}>
          {reports.length} reports · private link, not indexed
        </p>

        {loading && <div style={{ color: "var(--text-dim)" }}>Loading...</div>}

        <div style={{ display: "grid", gap: 10 }}>
          {reports.map(r => (
            <a key={r.id} href={`${TUBEINSIGHT_APP_URL}/report/${r.id}`} target="_blank" rel="noreferrer"
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "var(--bg-card)", border: "1px solid var(--line)",
                borderRadius: 10, padding: "14px 18px", fontSize: 14
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {r.video_data?.snippet?.thumbnails?.default?.url && (
                  <img src={r.video_data.snippet.thumbnails.default.url} alt="" style={{ width: 48, height: 36, borderRadius: 4, objectFit: "cover" }} />
                )}
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>
                    {r.video_data?.snippet?.title?.slice(0, 70) || r.video_id}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-faint)", fontFamily: "var(--mono)" }}>
                    {r.id} · {new Date(r.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div style={{
                fontFamily: "var(--mono)", fontWeight: 700,
                color: (r.analysis?.overallScore || 0) > 70 ? "var(--green)" : "var(--amber)"
              }}>
                {r.analysis?.overallScore ?? "—"}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ APP ROOT ============
export default function App() {
  const path = window.location.pathname;

  if (path === `/reports/${ADMIN_SECRET_PATH}`) {
    return <AdminReportsList />;
  }

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
