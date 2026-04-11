"use client";

import { useEffect, useMemo, useState } from "react";

type Instructor = {
  id: string;
  name: string;
  initials: string;
  gradient: string;
  specialty: string;
  bio: string;
};

type FitnessClass = {
  id: string;
  name: string;
  type: "Yoga" | "HIIT" | "Spin" | "Strength" | "Barre" | "Pilates";
  instructorId: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  time: string;
  duration: number;
  capacity: number;
  booked: number;
  intensity: "Low" | "Medium" | "High";
  description: string;
  gradient: string;
};

const INSTRUCTORS: Instructor[] = [
  { id: "i1", name: "Maya Chen", initials: "MC", gradient: "from-rose-500 to-pink-600", specialty: "Vinyasa, Yin", bio: "200hr RYT certified. Former dancer. Teaches to breath, not clock." },
  { id: "i2", name: "Daniel Okafor", initials: "DO", gradient: "from-sky-500 to-indigo-600", specialty: "HIIT, Strength", bio: "NASM-CPT, former D1 track athlete. Intense but always scalable." },
  { id: "i3", name: "Priya Iyer", initials: "PI", gradient: "from-emerald-500 to-teal-600", specialty: "Spin, Pilates", bio: "Cycling instructor since 2018. 5:30am crew is her favorite class." },
  { id: "i4", name: "Sam Whittaker", initials: "SW", gradient: "from-amber-500 to-orange-600", specialty: "Barre, Sculpt", bio: "Former ballet dancer. Gentle, precise, will fix your alignment." },
  { id: "i5", name: "Lia Romero", initials: "LR", gradient: "from-violet-500 to-fuchsia-600", specialty: "HIIT, Yoga", bio: "Bilingual English/Spanish. Brings a playlist worth showing up for." },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const CLASSES: FitnessClass[] = [
  { id: "c1", name: "Sunrise Vinyasa", type: "Yoga", instructorId: "i1", day: "Mon", time: "6:30 AM", duration: 60, capacity: 20, booked: 12, intensity: "Medium", description: "Breath-led flow to wake up the body. All levels welcome.", gradient: "from-rose-400 to-pink-500" },
  { id: "c2", name: "HIIT Circuit", type: "HIIT", instructorId: "i2", day: "Mon", time: "5:30 PM", duration: 45, capacity: 18, booked: 17, intensity: "High", description: "Six stations, 40 seconds on, 20 seconds off. Bring water.", gradient: "from-red-400 to-orange-500" },
  { id: "c3", name: "Express Spin", type: "Spin", instructorId: "i3", day: "Tue", time: "6:00 AM", duration: 45, capacity: 22, booked: 19, intensity: "High", description: "45-minute interval ride. Climbs, sprints, recovery.", gradient: "from-cyan-400 to-blue-500" },
  { id: "c4", name: "Sculpt & Tone", type: "Strength", instructorId: "i2", day: "Tue", time: "12:00 PM", duration: 50, capacity: 15, booked: 8, intensity: "Medium", description: "Dumbbell strength circuit. Full body, moderate intensity.", gradient: "from-indigo-400 to-violet-500" },
  { id: "c5", name: "Barre Essentials", type: "Barre", instructorId: "i4", day: "Wed", time: "9:00 AM", duration: 55, capacity: 16, booked: 14, intensity: "Low", description: "Small movements, big burn. Barre fundamentals for beginners.", gradient: "from-fuchsia-400 to-purple-500" },
  { id: "c6", name: "Power Yoga", type: "Yoga", instructorId: "i5", day: "Wed", time: "6:00 PM", duration: 60, capacity: 20, booked: 11, intensity: "Medium", description: "Stronger, faster vinyasa. Build heat and strength.", gradient: "from-violet-400 to-indigo-500" },
  { id: "c7", name: "Hardcore Pilates", type: "Pilates", instructorId: "i3", day: "Thu", time: "7:00 AM", duration: 50, capacity: 14, booked: 14, intensity: "High", description: "Mat Pilates with bands. Core-focused, advanced level.", gradient: "from-teal-400 to-emerald-500" },
  { id: "c8", name: "HIIT Express", type: "HIIT", instructorId: "i5", day: "Thu", time: "5:30 PM", duration: 30, capacity: 20, booked: 6, intensity: "High", description: "Quick 30-minute HIIT. Perfect lunch-break crusher.", gradient: "from-rose-400 to-red-500" },
  { id: "c9", name: "Restorative Yin", type: "Yoga", instructorId: "i1", day: "Fri", time: "6:00 PM", duration: 75, capacity: 18, booked: 10, intensity: "Low", description: "Long holds, deep stretches. Wind down into the weekend.", gradient: "from-pink-400 to-rose-500" },
  { id: "c10", name: "Strength Basics", type: "Strength", instructorId: "i2", day: "Fri", time: "7:00 AM", duration: 60, capacity: 16, booked: 9, intensity: "Medium", description: "Foundational lifts: squat, deadlift, press. Coaching focused.", gradient: "from-slate-400 to-indigo-500" },
  { id: "c11", name: "Weekend Flow", type: "Yoga", instructorId: "i5", day: "Sat", time: "9:00 AM", duration: 75, capacity: 25, booked: 22, intensity: "Medium", description: "Longer Saturday flow, live playlist, guided savasana.", gradient: "from-amber-400 to-orange-500" },
  { id: "c12", name: "Sculpt Saturday", type: "Barre", instructorId: "i4", day: "Sat", time: "10:30 AM", duration: 55, capacity: 16, booked: 15, intensity: "Medium", description: "Saturday barre with extra core work. Bring grip socks.", gradient: "from-fuchsia-400 to-pink-500" },
  { id: "c13", name: "Sunday Spin", type: "Spin", instructorId: "i3", day: "Sun", time: "8:30 AM", duration: 60, capacity: 22, booked: 18, intensity: "High", description: "60-minute endurance ride. Steady state with 4 big climbs.", gradient: "from-blue-400 to-cyan-500" },
  { id: "c14", name: "Gentle Pilates", type: "Pilates", instructorId: "i4", day: "Sun", time: "11:00 AM", duration: 50, capacity: 14, booked: 8, intensity: "Low", description: "Beginner-friendly mat Pilates. Low impact, high awareness.", gradient: "from-emerald-400 to-teal-500" },
  { id: "c15", name: "Stretch & Unwind", type: "Yoga", instructorId: "i1", day: "Sun", time: "5:00 PM", duration: 60, capacity: 18, booked: 4, intensity: "Low", description: "Recovery stretches before the week starts. Bring a blanket.", gradient: "from-violet-400 to-purple-500" },
];

export default function FitnessBooking() {
  const [dark, setDark] = useState(false);
  const [activeDay, setActiveDay] = useState<(typeof DAYS)[number]>("Mon");
  const [selected, setSelected] = useState<FitnessClass | null>(null);
  const [bookings, setBookings] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("solaris-theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
    const savedBookings = localStorage.getItem("solaris-bookings");
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("solaris-bookings", JSON.stringify(bookings));
  }, [bookings]);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("solaris-theme", next ? "dark" : "light");
  };

  const classesForDay = useMemo(
    () => CLASSES.filter((c) => c.day === activeDay),
    [activeDay]
  );

  const myBookings = useMemo(
    () => CLASSES.filter((c) => bookings.includes(c.id)),
    [bookings]
  );

  const toggleBooking = (classId: string) => {
    setBookings((prev) =>
      prev.includes(classId) ? prev.filter((b) => b !== classId) : [...prev, classId]
    );
  };

  const intensityColor = (i: "Low" | "Medium" | "High") =>
    i === "Low"
      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
      : i === "Medium"
      ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
      : "bg-rose-500/15 text-rose-700 dark:text-rose-400";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-pink-500 to-rose-600 text-lg font-bold text-white shadow-lg shadow-fuchsia-500/30">
            💪
          </span>
          <div className="leading-tight">
            <div className="text-base font-semibold">Solaris Fit</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Boston studio
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleDark}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          aria-label="Toggle dark mode"
        >
          {dark ? "☀️" : "🌙"}
        </button>
      </header>

      <section className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            This week at Solaris Fit
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
            {CLASSES.length} classes across {INSTRUCTORS.length} instructors. Book up to 10 minutes before class starts.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-slate-500 dark:text-slate-400">Your bookings</span>{" "}
          <span className="font-semibold">{bookings.length}</span>
        </div>
      </section>

      <section className="mb-8 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div>
          <nav className="mb-4 flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
            {DAYS.map((d) => {
              const active = d === activeDay;
              const count = CLASSES.filter((c) => c.day === d).length;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setActiveDay(d)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white shadow-lg shadow-fuchsia-500/20"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  }`}
                >
                  <div>{d}</div>
                  <div className={`text-[10px] ${active ? "text-white/80" : "text-slate-400"}`}>
                    {count} classes
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {classesForDay.map((c) => {
              const instructor = INSTRUCTORS.find((i) => i.id === c.instructorId)!;
              const isBooked = bookings.includes(c.id);
              const spotsLeft = c.capacity - c.booked;
              const isFull = spotsLeft <= 0;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelected(c)}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                >
                  <div className={`relative h-28 bg-gradient-to-br ${c.gradient}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
                    <div className="absolute left-4 top-3 text-sm font-semibold text-white">
                      {c.type}
                    </div>
                    <div className="absolute left-4 bottom-3 text-xl font-bold text-white">
                      {c.time}
                    </div>
                    <div className="absolute right-4 top-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${intensityColor(c.intensity)}`}>
                        {c.intensity}
                      </span>
                    </div>
                    {isBooked && (
                      <div className="absolute right-4 bottom-3 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-900">
                        ✓ Booked
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-4">
                    <div>
                      <h3 className="font-semibold leading-tight">{c.name}</h3>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {c.duration} min · with {instructor.name}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${instructor.gradient} text-[10px] font-semibold text-white`}
                        >
                          {instructor.initials}
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {isFull ? "Waitlist only" : `${spotsLeft} spots left`}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400">
                        {isBooked ? "Cancel →" : "Book →"}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Your week
            </h3>
            {myBookings.length === 0 ? (
              <div className="mt-3 rounded-xl border border-dashed border-slate-300 p-6 text-center text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                No classes booked yet. Pick one from the schedule.
              </div>
            ) : (
              <ul className="mt-3 flex flex-col gap-2">
                {myBookings.slice(0, 5).map((b) => {
                  const instr = INSTRUCTORS.find((i) => i.id === b.instructorId)!;
                  return (
                    <li
                      key={b.id}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950"
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${b.gradient} text-xs font-semibold text-white`}
                      >
                        {b.day}
                      </div>
                      <div className="flex-1 text-sm">
                        <div className="font-medium">{b.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {b.time} · {instr.name}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Instructors
            </h3>
            <ul className="mt-3 flex flex-col gap-3">
              {INSTRUCTORS.map((i) => (
                <li key={i.id} className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${i.gradient} text-sm font-semibold text-white`}
                  >
                    {i.initials}
                  </div>
                  <div className="flex-1 text-sm">
                    <div className="font-medium">{i.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {i.specialty}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-t-3xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`relative h-40 bg-gradient-to-br ${selected.gradient}`}>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 backdrop-blur"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-semibold uppercase tracking-widest opacity-90">
                  {selected.type} · {selected.day} {selected.time}
                </div>
                <h2 className="mt-1 text-2xl font-semibold">{selected.name}</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {selected.description}
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-950">
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Duration
                  </div>
                  <div className="mt-1 font-semibold">{selected.duration} min</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Intensity
                  </div>
                  <div className="mt-1 font-semibold">{selected.intensity}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Spots
                  </div>
                  <div className="mt-1 font-semibold">
                    {Math.max(0, selected.capacity - selected.booked)}/{selected.capacity}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                {(() => {
                  const instr = INSTRUCTORS.find((i) => i.id === selected.instructorId)!;
                  return (
                    <>
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${instr.gradient} text-sm font-semibold text-white`}
                      >
                        {instr.initials}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{instr.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {instr.bio}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
              <button
                type="button"
                onClick={() => {
                  toggleBooking(selected.id);
                  setSelected(null);
                }}
                className={`mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition ${
                  bookings.includes(selected.id)
                    ? "bg-rose-600 shadow-rose-500/20 hover:bg-rose-500"
                    : "bg-gradient-to-r from-fuchsia-500 to-pink-600 shadow-fuchsia-500/20 hover:from-fuchsia-400 hover:to-pink-500"
                }`}
              >
                {bookings.includes(selected.id) ? "Cancel booking" : "Book this class"}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-16 text-center text-xs text-slate-400">
        Demo product — bookings saved to localStorage only. © {new Date().getFullYear()} Solaris Fit.
      </footer>
    </main>
  );
}
