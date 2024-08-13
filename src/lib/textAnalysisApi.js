import { useState, useEffect } from 'react';

const useTextAnalysis = (text) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const analyzeText = async () => {
      if (!text.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simple text analysis logic
      const newSuggestions = [];

      // Check for common typos
      const typos = ['teh', 'recieve', 'seperate', 'occured'];
      typos.forEach(typo => {
        const index = text.toLowerCase().indexOf(typo);
        if (index !== -1) {
          newSuggestions.push({
            type: 'typo',
            index,
            suggestion: `"${typo}" might be a typo. Did you mean "${typo === 'teh' ? 'the' : typo.replace(/ie/g, 'ei')}"?`
          });
        }
      });

      // Check for basic grammar issues
      if (text.toLowerCase().includes('me and')) {
        newSuggestions.push({
          type: 'grammar',
          index: text.toLowerCase().indexOf('me and'),
          suggestion: 'Consider using "I and" or rephrase the sentence.'
        });
      }

      // Suggest enhancements
      if (text.split(' ').length < 10) {
        newSuggestions.push({
          type: 'enhancement',
          index: 0,
          suggestion: 'Consider expanding your text to provide more context or details.'
        });
      }

      setSuggestions(newSuggestions);
      setIsLoading(false);
    };

    analyzeText();
  }, [text]);

  return { suggestions, isLoading };
};

export default useTextAnalysis;