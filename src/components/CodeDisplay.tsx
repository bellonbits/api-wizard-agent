import { Loader2 } from "lucide-react";

interface CodeDisplayProps {
  code: string;
  isGenerating: boolean;
}

export const CodeDisplay = ({ code, isGenerating }: CodeDisplayProps) => {
  if (isGenerating && !code) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Generating your API code...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <pre className="bg-code-bg border border-code-border rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-foreground font-mono leading-relaxed whitespace-pre-wrap break-words">
          {code || "Your generated code will appear here..."}
        </code>
      </pre>
      {isGenerating && (
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-3 py-1.5">
            <Loader2 className="h-3 w-3 animate-spin text-primary" />
            <span className="text-xs text-primary font-medium">Writing...</span>
          </div>
        </div>
      )}
    </div>
  );
};
