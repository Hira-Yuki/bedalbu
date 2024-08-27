import React from 'react';
import { Modal } from 'react-native';
import { ThemedView } from './ThemedView';

interface ThemedModalProps {
  modalVisible: boolean,
  setModalVisible: (modalVisible: boolean) => void,
  children: React.ReactNode
}

export default function ThemedModal({ modalVisible, setModalVisible, children }: ThemedModalProps) {
  return (
    <ThemedView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        {children}
      </Modal>
    </ThemedView>
  )
}
