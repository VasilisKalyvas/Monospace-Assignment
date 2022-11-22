import React from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { getUsers } from '../redux/Slices/userSlice';
import { useState } from 'react';
import { FiUsers } from 'react-icons/fi';
import './styles/table.css'

const Table = ({ users }) => {

    const [selectedUsers, setSelectedUsers] = useState([])
    const dispatch = useDispatch();

    const updateUserStatus = async (user) => {
            try {
                await axios.put(`https://vasilis.users.challenge.dev.monospacelabs.com/users/${user.id}`,
                   { "active": !user.active})
                   dispatch(getUsers());
            } catch (error) {
                console.log(error)
            }
    }

    const userType = (type) => {
        const smallerType = (type[0] + type[1]);
        return smallerType.toLowerCase();
    }

    const handleChange = (e) => {
        var updatedList = [...selectedUsers];
        if(e.target.name === "allSelect"){
            if(e.target.checked){
                setSelectedUsers(users.map((user) => (user.name)));
            }else{
                setSelectedUsers([]);
            }
        }else{
            if (e.target.checked) {
                updatedList = [...selectedUsers, e.target.name];
              } else {
                updatedList.splice(selectedUsers.indexOf(e.target.name), 1);
              }
              setSelectedUsers(updatedList);
        }
    };
  return (
    <div className="container">
        <table className='table'>
            <thead>
                <tr>
                    <th>
                        <FiUsers  className="icon"/>
                    </th>
                    <th className="top-part-title" scope="col">
                        Users
                    </th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th className="selected">
                        {selectedUsers.length} selected
                    </th>
                </tr>
                <tr className='first-row'>
                    <th className="title" scope="col">
                        <input 
                            type="checkbox"
                            name="allSelect"
                            onChange={handleChange}
                        />
                    </th>
                    <th className="title" scope="col">TYPE</th>
                    <th className="title" scope="col">NAME</th>
                    <th className="title" scope="col">EMAIL</th>
                    <th className="title" scope="col">TELEPHONE</th>
                    <th className="title" scope="col">STATUS</th>
                </tr>
            </thead>
            <tbody>
                {
                    users?.map(user => (
                        <tr className="rows"  key={user.id}>
                            <td className="td">
                                <input 
                                    type="checkbox"
                                    name={user.name} 
                                    onChange={handleChange}
                                    checked={selectedUsers.includes(user.name)}
                                />
                            </td>
                            <td className="type">
                                <div className={userType(user.type)}>
                                    {userType(user.type).toUpperCase()}
                                </div>
                            </td>
                            <td className="td">{user.name}</td>
                            <td className="td">{user.email}</td>
                            <td className="td">{user.phone}</td>
                            <td className="td">{user.active 
                                    ?
                                        <div className='active-toggle'
                                            onClick={() => updateUserStatus(user)}>
                                            <div className='oval-active'/>
                                        </div> 
                                    : 
                                        <div className='disable-toggle'
                                            onClick={() => updateUserStatus(user)}>
                                            <div className='oval-disable'/>
                                        </div>
                                }
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table