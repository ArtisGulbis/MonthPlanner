import { observer } from 'mobx-react-lite';
import React, { MouseEventHandler } from 'react';
import { Modal, ModalProps } from 'semantic-ui-react';

interface Props {
  text: string;
  open: boolean;
  onYes: MouseEventHandler<HTMLButtonElement> | undefined;
  onNo: MouseEventHandler<HTMLButtonElement> | undefined;
  onClose:
    | ((
        event: React.MouseEvent<HTMLElement, MouseEvent>,
        data: ModalProps
      ) => void)
    | undefined;
}

const buttonStyles = (color: string) => {
  return `bg-${color}-300 mr-4 text-${color}-800 hover:bg-${color}-600 hover:text-${color}-200 p-2 pl-6 pr-6 rounded-md text-lg transform duration-75 hover:scale-105`;
};

const ClearDataMotal = ({ text, onYes, onClose, onNo, open }: Props) => {
  return (
    <Modal size="mini" open={open} onClose={onClose} className="font-sans">
      <Modal.Header>
        <p>{text}</p>
      </Modal.Header>
      <Modal.Actions>
        <button onClick={onYes} className={buttonStyles('green')}>
          Yes
        </button>
        <button className={buttonStyles('red')} onClick={onNo}>
          No
        </button>
      </Modal.Actions>
    </Modal>
  );
};

export default observer(ClearDataMotal);
