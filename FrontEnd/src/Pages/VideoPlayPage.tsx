import { Comments } from "@/components/PageComponents/VideoPlay/comments"
import { RecommendedList } from "@/components/PageComponents/VideoPlay/recomended-list"
import { VideoDescription } from "@/components/PageComponents/VideoPlay/video-description"
import { VideoMeta } from "@/components/PageComponents/VideoPlay/video-meta"
import { VideoPlayer } from "@/components/PageComponents/VideoPlay/video-player"
import { Separator } from "@/components/ui/separator"


export default function WatchPage() {
  const video = {
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    poster: "/sample-video-poster.jpg",
    title: "Building a YouTube Clone UI with Next.js and shadcn | Full Walkthrough",
    views: 1234567,
    uploadedAt: "2 days ago",
    likes: 54231,
    channel: {
      name: "Dev Channel",
      avatar: "/channel-avatar-dev.jpg",
      subscribers: "1.25M",
      isSubscribed: false,
    },
    description: `In this video, we build a YouTube-style Watch page with Next.js (App Router) and shadcn/ui.
We cover layout, responsive design, accessibility considerations, and UI polish.

Chapters
00:00 Intro
01:10 Project Setup
05:25 Layout & Grid
12:40 Video Actions
18:55 Description & Comments
26:10 Recommended List
31:45 Wrap-up

Links
- Next.js App Router docs
- shadcn/ui components`,
  }

  const recommended = Array.from({ length: 8 }).map((_, i) => ({
    id: `rec-${i + 1}`,
    title: i % 2 === 0 ? " hello" : "hello",
    channel: i % 2 === 0 ? "UI Patterns" : "Data Wizards",
    views: i % 2 === 0 ? "342K views" : "128K views",
    time: i % 2 === 0 ? "12:08" : "8:45",
    thumbnail: `/Unreal.webp`,
  }))

  const initialComments = [
    {
      id: "c1",
      author: "Jane Doe",
      avatar: "/avatar-jane-doe.jpg",
      time: "1 day ago",
      text: "This was super helpful. The layout tricks for the sidebar were exactly what I needed!",
      likes: 245,
    },
    {
      id: "c2",
      author: "Alex Kim",
      avatar: "/avatar-alex-kim.jpg",
      time: "22 hours ago",
      text: "Would love a follow-up on optimizing video components and handling different aspect ratios.",
      likes: 92,
    },
  ]

  return (
    <main className="mx-auto max-w-[1400px] p-4 ">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_420px]">
        {/* Left: Video + Meta + Description + Comments */}
        <section className="space-y-4">
          <VideoPlayer src={video.src} poster={video.poster} title={video.title} />

          <div className="space-y-3">
            <h1 className="text-pretty text-xl font-semibold leading-snug md:text-2xl">{video.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span>{video.views.toLocaleString()} views</span>
              <span aria-hidden="true">•</span>
              <span>{video.uploadedAt}</span>
            </div>

            <VideoMeta channel={video.channel} likes={video.likes} className="mt-2" />

          </div>

          <VideoDescription description={video.description} />

          <Separator />

          <Comments initialComments={initialComments} />
        </section>

        {/* Right: Recommended */}
        <aside aria-label="Recommended videos">
          <RecommendedList items={recommended} />
        </aside>
      </div>
    </main>
  )
}
