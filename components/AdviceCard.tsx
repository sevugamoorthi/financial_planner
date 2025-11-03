
import React from 'react';

// Basic markdown to HTML converter
const Markdown: React.FC<{ content: string }> = ({ content }) => {
  const htmlContent = content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
    .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>') // List items
    .replace(/(\n<\/li>)/g, '</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>') // Wrap lists
    .replace(/<\/ul>\s*<ul>/g, '') // Merge adjacent lists
    .replace(/(\r\n|\n|\r)/gm, '<br />')
    .replace(/<br \/><ul>/g, '<ul>')
    .replace(/<\/ul><br \/>/g, '</ul>')
    .replace(/<br \/><li/g, '<li');


  return <div className="prose-invert prose-slate" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

interface AdviceCardProps {
  advice: string;
  isLoading: boolean;
  error: string;
}

const AdviceCard: React.FC<AdviceCardProps> = ({ advice, isLoading, error }) => {
  if (!advice && !isLoading && !error) {
    return null;
  }

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-indigo-400 mb-4">AI Financial Advisor</h3>
      {isLoading && (
        <div className="flex items-center space-x-2 text-slate-400">
          <svg className="animate-spin h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Analyzing your plan and generating insights...</span>
        </div>
      )}
      {error && <p className="text-red-400">{error}</p>}
      {advice && (
        <div className="space-y-4 text-slate-300 leading-relaxed">
          <Markdown content={advice} />
        </div>
      )}
    </div>
  );
};

export default AdviceCard;
