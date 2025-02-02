import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  X, 
  Maximize2, 
  Minimize2, 
  Wand, 
  Type, 
  AlignJustify,
  MessageSquare 
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AIAssistantProps {
  selectedText: string;
  onSuggestion: (suggestion: string) => void;
  className?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  selectedText,
  onSuggestion,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState('improve');
  const [suggestion, setSuggestion] = useState('');

  const handleImprove = async () => {
    if (!selectedText) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/improve-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: selectedText,
          action: action
        })
      });
      
      const data = await response.json();
      if (data.suggestion) {
        setSuggestion(data.suggestion);
      }
    } catch (error) {
      console.error('Error getting suggestion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    onSuggestion(suggestion);
    setSuggestion('');
  };

  return (
    <Card className={`fixed right-4 bottom-4 w-80 transition-all ${isExpanded ? 'h-[500px]' : 'h-auto'} ${className}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="font-semibold">Gemini AI Assistant</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8"
            >
              {isExpanded ? 
                <Minimize2 className="w-4 h-4" /> : 
                <Maximize2 className="w-4 h-4" />
              }
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {selectedText ? (
          <div className="space-y-4">
            <div className="text-sm">
              <p className="text-muted-foreground mb-2">Selected text:</p>
              <p className="bg-muted p-2 rounded max-h-20 overflow-y-auto">
                {selectedText}
              </p>
            </div>

            <Select
              value={action}
              onValueChange={setAction}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="improve">
                  <div className="flex items-center gap-2">
                    <Wand className="w-4 h-4" />
                    <span>Improve Writing</span>
                  </div>
                </SelectItem>
                <SelectItem value="formal">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    <span>Make Formal</span>
                  </div>
                </SelectItem>
                <SelectItem value="casual">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>Make Casual</span>
                  </div>
                </SelectItem>
                <SelectItem value="concise">
                  <div className="flex items-center gap-2">
                    <AlignJustify className="w-4 h-4" />
                    <span>Make Concise</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={handleImprove}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Improving..." : "Get Suggestion"}
            </Button>

            {suggestion && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Suggestion:</p>
                <p className="bg-muted p-2 rounded text-sm">
                  {suggestion}
                </p>
                <Button 
                  onClick={handleApply}
                  variant="outline"
                  className="w-full"
                >
                  Apply Suggestion
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Select text in your document to get AI-powered suggestions from Claude
            </p>
            <div className="border rounded p-3 space-y-2">
              <h4 className="text-sm font-medium">Available actions:</h4>
              <ul className="text-sm text-muted-foreground">
                <li>• Improve writing style</li>
                <li>• Make text more formal</li>
                <li>• Make text more casual</li>
                <li>• Make text more concise</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIAssistant;