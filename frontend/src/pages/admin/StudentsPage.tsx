import { useState, useEffect } from "react";
import { Search, Mail, Phone } from "lucide-react";
import api from "@/lib/api";

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city?: string;
  createdAt: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/auth/students")
      .then((res) => setStudents(res.data.students))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = students.filter((s) =>
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Students</h2>
          <p className="text-sm text-muted-foreground mt-1">{students.length} registered students</p>
        </div>
      </div>

      <div className="bg-background border border-border rounded-card shadow-soft p-4 mb-6">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground text-sm">Loading...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <div key={s._id} className="bg-background border border-border rounded-card shadow-soft p-5 hover:shadow-lift transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">{s.firstName[0]}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{s.firstName} {s.lastName}</p>
                  {s.city && <p className="text-xs text-muted-foreground">{s.city}</p>}
                </div>
              </div>
              <div className="space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Mail size={12} />{s.email}</div>
                <div className="flex items-center gap-2"><Phone size={12} />{s.phone}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Joined {new Date(s.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-12 text-muted-foreground text-sm">No students found</div>
          )}
        </div>
      )}
    </div>
  );
}
