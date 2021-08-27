import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../stores/store';
import { Modal } from 'semantic-ui-react';

const ModalContainer = () => {
  const { modalStore } = useStore();

  return (
    <Modal
      open={modalStore.modal.open}
      onClose={modalStore.closeModal}
      size="tiny"
      className="rounded-md"
    >
      <Modal.Content className="bg-gradient-to-b from-blue-400 via-indigo-500 to-blue-800 p-24">
        {modalStore.modal.body}
      </Modal.Content>
    </Modal>
  );
};

export default observer(ModalContainer);
