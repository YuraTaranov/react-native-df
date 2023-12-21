import React from 'react';
import {TouchableOpacity, Input, firestore} from '@components';
import {useState, useCallback} from '@hooks';
import {ITodoList} from '@types';
import styles from './styles';

type TProps = {
  item: ITodoList;
  saveTodo: (item: ITodoList, value: string) => void;
};

const ListComponent: React.FC<TProps> = ({item, saveTodo}) => {
  const [value, setValue] = useState(item.name);

  const save = useCallback(() => {
    saveTodo(item, value);
  }, [item, value]);

  const deleteTodo = useCallback(async () => {
    try {
      await firestore().collection('todos').doc(item.id).delete();
    } catch (error) {
      console.log('delete todo error', error);
    }
  }, [item]);

  const saveButtonVisible = value !== item.name;

  const deleteButtonVisible = !item.id.startsWith('random');

  return (
    <TouchableOpacity style={styles.listItemContainer}>
      <Input
        value={value}
        setValue={setValue}
        onPressSave={save}
        onPressDelete={deleteTodo}
        saveButtonVisible={saveButtonVisible}
        deleteButtonVisible={deleteButtonVisible}
        placeholder="Enter your todo"
      />
    </TouchableOpacity>
  );
};

export default ListComponent;
