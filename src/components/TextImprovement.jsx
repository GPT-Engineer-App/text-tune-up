import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import useTextAnalysis from '../lib/textAnalysisApi';

const TextImprovement = () => {
  const [text, setText] = useState('');
  const { suggestions, isLoading, analyzeText } = useTextAnalysis();

  const handleTestClick = () => {
    analyzeText(text);
  };

  const renderHighlightedText = () => {
    if (suggestions.length === 0) return text;

    let result = [];
    let lastIndex = 0;

    suggestions.sort((a, b) => a.index - b.index).forEach((suggestion, i) => {
      result.push(text.slice(lastIndex, suggestion.index));
      result.push(
        <span key={i} className="bg-yellow-200 relative group">
          {suggestion.original}
          <span className="absolute bottom-full left-0 bg-white border border-gray-300 p-2 rounded shadow-lg hidden group-hover:block whitespace-nowrap">
            {suggestion.type}: {suggestion.suggestion}
          </span>
        </span>
      );
      lastIndex = suggestion.index + suggestion.length;
    });

    result.push(text.slice(lastIndex));

    return result;
  };

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
      <Button onClick={handleTestClick} disabled={isLoading} className="mb-4">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          'Test'
        )}
      </Button>
      {suggestions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Highlighted Text:</h3>
          <div className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap">
            {renderHighlightedText()}
          </div>
          <h3 className="text-xl font-semibold mt-4 mb-2">Suggestions:</h3>
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