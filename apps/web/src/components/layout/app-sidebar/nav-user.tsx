export function NavUser() {
  return (
    <div className="flex items-center gap-3 rounded-lg p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
        A
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-medium">
          Anderson
        </span>

        <span className="text-xs text-muted-foreground">
          Software Developer
        </span>
      </div>
    </div>
  );
}