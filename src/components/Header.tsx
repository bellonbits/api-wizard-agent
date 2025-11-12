import { Code2, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Code2 className="h-8 w-8 text-primary" />
            <Sparkles className="h-4 w-4 text-primary absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">API Code Writer</h1>
            <p className="text-xs text-muted-foreground">Powered by Llama 4 Maverick</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">Ready</span>
          </div>
        </div>
      </div>
    </header>
  );
};
