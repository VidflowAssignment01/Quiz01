import VideoCard from "@/components/PageComponents/Video-Card"

const videos = [
  {
    thumbnail: "/AboutBg.png",
    duration: "8:59:29",
    title: "Learn Blender in Hindi — Full Course 2025",
    channel: "CG Aman",
    views: "487K views",
    timeAgo: "8 months ago",
    verified: true,
  },
  {
    thumbnail: "/AboutBg.png",
    duration: "8:59:29",
    title: "Learn Blender in Hindi — Full Course 2025",
    channel: "CG Aman",
    views: "487K views",
    timeAgo: "8 months ago",
    verified: true,
  },
  {
    thumbnail: "/AboutBg.png",
    duration: "8:59:29",
    title: "Learn Blender in Hindi — Full Course 2025",
    channel: "CG Aman",
    views: "487K views",
    timeAgo: "8 months ago",
    verified: true,
  },
]

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video, i) => (
        <VideoCard key={i} {...video} />
      ))}
    </div>
  )
}
