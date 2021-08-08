import { observer } from 'mobx-react-lite';
import React from 'react';
import { Modal, Button, ButtonProps } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { clearLocalStorage } from '../utils/utils';

interface Props {
  text: string;
  onYes:
    | ((
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        data: ButtonProps
      ) => void)
    | undefined;
}

const ClearDataMotal = ({ text, onYes }: Props) => {
  const { modalStore } = useStore();
  return (
    <Modal
      size="mini"
      open={modalStore.open}
      onClose={() => modalStore.closeModal()}
    >
      <Modal.Header>
        <p>{text}</p>
      </Modal.Header>
      <Modal.Actions>
        <Button color="red" inverted onClick={onYes}>
          Yes
        </Button>
        <Button color="blue" inverted onClick={() => modalStore.closeModal()}>
          No
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default observer(ClearDataMotal);
