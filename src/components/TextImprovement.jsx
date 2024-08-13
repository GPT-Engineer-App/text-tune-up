import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import useTextAnalysis from '../lib/textAnalysisApi';

const TextImprovement = () => {
  const [text, setText] = useState('');
  const { suggestions, isLoading } = useTextAnalysis(text);

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Text Improvement Tool</h2>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        className="mb-4"
        rows={6}
      />
      {isLoading && (
        <div className="flex items-center justify-center mb-4">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Analyzing text...</span>
        </div>
      )}
      {suggestions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Suggestions:</h3>
          <ul className="list-disc pl-5">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="mb-2">
                <span className="font-medium">{suggestion.type.charAt(0).toUpperCase() + suggestion.type.slice(1)}:</span>{' '}
                {suggestion.suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default TextImprovement;