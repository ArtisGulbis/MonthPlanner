import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Popup } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import BouncyText from './BouncyText';

interface Props {
  content: string;
  tutName: string;
  styling?: string;
}

const Info = ({ content, styling, tutName }: Props) => {
  const { tutorialStore } = useStore();

  useEffect(() => {
    tutorialStore.init();
    tutorialStore.addTutorial(tutName);
  }, [tutorialStore, tutName]);
  return (
    <>
      {!tutorialStore.tutorials.find((el) => el.name === tutName)?.checked && (
        <BouncyText />
      )}
      <Popup
        content={content}
        on="click"
        position="top right"
        pinned
        trigger={
          <svg
            onClick={() => tutorialStore.markChecked(tutName)}
            xmlns="http://www.w3.org/2000/svg"
            type="button"
            className={`rounded-full cursor-pointer text-blue-700 hover:bg-blue-600 hover:text-blue-200 text-lg ${styling}`}
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
    </>
  );
};

export default observer(Info);
