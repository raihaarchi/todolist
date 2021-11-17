import React from 'react';
// Components
import TaskList from '../components/TaskList';
import Navbar from '../components/Navbar';
import Sorting from '../components/Sorting';
import ModalSetting from '../components/Modal';

const Completed = () => (
  <>
    <div className="container">
      <Navbar />
      <Sorting completed />
      <TaskList completed />
    </div>
    <ModalSetting />
  </>
);

export default Completed;
