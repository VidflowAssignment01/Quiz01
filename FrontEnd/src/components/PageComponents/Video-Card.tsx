import { Card, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Play } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface VideoCardProps {
  thumbnail: string
  duration: string
  title: string
  channel: string
  views: string
  timeAgo: string
  verified?: boolean
}

export default function VideoCard({
  thumbnail,
  duration,
  title,
  channel,
  views,
  timeAgo,
  verified
}: VideoCardProps) {

  const navigate = useNavigate()

  return (
    <Card 
onClick={()=>navigate("/X")}
className="group relative overflow-hidden border-0 shadow-none bg-transparent hover:scale-[1.02] transition-transform duration-300">
      <CardContent className="p-0">
        {/* Thumbnail */}
        <div className="relative w-full overflow-hidden rounded-xl">
          <AspectRatio ratio={16 / 9}>
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </AspectRatio>

          {/* Duration Tag */}
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[11px] px-1.5 py-0.5 rounded-md font-medium">
            {duration}
          </div>

          {/* Overlay play icon on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
            <Play className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
        </div>

        {/* Video Info */}
        <div className="flex gap-3 mt-3 px-1">
          {/* Channel Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={`/AboutBg.png`}
              alt={channel}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Info */}
          <div className="flex flex-col justify-center text-sm w-full overflow-hidden">
            <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
              {title}
            </h3>
            <div className="text-muted-foreground text-xs mt-0.5">
              <span>{channel}</span>
              {verified && <span className="ml-1.5 text-blue-500">✔</span>}
            </div>
            <div className="text-muted-foreground text-xs">
              {views} • {timeAgo}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
