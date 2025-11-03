import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

export function RecommendedList({
  items,
  className,
}: {
  items: {
    id: string
    title: string
    channel: string
    views: string
    time: string
    thumbnail: string
  }[]
  className?: string
}) {
  return (
    <div className={cn("grid gap-4", className)}>
      {items.map((v) => (
        <Link key={v.id} to="#" className="group grid grid-cols-[168px_minmax(0,1fr)] gap-3 glassy-hover py-2 px-1 rounded-md">
          <div className="relative h-[94px] w-[168px] overflow-hidden rounded-md bg-muted">
            {/* Using img instead of next/image to keep it simple in Next.js */}
            <img
              src={v.thumbnail || "/placeholder.svg"}
              alt={`${v.title} thumbnail`}
              className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
            />
            <span className="pointer-events-none absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
              {v.time}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-sm font-medium ">{v.title}</h3>
            <p className="mt-1 truncate text-xs text-muted-foreground">{v.channel}</p>
            <p className="truncate text-xs text-muted-foreground">{v.views}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
