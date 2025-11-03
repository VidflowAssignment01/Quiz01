import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

type GlassySearchBarProps = {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
  defaultValue?: string
}

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  className,
  defaultValue = "",
}: GlassySearchBarProps) {
  const [query, setQuery] = React.useState(defaultValue)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSearch?.(query.trim())
  }

  return (
    <form
      role="search"
      aria-label="Site search"
      onSubmit={handleSubmit}
      className={cn(
        // Layout
        "relative flex w-full max-w-xl items-center gap-2 rounded-full px-4 py-2",
        // Glassy look
        "backdrop-blur-xl backdrop-saturate-150",
        "bg-white/30 dark:bg-white/5 border border-white/40 dark:border-white/20",
        // Shadows + depth
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),_0_4px_12px_rgba(0,0,0,0.15)]",
        // Hover/focus subtle transition
        className
      )}
    >
      {/* Search Icon */}
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground/70"
      >
       <Search/>
      </span>

      {/* Hidden accessible label */}
      <label htmlFor="glassy-search-input" className="sr-only">
        Search
      </label>

      {/* Input */}
      <input
        id="glassy-search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
       className={cn(
    "flex-1 bg-transparent border-0 outline-none",
    "focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
    "text-foreground placeholder:text-foreground/50",
    "h-10 px-0"
  )}
      />

      {/* Button — subtle glassy capsule */}
      <Button
        type="submit"
        size="sm"
        className={cn(
          "rounded-full px-5 py-2 bg-transparent font-medium transition-all duration-300 backdrop-blur-md",
          "glassy-hover",
          
          "text-foreground"
        )}
      >
        Search
      </Button>
    </form>
  )
}
