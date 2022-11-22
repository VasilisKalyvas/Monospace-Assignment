import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from './redux/Slices/userSlice';
import './App.css';
import Table from './Components/Table';

function App() {
  const { users } = useSelector((state) => state.users)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])

  return (
    <div className="App">
      {
        <Table users={users}/>
      }
    </div>
  );
}

export default App;
