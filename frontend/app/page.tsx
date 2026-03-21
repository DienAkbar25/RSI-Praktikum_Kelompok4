'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';


const anggotaKelompok = [
  { nama: 'Aulia Rahma Bidayah', nim: 'L0224003', foto: '/aulia.jpg' },
  { nama: 'Prayuda Afifan Handoyo', nim: 'L0224008', foto: '/yuda.jpg' },
  { nama: 'Dien Akmalin Rizqi Akbar', nim: 'L0224028', foto: '/dien.jpg' },
  { nama: 'Gloria Dana Praisylia', nim: 'L0224043', foto: '/gloria.jpg' },
];

// ─── Efek suara klik ──────
function playCardSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(760, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28);
    osc.start();
    osc.stop(ctx.currentTime + 0.28);
  } catch (_) {}
}

// ─── Hook counter animasi ──────────
function useCountUp(target: number, duration = 1200, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

// ─── Komponen Modal Detail ────────
function MemberModal({
  member,
  onClose,
  darkMode,
}: {
  member: (typeof anggotaKelompok)[0];
  onClose: () => void;
  darkMode: boolean;
}) {
  const lightTextColor = '#2d1b4e';
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.82, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.88, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        className="relative z-10 rounded-2xl overflow-hidden max-w-sm w-full"
        style={{
          background: darkMode
            ? 'linear-gradient(145deg,#120826,#0d0420)'
            : 'linear-gradient(145deg,#ffffff,#f0eaff)',
          border: '1px solid rgba(167,139,250,0.4)',
          boxShadow: '0 30px 80px rgba(120,60,200,0.45)',
        }}
      >
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg,#7c3aed,#06b6d4,#ec4899)' }} />
        <div className="p-7 flex flex-col items-center gap-4">
          <motion.img
            src={member.foto}
            alt={member.nama}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.08, type: 'spring', stiffness: 300 }}
            className="w-32 h-32 rounded-full border-4 border-purple-400 object-cover shadow-lg shadow-purple-500/30"
          />
          <div className="text-center">
            <h2 className="text-lg font-bold" style={{ color: darkMode ? '#f0eaff' : lightTextColor }}>
              {member.nama}
            </h2>
            <p className="text-xs font-mono text-purple-400 tracking-widest mt-0.5">
              {member.nim}
            </p>
          </div>
          <button
            onClick={onClose}
            className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-85"
            style={{ background: 'linear-gradient(90deg,#7c3aed,#0891b2)' }}
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Komponen Utama ─────────
export default function Home() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [selected, setSelected] = useState<(typeof anggotaKelompok)[0] | null>(null);
  const [mounted, setMounted] = useState(false); // Untuk client-only stars & meteors

  const countMembers = useCountUp(4, 1000, !open);
  const countGroup = useCountUp(1, 800, !open);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCardClick = (m: (typeof anggotaKelompok)[0]) => {
    playCardSound();
    setSelected(m);
  };

  // Warna teks light mode (kontras tinggi)
  const lightTextColor = '#1e0a3c';      // ungu sangat gelap untuk judul
  const lightSecondaryColor = '#4a2a6e'; // ungu gelap untuk deskripsi
  const lightPurpleAccent = '#8b5cf6';   // ungu terang untuk aksen (purple-500)

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ color: darkMode ? undefined : lightTextColor }}
    >
      {/* BACKGROUND */}
      {darkMode ? (
        <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#0a0118] via-[#14022e] to-[#020003]" />
      ) : (
        <div
          className="fixed inset-0 -z-20"
          style={{
            background: 'linear-gradient(135deg, #F5E6DC 0%, #EEADC5 30%, #E6BEAE 60%, #E29C9C 90%)',
          }}
        />
      )}

      {/* CENTER GLOW */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-purple-500 opacity-10 blur-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* STARS & METEORS — hanya dirender di client */}
      {mounted && darkMode && (
        <>
          <div className="fixed inset-0 -z-10">
            {[...Array(80)].map((_, i) => {
              const size = Math.random() * 3 + 1;
              const top = Math.random() * 100;
              const left = Math.random() * 100;
              return (
                <motion.div
                  key={i}
                  className="absolute bg-white rounded-full"
                  style={{
                    width: size + 'px',
                    height: size + 'px',
                    top: top + '%',
                    left: left + '%',
                  }}
                  animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
                  transition={{ duration: Math.random() * 6 + 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              );
            })}
          </div>
          {[...Array(3)].map((_, i) => {
            const top = Math.random() * 50;
            const left = Math.random() * 20;
            return (
              <motion.div
                key={i}
                className="fixed w-[2px] h-[80px] bg-white opacity-40 blur-sm -z-10"
                style={{ top: top + '%', left: left + '%' }}
                animate={{ x: [0, 800], y: [0, 400], opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, repeatDelay: Math.random() * 10 + 5 }}
              />
            );
          })}
        </>
      )}

      {/* NEBULA */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-purple-400 opacity-5 blur-[180px] top-[-100px] left-[-120px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-300 opacity-5 blur-[160px] bottom-[-100px] right-[-120px]" />
      </div>

      {/* HEADER */}
      <header className="p-6 relative z-10 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-purple-300">
          RSI-Praktikum_Kelompok4
        </h1>
        <button
          onClick={() => setDarkMode((d) => !d)}
          title="Toggle dark/light mode"
          className="w-14 h-7 rounded-full relative focus:outline-none"
          style={{
            background: darkMode
              ? 'linear-gradient(90deg,#4c1d95,#0c4a6e)'
              : 'linear-gradient(90deg,#fde68a,#fbbf24)',
          }}
        >
          <motion.div
            className="absolute top-1 w-5 h-5 rounded-full bg-white shadow flex items-center justify-center text-[11px]"
            animate={{ x: darkMode ? 2 : 26 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {darkMode ? '🌙' : '☀️'}
          </motion.div>
        </button>
      </header>

      {/* MAIN */}
      <main className="flex items-center justify-center min-h-[80vh] px-4 relative z-10">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl"
            >
              <h1
                className="text-4xl md:text-6xl font-bold leading-tight"
                style={{ color: darkMode ? '#ffffff' : lightTextColor }}
              >
                Welcome to Our Team <br />
                <span style={{ color: darkMode ? '#c084fc' : lightPurpleAccent }}>Website</span>
              </h1>
              <p className="mt-4" style={{ color: darkMode ? '#d1d5db' : lightSecondaryColor }}>
                Klik tombol untuk melihat anggota kelompok
              </p>
              <div className="mt-8 flex justify-center gap-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-300">{countMembers}</div>
                  <div className="text-xs mt-0.5" style={{ color: darkMode ? '#9ca3af' : lightSecondaryColor }}>
                    Anggota
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-300">{countGroup}</div>
                  <div className="text-xs mt-0.5" style={{ color: darkMode ? '#9ca3af' : lightSecondaryColor }}>
                    Kelompok
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(true)}
                className="mt-8 px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-700 transition shadow-lg hover:scale-110 hover:shadow-purple-500/40"
              >
                Kelompok 4 →
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="members"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-6xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-center mb-12 text-purple-300">
                Anggota Kelompok
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {anggotaKelompok.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    whileHover={{ scale: 1.08, y: -10 }}
                    onClick={() => handleCardClick(m)}
                    className={`p-6 rounded-xl backdrop-blur-xl border text-center transition cursor-pointer
                      ${i % 2 === 0
                        ? 'bg-gradient-to-br from-purple-500/10 to-transparent border-purple-400/20'
                        : 'bg-gradient-to-br from-white/10 to-transparent border-white/10'}
                      hover:shadow-2xl hover:shadow-purple-500/20`}
                  >
                    <motion.img
                      src={m.foto}
                      alt={m.nama}
                      whileHover={{ scale: 1.1 }}
                      className="w-32 h-32 rounded-full mx-auto mb-5 border-4 border-purple-400 shadow-lg shadow-purple-500/40 object-cover"
                    />
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: darkMode ? '#ffffff' : lightTextColor }}
                    >
                      {m.nama}
                    </h3>
                    <p style={{ color: darkMode ? '#c084fc' : lightPurpleAccent }} className="font-medium">
                      {m.nim}
                    </p>
                    <p
                      className="text-[11px] mt-2"
                      style={{ color: darkMode ? '#c084fc80' : `${lightPurpleAccent}80` }}
                    >
                      Klik untuk detail →
                    </p>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-12">
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-white transition"
                  style={{ color: darkMode ? undefined : lightSecondaryColor }}
                >
                  ← Kembali
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="text-center py-6 text-gray-400 border-t border-white/10 relative z-10">
        RSI-Praktikum_Kelompok4
      </footer>

      <AnimatePresence>
        {selected && (
          <MemberModal
            member={selected}
            onClose={() => setSelected(null)}
            darkMode={darkMode}
          />
        )}
      </AnimatePresence>
    </div>
  );
}