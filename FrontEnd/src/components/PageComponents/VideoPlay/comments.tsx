"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, ThumbsDown, Send } from "lucide-react"

type Comment = {
  id: string
  author: string
  avatar: string
  time: string
  text: string
  likes: number
}

export function Comments({
  initialComments,
}: {
  initialComments: Comment[]
}) {
  const [comments, setComments] = React.useState<Comment[]>(initialComments)
  const [text, setText] = React.useState("")

  function addComment() {
    const trimmed = text.trim()
    if (!trimmed) return
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: "You",
      avatar: "/my-avatar.png",
      time: "just now",
      text: trimmed,
      likes: 0,
    }
    setComments((prev) => [newComment, ...prev])
    setText("")
  }

  function toggleLike(id: string, dir: "up" | "down") {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              likes: Math.max(0, c.likes + (dir === "up" ? 1 : -1)),
            }
          : c,
      ),
    )
  }

  return (
    <section aria-label="Comments" className="space-y-4">
      <h2 className="text-lg font-semibold">Comments</h2>

      <div className="flex items-start gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/my-avatar.png" alt="Your avatar" />
          <AvatarFallback>Y</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[80px]"
          />
          <div className="mt-2 flex items-center gap-2">
            <Button onClick={addComment} disabled={!text.trim()}>
              <Send className="mr-2 h-4 w-4" />
              Comment
            </Button>
            <Button variant="ghost" onClick={() => setText("")}>
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <ul className="space-y-4">
        {comments.map((c) => (
          <li key={c.id} className="flex items-start gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={c.avatar || "/placeholder.svg"} alt={`${c.author} avatar`} />
              <AvatarFallback>
                {c.author
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-medium">{c.author}</span>
                <span className="text-muted-foreground">{c.time}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed">{c.text}</p>
              <div className="mt-2 flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => toggleLike(c.id, "up")}>
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  {c.likes}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => toggleLike(c.id, "down")}>
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
