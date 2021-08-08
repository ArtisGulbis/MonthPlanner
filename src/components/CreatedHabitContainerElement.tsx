import { observer } from 'mobx-react-lite';
import React from 'react';
import { useDrag } from 'react-dnd';
import { useStore } from '../stores/store';
import DeleteButton from './DeleteButton';

interface Props {
  habit: string;
}

const CreatedHabitContainerElement = ({ habit }: Props) => {
  const { createdHabitsStore } = useStore();

  const [, drag] = useDrag(() => ({
    type: 'habit',
    item: { name: habit },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`
       pl-8 pr-8 bg-blue-400 relative text-blue-900 bg-opacity-50 rounded-full shadow text-center m-2 cursor-move hover:bg-blue-300 transform hover:scale-110 duration-100`}
    >
      <p className={`capitalize text-lg p-2`}>{habit}</p>
      <DeleteButton
        styling={`h-6 w-6 absolute chdb hover:text-blue-500 cursor-pointer transform hover:scale-125 duration-75`}
        onClick={() => createdHabitsStore.openModal(habit)}
      />
    </div>
  );
};

export default observer(CreatedHabitContainerElement);
