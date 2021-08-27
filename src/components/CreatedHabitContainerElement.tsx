import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { useStore } from '../stores/store';
import { buttonStyles, shortenText } from '../utils/utils';
import DeleteButton from './DeleteButton';
import DeleteSpecificHabits from './DeleteSpecificHabits';
import EditCreatedHabitForm from './EditCreatedHabitForm';

interface Props {
  habit: string;
}

const CreatedHabitContainerElement = ({ habit }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const { modalStore } = useStore();

  const [, drag] = useDrag(() => ({
    type: 'habit',
    item: { name: habit },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const changeEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <div
      ref={!editMode ? drag : undefined}
      className={`
       pl-8 pr-8 bg-blue-400 relative text-blue-900 bg-opacity-50 rounded-full shadow text-center m-4  ${
         !editMode && 'cursor-hand'
       }  hover:bg-blue-300 transform hover:scale-110 duration-100 chdb-hover`}
    >
      {editMode ? (
        <EditCreatedHabitForm changeEditMode={changeEditMode} habit={habit} />
      ) : (
        <p
          onDoubleClick={changeEditMode}
          className={`capitalize text-lg p-2 text-blue-800`}
        >
          {shortenText(habit, 10)}
        </p>
      )}
      <DeleteButton
        styling={`h-7 w-7 absolute chdb hover:text-blue-500 cursor-pointer transform hover:scale-125 duration-75 ${buttonStyles(
          'blue'
        )}`}
        onClick={() => {
          modalStore.openModal(<DeleteSpecificHabits habit={habit} />);
        }}
      />
    </div>
  );
};

export default observer(CreatedHabitContainerElement);
