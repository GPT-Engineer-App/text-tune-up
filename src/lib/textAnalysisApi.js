import { useState } from 'react';

const useTextAnalysis = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeText = async (text) => {
    if (!text.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple text analysis logic
    const newSuggestions = [];

    // Check for common typos and grammar issues
    const issues = [
      { pattern: /\bteh\b/gi, replacement: 'the', type: 'typo' },
      { pattern: /\brecieve\b/gi, replacement: 'receive', type: 'typo' },
      { pattern: /\bseperate\b/gi, replacement: 'separate', type: 'typo' },
      { pattern: /\boccured\b/gi, replacement: 'occurred', type: 'typo' },
      { pattern: /\bme and (\w+) (are|were|have|had)\b/gi, replacement: '$1 and I $2', type: 'grammar' },
      { pattern: /\bit's\b(?=\s+(?:him|her|them|us|you|me))/gi, replacement: 'its', type: 'grammar' },
      { pattern: /\b(your|you're|their|there|they're)\b/gi, replacement: (match) => `[${match}]`, type: 'attention' },
    ];

    issues.forEach(({ pattern, replacement, type }) => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        newSuggestions.push({
          type,
          index: match.index,
          length: match[0].length,
          original: match[0],
          suggestion: typeof replacement === 'function' ? replacement(match[0]) : replacement,
        });
      }
    });

    // Check for sentence structure
    if (!/[.!?]$/.test(text.trim())) {
      newSuggestions.push({
        type: 'structure',
        index: text.length,
        length: 0,
        original: '',
        suggestion: 'Consider ending your text with proper punctuation.',
      });
    }

    // Suggest enhancements for short text
    if (text.split(/\s+/).length < 10) {
      newSuggestions.push({
        type: 'enhancement',
        index: 0,
        length: text.length,
        original: text,
        suggestion: 'Consider expanding your text to provide more context or details.',
      });
    }

    setSuggestions(newSuggestions);
    setIsLoading(false);
  };

  return { suggestions, isLoading, analyzeText };
};

export default useTextAnalysis;