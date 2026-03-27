import { Video, Calendar, Clock, Users, ExternalLink, PlayCircle } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

const liveClasses = [
  { subject: "Data Structures", instructor: "Dr. Malik", time: "Today, 10:00 AM", duration: "1.5 hrs", students: 42, status: "live" as const, link: "#" },
  { subject: "Calculus II", instructor: "Prof. Nida", time: "Today, 12:00 PM", duration: "1 hr", students: 38, status: "upcoming" as const, link: "#" },
  { subject: "English Writing", instructor: "Ms. Sara", time: "Today, 02:00 PM", duration: "1 hr", students: 35, status: "upcoming" as const, link: "#" },
];

const recordings = [
  { subject: "Data Structures - Lecture 5", instructor: "Dr. Malik", date: "Dec 3, 2025", duration: "1h 28m", views: 24 },
  { subject: "Calculus II - Lecture 8", instructor: "Prof. Nida", date: "Dec 2, 2025", duration: "58m", views: 31 },
  { subject: "English Writing - Lecture 3", instructor: "Ms. Sara", date: "Dec 1, 2025", duration: "1h 02m", views: 28 },
  { subject: "Data Structures - Lecture 4", instructor: "Dr. Malik", date: "Nov 30, 2025", duration: "1h 15m", views: 40 },
];

const schedule = [
  { day: "Monday", classes: ["Data Structures 10AM", "Calculus II 12PM"] },
  { day: "Tuesday", classes: ["English Writing 2PM"] },
  { day: "Wednesday", classes: ["Data Structures 10AM", "Lab Session 2PM"] },
  { day: "Thursday", classes: ["Calculus II 12PM", "English Writing 2PM"] },
  { day: "Friday", classes: ["Data Structures 10AM"] },
];

export default function OnlineClassesPage() {
  return (
    <div>
      {/* Live / Upcoming */}
      <div className="mb-8">
        <h2 className="font-semibold text-foreground mb-4">Today's Classes</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveClasses.map((c) => (
            <div key={c.subject} className="bg-background border border-border rounded-card shadow-soft p-5 hover:shadow-lift transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-input flex items-center justify-center ${c.status === "live" ? "bg-destructive/10" : "bg-accent/10"}`}>
                  <Video size={18} className={c.status === "live" ? "text-destructive" : "text-accent"} />
                </div>
                {c.status === "live" ? (
                  <span className="flex items-center gap-1 text-xs font-medium text-destructive bg-destructive/10 px-2 py-1 rounded-sm">
                    <span className="w-1.5 h-1.5 bg-destructive rounded-full animate-pulse" /> LIVE
                  </span>
                ) : (
                  <StatusBadge variant="info">Upcoming</StatusBadge>
                )}
              </div>
              <h3 className="font-semibold text-foreground">{c.subject}</h3>
              <p className="text-xs text-muted-foreground mt-1">{c.instructor}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock size={11} />{c.time}</span>
                <span className="flex items-center gap-1"><Users size={11} />{c.students}</span>
              </div>
              <a
                href={c.link}
                className={`mt-4 flex items-center justify-center gap-2 py-2 rounded-input text-sm font-medium transition-all ${
                  c.status === "live"
                    ? "bg-destructive text-white hover:opacity-90"
                    : "border border-accent text-accent hover:bg-accent/5"
                }`}
              >
                <ExternalLink size={14} />
                {c.status === "live" ? "Join Now" : "Join When Live"}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="bg-background border border-border rounded-card shadow-soft p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={16} className="text-accent" />
          <h2 className="font-semibold text-foreground">Weekly Schedule</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {schedule.map((s) => (
            <div key={s.day} className="bg-surface rounded-card p-3">
              <p className="text-xs font-semibold text-muted-foreground mb-2">{s.day}</p>
              <div className="space-y-1">
                {s.classes.map((c) => (
                  <p key={c} className="text-xs text-foreground bg-accent/10 text-accent px-2 py-1 rounded-sm">{c}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recordings */}
      <div className="bg-background border border-border rounded-card shadow-soft overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Recorded Lectures</h2>
        </div>
        <div className="divide-y divide-border">
          {recordings.map((r) => (
            <div key={r.subject} className="px-6 py-4 flex items-center justify-between hover:bg-surface transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-input bg-accent/10 flex items-center justify-center shrink-0">
                  <PlayCircle size={18} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{r.subject}</p>
                  <p className="text-xs text-muted-foreground">{r.instructor} · {r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="hidden sm:flex items-center gap-1"><Clock size={11} />{r.duration}</span>
                <span className="hidden sm:flex items-center gap-1"><Users size={11} />{r.views} views</span>
                <button className="px-3 py-1.5 border border-border rounded-input hover:bg-surface transition-colors text-foreground">Watch</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
