import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";

interface ExamplePromptsProps {
  onExampleClick: (prompt: string) => void;
}

export const ExamplePrompts = ({ onExampleClick }: ExamplePromptsProps) => {
  const examples = [
    {
      title: "E-commerce API",
      prompt: "Create a FastAPI CRUD API for an e-commerce platform with products, orders, and users. Include PostgreSQL schema, JWT authentication, and payment integration."
    },
    {
      title: "Blog Platform",
      prompt: "Build a Node.js Express REST API for a blogging platform with posts, comments, and categories. Use MongoDB, add markdown support, and include search functionality."
    },
    {
      title: "Task Manager",
      prompt: "Generate a Go Fiber API for a task management system with projects, tasks, and team collaboration. Include SQLite database and WebSocket for real-time updates."
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Quick Start Examples</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {examples.map((example, index) => (
          <Card 
            key={index}
            className="p-4 border-border bg-card hover:bg-card/80 transition-all cursor-pointer group"
            onClick={() => onExampleClick(example.prompt)}
          >
            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {example.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
              {example.prompt}
            </p>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full text-primary hover:text-primary hover:bg-primary/10"
            >
              Try this prompt →
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
