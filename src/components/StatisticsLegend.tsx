import React from 'react';

interface Props {
  color: string;
  text: string;
}

const StatisticsLegend = ({ color, text }: Props) => {
  return (
    <div className="flex flex-row items-center m-2 ">
      <div className={`w-6 h-6 bg-${color}-300 mr-1`}></div>
      <p className="text-lg font-light">{text}</p>
    </div>
  );
};

export default StatisticsLegend;
