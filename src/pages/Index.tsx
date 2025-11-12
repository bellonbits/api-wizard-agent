import { useState } from "react";
import { CodeGenerator } from "@/components/CodeGenerator";
import { Header } from "@/components/Header";
import { ExamplePrompts } from "@/components/ExamplePrompts";

const Index = () => {
  const [prompt, setPrompt] = useState("");

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              API Code Writer Agent
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate complete, production-ready API codebases with AI. 
              From database schema to deployment scripts in seconds.
            </p>
          </div>

          {/* Example Prompts */}
          <ExamplePrompts onExampleClick={handleExampleClick} />

          {/* Code Generator */}
          <CodeGenerator initialPrompt={prompt} />
        </div>
      </main>
    </div>
  );
};

export default Index;
