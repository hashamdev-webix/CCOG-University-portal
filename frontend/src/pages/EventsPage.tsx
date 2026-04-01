import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const events = [
  "Tech Conference 2025",
  "Business Networking Meetup",
  "Annual Cultural Festival",
];

export default function EventsPage() {
  return (
    <>
      <Navbar />

      <section className="py-12 max-w-6xl mx-auto px-4">
        <img
          src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678"
          className="w-full h-72 object-cover rounded-xl mb-8"
        />

        <h1 className="text-3xl font-bold mb-4">Events</h1>

        <ul className="space-y-3">
          {events.map((e, i) => (
            <li key={i} className="p-4 border rounded-lg bg-card">
              {e}
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </>
  );
}