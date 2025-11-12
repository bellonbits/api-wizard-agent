import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Send, Download, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CodeDisplay } from "./CodeDisplay";

interface CodeGeneratorProps {
  initialPrompt?: string;
}

export const CodeGenerator = ({ initialPrompt = "" }: CodeGeneratorProps) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    setGeneratedCode("");
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-api-code', {
        body: { prompt }
      });

      if (error) {
        console.error('Edge function error:', error);
        toast.error("Failed to generate code. Please try again.");
        return;
      }

      // Handle streaming response
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-api-code`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!response.ok || !response.body) {
        throw new Error('Failed to start stream');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedCode = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const jsonStr = line.slice(6);
            if (jsonStr === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                accumulatedCode += content;
                setGeneratedCode(accumulatedCode);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      toast.success("Code generated successfully!");
    } catch (error) {
      console.error('Generation error:', error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-api-code.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded!");
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card className="p-6 border-border bg-card">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Describe your API requirements
            </label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Example: Create a FastAPI CRUD API for managing books with PostgreSQL, JWT auth, and Docker configuration..."
              className="min-h-[120px] bg-background border-border text-foreground resize-none"
            />
          </div>
          
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Code...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Generate API Code
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Output Section */}
      {(generatedCode || isGenerating) && (
        <Card className="border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/50 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Generated Code</h3>
            {generatedCode && !isGenerating && (
              <div className="flex gap-2">
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                  onClick={handleDownload}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            )}
          </div>
          
          <div className="p-6">
            <CodeDisplay code={generatedCode} isGenerating={isGenerating} />
          </div>
        </Card>
      )}
    </div>
  );
};
