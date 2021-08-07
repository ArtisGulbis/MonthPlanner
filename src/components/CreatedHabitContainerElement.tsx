import { observer } from 'mobx-react-lite';
import React from 'react';
import { useDrag } from 'react-dnd';

interface Props {
  habit: string;
}

const CreatedHabitContainerElement = ({ habit }: Props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'habit',
    item: { name: habit },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      className={`${
        isDragging && 'bg-blue-600'
      } pl-8 pr-8 bg-blue-400 text-blue-900 bg-opacity-50 rounded-full shadow text-center m-2`}
    >
      <p className={`capitalize text-lg p-2`}>{habit}</p>
    </div>
  );
};

export default observer(CreatedHabitContainerElement);
