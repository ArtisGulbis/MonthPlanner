import { observer } from 'mobx-react-lite';
import React from 'react';
import { Modal, Button, ButtonProps, ModalProps } from 'semantic-ui-react';

interface Props {
  text: string;
  open: boolean;
  onYes:
    | ((
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        data: ButtonProps
      ) => void)
    | undefined;
  onClose:
    | ((
        event: React.MouseEvent<HTMLElement, MouseEvent>,
        data: ModalProps
      ) => void)
    | undefined;
  onNo:
    | ((
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        data: ButtonProps
      ) => void)
    | undefined;
}

const ClearDataMotal = ({ text, onYes, onClose, onNo, open }: Props) => {
  return (
    <Modal size="mini" open={open} onClose={onClose}>
      <Modal.Header>
        <p>{text}</p>
      </Modal.Header>
      <Modal.Actions>
        <Button color="red" inverted onClick={onYes}>
          Yes
        </Button>
        <Button color="blue" inverted onClick={onNo}>
          No
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default observer(ClearDataMotal);
