import React from 'react';

interface Props {
  content: any;
  color: string;
  additionalStyle?: string;
}

const StatisticsContent = ({ content, color, additionalStyle }: Props) => {
  return (
    <div
      className={`bg-${color}-300 h-full p-3 text-${color}-800 flex-grow ${additionalStyle}`}
    >
      {content}
    </div>
  );
};

export default StatisticsContent;
