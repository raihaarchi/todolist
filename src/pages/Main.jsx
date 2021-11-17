import React from 'react';
// Components
import FormTask from '../components/FormTask';
import TaskList from '../components/TaskList';
import Navbar from '../components/Navbar';
import Sorting from '../components/Sorting';
import Filter from '../components/Filter';
import ModalSetting from '../components/Modal';

const Main = () => (
  <>
    <div className="container">
      <FormTask />
      <Navbar />
      <Filter />
      <Sorting />
      <TaskList />
    </div>
    <ModalSetting />
  </>
);

export default Main;
