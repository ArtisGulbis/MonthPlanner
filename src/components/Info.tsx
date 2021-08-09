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
      position="top right"
      pinned
      trigger={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          type="button"
          className={`ml-auto mr-4 p-1 rounded-full cursor-pointer text-blue-700 hover:bg-blue-600 hover:text-blue-200 text-lg ${styling}`}
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
      }
    />
  );
};

export default Info;
