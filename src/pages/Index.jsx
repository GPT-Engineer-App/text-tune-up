import React from 'react';
import TextImprovement from '../components/TextImprovement';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Text Improvement Tool</h1>
        <TextImprovement />
      </div>
    </div>
  );
};

export default Index;