import { makeAutoObservable } from 'mobx';
import { Tutorial } from '../models/tutorial';
import { saveToStorage, TUTORIALS } from '../utils/utils';

export class TutorialStore {
  tutorials: Tutorial[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // init = () => {
  //   const data = getFromStorage<Tutorial[]>(TUTORIALS);
  //   if (data) {
  //     this.tutorials = data;
  //   }
  // };

  addTutorial = (name: string) => {
    if (!this.tutorials.find((el) => el.name === name)) {
      this.tutorials.push({
        name,
        checked: false,
      });
      saveToStorage<Tutorial[]>(TUTORIALS, this.tutorials);
    }
  };

  markChecked = (name: string) => {
    const item = this.tutorials.find((el) => el.name === name);

    if (item) {
      item.checked = true;
    }
    saveToStorage<Tutorial[]>(TUTORIALS, this.tutorials);
  };
}
