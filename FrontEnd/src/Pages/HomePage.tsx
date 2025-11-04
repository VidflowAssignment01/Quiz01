import VideoCard from "@/components/PageComponents/Video-Card"

const videos = [
  {
    thumbnail: "/thumb1.png",
    duration: "12:14",
    title: "Master React JS — Complete Beginner to Pro Course",
    channel: "Farhan Dev",
    views: "152K views",
    timeAgo: "2 months ago",
    verified: true,
  },
  {
    thumbnail: "/thumb2.png",
    duration: "9:27",
    title: "Minimal UI Design with Figma — Aesthetic Dashboard Tutorial",
    channel: "Zaina Studio",
    views: "231K views",
    timeAgo: "1 month ago",
    verified: true,
  },
  {
    thumbnail: "/thumb3.png",
    duration: "18:05",
    title: "C++ OOP Project: Build an ATM System Step-by-Step",
    channel: "Nayab Codes",
    views: "98K views",
    timeAgo: "3 weeks ago",
    verified: true,
  },
  {
    thumbnail: "/thumb4.png",
    duration: "6:41",
    title: "The Secret to Writing Clean JavaScript Code",
    channel: "Farhan Dev",
    views: "403K views",
    timeAgo: "5 months ago",
    verified: true,
  },
  {
    thumbnail: "/thumb5.png",
    duration: "10:22",
    title: "Portfolio Website Design — Minimal Aesthetic UI in React",
    channel: "Zaina Studio",
    views: "512K views",
    timeAgo: "2 weeks ago",
    verified: true,
  },
  {
    thumbnail: "/thumb6.png",
    duration: "15:48",
    title: "Learn Python in 2025 — Full Course for Beginners",
    channel: "Nayab Codes",
    views: "850K views",
    timeAgo: "6 months ago",
    verified: true,
  },
]

export default function HomePage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-neutral-950 dark:to-neutral-900 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-100 tracking-tight">
          Recommended Videos
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {videos.map((video, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm border border-gray-100 dark:border-neutral-800"
            >
              <VideoCard {...video} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
