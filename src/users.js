import React, { useState, useEffect, useCallback, useMemo } from 'react';

const filter = (users, query) => {
  console.log('FILTER');
  return users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
}

const UserList = React.memo(({ users, query }) => {
  console.log('RENDERING');
  const filteredUsers = useMemo(() => filter(users, query), [query, users]);
  return filteredUsers.map(user => <div key={user.id}>{user.name}</div>)
})

const Users = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [count, setCount] = useState(0);

  const getUsers = useCallback(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/');
    const data = await response.json();
    setUsers(data);
  }, [])

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div>
      <h1>Userlist - useCallback vs useMemo</h1>
      <p>count: {count}</p>
      <input type="text" onChange={e => setQuery(e.target.value)} />
      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
      <UserList users={users} query={query} />
    </div>
  )
}

export default Users;