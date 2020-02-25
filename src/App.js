import React, { useEffect, useState, useMemo, useCallback } from 'react';
import './App.css';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

const App = () => {
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const title = useMemo(() => {
    console.log('rendering')
    const pendingTodos = data.filter((todo) => !todo.completed).length;
    return `You have ${pendingTodos} pending todos!`;
  }, [data]);

  const onClick = useCallback((todo) => {
    const completed = !todo.completed;
    const newTodo = { ...todo, completed };
    const newData = data.map(t => {
      if (t.id === todo.id && t.userId === todo.userId) {
        return newTodo;
      }
      return t;
    });

    setData(newData);
  }, [data]); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(c => ++c);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();

      setData(data);
    }

    fetchData();
  }, []);

  useDocumentTitle(title);

  return (
    <div className="App">
      <h1>Todos - {title}</h1>
      <h2>Counter: {counter}</h2>
      <hr />
      {data && data.map((todo) => {
        const classes = `todo ${todo.completed ? 'done' : 'pending'}`;
        return (
          <div className={classes} key={todo.id} onClick={() => onClick(todo)}>
            {todo.title}
          </div>
        )
      })}
    </div>
  );
}

export default App;
