import { makeAutoObservable } from 'mobx';

export default class ModalStore {
  open = false;

  constructor() {
    makeAutoObservable(this);
  }

  openModal = () => {
    this.open = true;
  };

  closeModal = () => {
    this.open = false;
  };
}
