import React from 'react';
import {View} from '@components';
import TodoList from './components/TodoList/TodoList';
import styles from './styles';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <TodoList />
    </View>
  );
};

export default Home;
