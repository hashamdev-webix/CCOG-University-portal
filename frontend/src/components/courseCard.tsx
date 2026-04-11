import { Link } from "react-router-dom";
import { FaClock, FaLaptop, FaMoneyBillWave, FaArrowRight, FaUsers } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

interface Course {
  _id: string;
  title: string;
  shortDescription?: string;
  description: string;
  category: string;
  mode: string;
  duration: string;
  fee: number;
  isFree?: boolean;
  seats?: number;
  status: string;
  thumbnail?: string;
}

interface CourseCardProps {
  course: Course;
  categoryLabel?: string;
}

export default function CourseCard({ course, categoryLabel }: CourseCardProps) {
  const { currency } = useAuth();

  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="h-52 w-full overflow-hidden bg-muted">
        <img
          src={
            course.thumbnail ||
            "https://via.placeholder.com/600x400?text=Course+Image"
          }
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
            {categoryLabel || course.category}
          </span>
          <span className="text-xs font-medium text-muted-foreground uppercase">
            {course.status}
          </span>
        </div>

        <h2 className="text-xl font-bold text-foreground mb-2 line-clamp-1">
          {course.title}
        </h2>

        <p className="text-sm text-muted-foreground leading-6 mb-4 line-clamp-3">
          {course.shortDescription || course.description}
        </p>

        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-sm text-foreground">
            <FaClock className="text-primary" />
            <span>
              <strong>Duration:</strong> {course.duration}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-foreground">
            <FaLaptop className="text-primary" />
            <span>
              <strong>Mode:</strong> {course.mode}
            </span>
          </div>

          {course.seats !== undefined && (
            <div className="flex items-center gap-2 text-sm text-foreground">
              <FaUsers className="text-primary" />
              <span>
                <strong>Seats:</strong> {course.seats}
              </span>
            </div>
          )}

          {/* <div className="flex items-center gap-2 text-sm text-foreground">
            <FaMoneyBillWave className="text-primary" />
            <span>
              <strong>Fee:</strong>{" "}
              {course.isFree ? "Free" : `${currency || "PKR"} ${course.fee}`}
            </span>
          </div> */}
        </div>

        <Link
          to={`/courses/details/${course._id}`}
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all"
        >
          Learn More
          <FaArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}