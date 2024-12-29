import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md dark:bg-slate-900 bg-slate-400", className)}
      {...props}
    />
  )
}

export { Skeleton }
