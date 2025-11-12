import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface CodeDisplayProps {
  code: string;
  isGenerating: boolean;
}

export const CodeDisplay = ({ code, isGenerating }: CodeDisplayProps) => {
  const [wrap, setWrap] = useState(false);

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

  const lines = code ? code.split('\n') : ['Your generated code will appear here...'];

  return (
    <div className="relative">
      {/* Controls */}
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setWrap(!wrap)}
          className="text-xs text-muted-foreground hover:text-foreground bg-code-bg/80 backdrop-blur-sm"
        >
          {wrap ? 'No Wrap' : 'Wrap'}
        </Button>
      </div>

      {/* Code Display */}
      <div className="bg-code-bg border border-code-border rounded-lg overflow-hidden">
        <div className="flex">
          {/* Line Numbers */}
          <div className="flex-shrink-0 bg-code-bg/50 border-r border-code-border py-4 px-3 select-none">
            <div className="flex flex-col gap-0 font-mono text-xs text-muted-foreground/50">
              {lines.map((_, index) => (
                <div key={index} className="leading-6 text-right">
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Code Content */}
          <div className={`flex-1 overflow-x-auto ${wrap ? '' : 'overflow-x-scroll'}`}>
            <pre className="p-4">
              <code className={`text-sm text-foreground font-mono leading-6 block ${wrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'}`}>
                {code || 'Your generated code will appear here...'}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Generating Indicator */}
      {isGenerating && (
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-lg px-3 py-1.5 backdrop-blur-sm">
            <Loader2 className="h-3 w-3 animate-spin text-primary" />
            <span className="text-xs text-primary font-medium">Writing...</span>
          </div>
        </div>
      )}
    </div>
  );
};
