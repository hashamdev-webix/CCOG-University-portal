import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const events = [
  {
    title: "Tech Conference 2025",
    date: "March 15, 2025",
    location: "Main Auditorium",
    desc: "Join industry experts to explore the latest trends in technology, AI, and innovation.",
  },
  {
    title: "Business Networking Meetup",
    date: "April 10, 2025",
    location: "Conference Hall B",
    desc: "Connect with entrepreneurs, startups, and professionals to expand your network.",
  },
  {
    title: "Annual Cultural Festival",
    date: "May 5, 2025",
    location: "Campus Ground",
    desc: "Celebrate diversity with music, food, performances, and cultural activities.",
  },
];

const pastEvents = [
  "Workshop on Web Development",
  "Career Counseling Session",
  "Digital Marketing Bootcamp",
];

export default function EventsPage() {
  return (
    <>
      <Navbar />

      <section className="py-12 max-w-6xl mx-auto px-4">
        {/* Hero */}
        <img
          src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678"
          className="w-full h-72 object-cover rounded-xl mb-8"
        />

        <h1 className="text-3xl font-bold mb-4">Events</h1>

        <p className="text-muted-foreground mb-10">
          Stay updated with our latest events, workshops, and activities. 
          Participate, learn, and connect with professionals and fellow students.
        </p>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Upcoming Events</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event, i) => (
              <div
                key={i}
                className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold mb-2">{event.title}</h3>

                <p className="text-sm text-muted-foreground mb-1">
                  📅 {event.date}
                </p>

                <p className="text-sm text-muted-foreground mb-3">
                  📍 {event.location}
                </p>

                <p className="text-muted-foreground mb-4">
                  {event.desc}
                </p>

                
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Past Events</h2>

          <ul className="space-y-3 text-muted-foreground">
            {pastEvents.map((event, i) => (
              <li key={i} className="flex items-center gap-2">
                ✔ {event}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}