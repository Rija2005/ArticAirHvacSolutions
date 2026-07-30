import { useState, useEffect, useRef } from "react";
import { 
  FiMessageSquare, 
  FiStar, 
  FiUser, 
  FiCheckCircle, 
  FiChevronLeft, 
  FiChevronRight 
} from "react-icons/fi";
import Card from "../components/Card";
import Loader from "../components/Loader";
import api from "../services/api";
import { getInitials } from "../utils/helpers";

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1 text-amber-400" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <FiStar
          key={n}
          className={`text-xs sm:text-sm transition-transform duration-200 ${
            n <= rating
              ? "fill-amber-400 text-amber-400"
              : "text-slate-200 dark:text-slate-700 fill-slate-100 dark:fill-slate-800"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Touch Swipe State
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    api
      .get("/reviews/public")
      .then((res) => {
        setReviews(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-xl mx-auto w-full relative">
        
        {/* Background Glassmorphic Glow Accents */}
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-primary-400/10 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-accent-500/10 dark:bg-accent-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Glassmorphism Header */}
        <div className="text-center space-y-3 mb-8 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 text-primary-700 dark:text-primary-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <FiMessageSquare className="text-primary-500 dark:text-primary-400" /> Customer Feedback
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            What Customers Say
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-accent-500 to-orange-500 mx-auto rounded-full" />
        </div>

        {/* Carousel Content */}
        {reviews.length === 0 ? (
          <Card className="text-center py-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm max-w-sm mx-auto">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto text-lg mb-2">
              <FiMessageSquare />
            </div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">No reviews yet</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 max-w-xs mx-auto">
              Be the first to share your experience after your next service appointment!
            </p>
          </Card>
        ) : (
          <div className="relative z-10 px-2 sm:px-10">
            
            {/* Carousel Container */}
            <div 
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="overflow-hidden"
            >
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {reviews.map((r) => (
                  <div key={r._id} className="w-full shrink-0 px-1">
                    <Card className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-lg shadow-slate-200/40 dark:shadow-none">
                      
                      {/* 1. TOP: Customer Name & Meta */}
                      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-sm shadow-primary-500/20">
                          {getInitials(r.customer?.name) || <FiUser />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                            {r.customer?.name || "Verified Customer"}
                          </p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                            {r.request?.service?.name || "HVAC Service"}
                          </p>
                        </div>
                      </div>

                      {/* 2. MIDDLE: Comment Body */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 my-4 leading-relaxed italic">
                        "{r.comment}"
                      </p>

                      {/* 3. BOTTOM: Stars Rating & Verified Badge */}
                      <div className="flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-3">
                        <Stars rating={r.rating} />
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-800/80">
                          <FiCheckCircle className="text-xs" /> Verified Customer
                        </span>
                      </div>

                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Left Arrow */}
            {reviews.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-0 sm:-left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-slate-800 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Previous testimonial"
              >
                <FiChevronLeft className="text-base" />
              </button>
            )}

            {/* Right Arrow */}
            {reviews.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-0 sm:-right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-white dark:hover:bg-slate-800 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Next testimonial"
              >
                <FiChevronRight className="text-base" />
              </button>
            )}

            {/* Carousel Dots */}
            {reviews.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-5">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? "w-6 bg-gradient-to-r from-accent-500 to-orange-500 shadow-sm"
                        : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}