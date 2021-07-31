import React from 'react';

interface Props {
  color: string;
  text: string;
}

const LegendComponent = ({ color, text }: Props) => {
  return (
    <div className="flex flex-row items-center m-2 ">
      <div className={`w-4 h-4 bg-${color}-300 mr-1`}></div>
      <p>{text}</p>
    </div>
  );
};

export default LegendComponent;
