import { observer } from 'mobx-react-lite';
import React from 'react';
import { Modal, Button } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { clearLocalStorage } from '../utils/utils';

const ClearDataMotal = () => {
  const { modalStore } = useStore();
  return (
    <Modal
      size="mini"
      open={modalStore.open}
      onClose={() => modalStore.closeModal()}
    >
      <Modal.Header>
        <p>Do you want to clear all data?</p>
      </Modal.Header>
      <Modal.Actions>
        <Button
          color="red"
          inverted
          onClick={() => {
            modalStore.closeModal();
            clearLocalStorage();
          }}
        >
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
