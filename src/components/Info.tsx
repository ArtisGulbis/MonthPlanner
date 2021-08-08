import React from 'react';
import { Popup } from 'semantic-ui-react';

interface Props {
  content: string;
  styling?: string;
}

const Info = ({ content, styling }: Props) => {
  return (
    <Popup
      content={content}
      on="click"
      pinned
      trigger={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          type="button"
          className={`ml-auto mr-4 p-1 rounded-full text-blue-700 hover:bg-blue-600 hover:text-blue-200 text-lg ${styling}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        // <button
        //   type="button"
        //   className={`ml-auto mr-4 pr-6 pl-6 rounded-md text-green-900 bg-green-300 text-green-800 hover:bg-green-600 hover:text-green-200 text-lg transform duration-75 hover:scale-105 ${styling}`}
        // >
        //   {title}
        // </button>
      }
    />
  );
};

export default Info;
