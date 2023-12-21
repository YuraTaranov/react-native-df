import React from 'react';
import {Text, TouchableOpacity, firestore, FlatList} from '@components';
import {useState, useCallback, useEffect} from '@hooks';
import {ITodoList} from '@types';
import ListComponent from '../ListComponent/ListComponent';
import styles from './styles';

type TProps = {};

const TodoList: React.FC<TProps> = ({}) => {
  const [todosList, setTodosList] = useState<ITodoList[]>([]);
  const hasEmptyTodo = todosList.some(t => !t.name);

  useEffect(() => {
    const subscribe = firestore()
      .collection('todos')
      .onSnapshot(docs => {
        let todosArr: ITodoList[] = [];
        docs.forEach(doc => {
          const docWithId: ITodoList = {name: doc.data().name, id: doc.id};
          todosArr.push(docWithId);
        });
        setTodosList(todosArr);
      });

    return () => subscribe();
  }, []);

  const addTodo = useCallback(() => {
    setTodosList([...todosList, {name: '', id: `random${Math.random()}`}]);
  }, [todosList]);

  const saveTodo = useCallback(
    async (item: ITodoList, value: string) => {
      const foundTodo = todosList.find(t => t.id === item.id);
      if (foundTodo && !foundTodo.id.startsWith('random')) {
        try {
          await firestore().collection('todos').doc(foundTodo.id).update({name: value});
        } catch (error) {
          __DEV__ && console.log('update todo error', error);
        }
      } else {
        try {
          await firestore().collection('todos').add({name: value});
        } catch (error) {
          __DEV__ && console.log('add todo error', error);
        }
      }
    },
    [todosList],
  );

  const ListFooter = useCallback(
    () =>
      !hasEmptyTodo ? (
        <TouchableOpacity style={styles.plusContainer} onPress={addTodo}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      ) : null,
    [hasEmptyTodo, addTodo],
  );

  const renderItem = useCallback(
    ({item}: {item: ITodoList}) => <ListComponent item={item} saveTodo={saveTodo} />,
    [todosList],
  );

  const keyExtractor = useCallback((item: ITodoList) => item.id, []);

  return (
    <>
      <Text style={styles.listTitle}>TODO LIST</Text>
      <FlatList data={todosList} renderItem={renderItem} keyExtractor={keyExtractor} ListFooterComponent={ListFooter} />
    </>
  );
};

export default TodoList;
