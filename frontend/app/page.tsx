'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const anggotaKelompok = [
  {
    nama: 'Aulia Rahma Bidayah',
    nim: 'L0224003',
    foto: '/aulia.jpg', 
  },
  {
    nama: 'Prayuda Afifan Handoyo',
    nim: 'L0224008',
    foto: '/aulia.jpg',
  },
  {
    nama: 'Dien Akmalin Rizqi Akbar',
    nim: 'L0224028',
    foto: '/aulia.jpg',
  },
  {
    nama: 'Gloria Dana Praisylia',
    nim: 'L0224043',
    foto: '/aulia.jpg',
  },
];

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#0a0118] via-[#14022e] to-[#020003]" />

      {/* CENTER GLOW */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[800px] h-[800px] bg-purple-500 opacity-10 blur-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* STARS */}
      <div className="fixed inset-0 -z-10">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 6 + 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* METEOR */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-[2px] h-[80px] bg-white opacity-40 blur-sm -z-10"
          style={{
            top: Math.random() * 50 + "%",
            left: Math.random() * 20 + "%",
          }}
          animate={{
            x: [0, 800],
            y: [0, 400],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5,
          }}
        />
      ))}

      {/* NEBULA */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-purple-400 opacity-5 blur-[180px] top-[-100px] left-[-120px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-300 opacity-5 blur-[160px] bottom-[-100px] right-[-120px]" />
      </div>

      {/* HEADER */}
      <header className="p-6 relative z-10">
        <h1 className="text-lg font-semibold text-purple-300">
          RSI-Praktikum_Kelompok4
        </h1>
      </header>

      {/* MAIN */}
      <main className="flex items-center justify-center min-h-[80vh] px-4 relative z-10">

        <AnimatePresence mode="wait">

          {/* HERO */}
          {!open && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-2xl"
            >
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Welcome to Our Team <br />
                <span className="text-purple-300">
                  Website
                </span>
              </h1>

              <p className="mt-4 text-gray-300">
                Klik tombol untuk melihat anggota kelompok
              </p>

              <button
                onClick={() => setOpen(true)}
                className="mt-8 px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-700 transition shadow-lg hover:scale-110 hover:shadow-purple-500/40"
              >
                Kelompok 4 →
              </button>
            </motion.div>
          )}

          {/* MEMBERS */}
          {open && (
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
                    className={`p-6 rounded-xl backdrop-blur-xl border text-center transition
                    ${i % 2 === 0 
                      ? "bg-gradient-to-br from-purple-500/10 to-transparent border-purple-400/20" 
                      : "bg-gradient-to-br from-white/10 to-transparent border-white/10"
                    }
                    hover:shadow-2xl hover:shadow-purple-500/20`}
                  >
                    <motion.img
                      src={m.foto}
                      alt={m.nama}
                      whileHover={{ scale: 1.1 }}
                      className="w-32 h-32 rounded-full mx-auto mb-5 border-4 border-purple-400 shadow-lg shadow-purple-500/40 object-cover"
                    />

                    <h3 className="text-lg font-semibold">
                      {m.nama}
                    </h3>

                    <p className="text-purple-300">
                      {m.nim}
                    </p>
                  </motion.div>
                ))}

              </div>

              <div className="text-center mt-12">
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-white transition"
                >
                  ← Kembali
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-400 border-t border-white/10 relative z-10">
        RSI-Praktikum_Kelompok4
      </footer>

    </div>
  );
}