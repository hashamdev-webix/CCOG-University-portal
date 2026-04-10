import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function CampusLife() {
  return (
    <>
      <Navbar />

      <section className="py-12 max-w-6xl mx-auto px-4">
        {/* Hero Image */}
        <img
          src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b"
          className="w-full h-72 object-cover rounded-xl mb-8"
        />

        <h1 className="text-3xl font-bold mb-4">Campus Life</h1>

        <p className="text-muted-foreground mb-10">
          Experience a vibrant campus environment where learning meets
          creativity. Our campus offers modern facilities, engaging student
          communities, and a supportive atmosphere designed to help you grow
          academically and personally.
        </p>

        {/* Facilities */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Campus Facilities</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 border rounded-xl bg-card">
              <h3 className="font-semibold mb-2">Modern Classrooms</h3>
              <p className="text-muted-foreground text-sm">
                Equipped with digital tools and interactive learning systems.
              </p>
            </div>

            <div className="p-5 border rounded-xl bg-card">
              <h3 className="font-semibold mb-2">Library & Study Areas</h3>
              <p className="text-muted-foreground text-sm">
                Quiet spaces with access to learning resources and materials.
              </p>
            </div>

            <div className="p-5 border rounded-xl bg-card">
              <h3 className="font-semibold mb-2">Computer Labs</h3>
              <p className="text-muted-foreground text-sm">
                Fully equipped labs for practical and technical training.
              </p>
            </div>
          </div>
        </div>

        {/* Student Life */}
        <div className="mb-12 bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Student Life</h2>

          <p className="text-muted-foreground mb-4">
            Campus life goes beyond academics. Students actively participate in
            events, workshops, and community activities that enhance their
            overall experience.
          </p>

          <ul className="space-y-2 text-muted-foreground">
            <li>🎉 Cultural and social events</li>
            <li>🤝 Student clubs and communities</li>
            <li>📚 Workshops and seminars</li>
            <li>🏆 Competitions and skill development programs</li>
          </ul>
        </div>

        {/* Image Gallery */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-6">Campus Gallery</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7"
              className="rounded-xl h-48 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1519455953755-af066f52f1a6"
              className="rounded-xl h-48 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d"
              className="rounded-xl h-48 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
              className="rounded-xl h-48 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0"
              className="rounded-xl h-48 w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b"
              className="rounded-xl h-48 w-full object-cover"
            />
          </div>
        </div>

        {/* Closing Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Why Campus Life Matters</h2>

          <p className="text-muted-foreground">
            A great campus experience helps students build confidence, develop
            leadership skills, and create lasting connections. At CCOG, we focus
            on creating an environment where students can thrive both inside and
            outside the classroom.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}