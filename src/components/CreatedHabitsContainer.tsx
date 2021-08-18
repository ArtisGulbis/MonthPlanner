import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import createdHabitService from '../services/createdHabitService/createdHabitService';
import { useStore } from '../stores/store';
import CreatedHabitContainerElement from './CreatedHabitContainerElement';
import Info from './Info';

const CreatedHabitsContainer = () => {
  const { createdHabitsStore, userStore } = useStore();
  // const [sticky, setSticky] = useState('');

  useEffect(() => {
    createdHabitService.getUserHabits(userStore.userData!.id).then((res) => {
      if (res?.getUserHabits) {
        res.getUserHabits.forEach((el) =>
          createdHabitsStore.addHabit(el.name as string)
        );
      }
    });
    // window.addEventListener('scroll', () => {
    //   if (window.pageYOffset > 400 && createdHabitsStore.habits.length) {
    //     setSticky('sticky');
    //   } else {
    //     setSticky('');
    //   }
    // });
  }, [
    createdHabitsStore.habits.length,
    createdHabitsStore.habits,
    createdHabitsStore,
    userStore.userData,
  ]);

  return (
    <div
      className={`rounded-md bg-blue-300 p-3 m-4 min-h-min min-h shadow-inner flex flex-row relative flex-wrap justify-center items-center`}
    >
      {createdHabitsStore.habits.map((el) => (
        <CreatedHabitContainerElement key={el} habit={el} />
      ))}
      {createdHabitsStore.habits.length > 0 && (
        <div className="absolute bottom-2 right-0 w-20 h-12 flex flex-col items-center justify-center">
          <Info
            tutName="edit habit"
            content="Double click on title to edit."
            styling={` w-9 h-9`}
          />
        </div>
      )}
    </div>
  );
};

export default observer(CreatedHabitsContainer);
