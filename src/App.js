import React, { useEffect, useState, useMemo } from 'react';
import './App.css';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

const App = () => {
  const [data, setData] = useState([]);
  const title = useMemo(() => {
    console.log(data);
    const pendingTodos = data.filter((todo) => !todo.completed).length;
    return `You have ${pendingTodos} pending todos!`;
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();

      setData(data);
    }

    fetchData();
  }, []);

  useDocumentTitle(title);

  const onClick = (todo) => {
    const completed = !todo.completed;
    const newTodo = { ...todo, completed };
    const newData = data.map(t => {
      if (t.id === todo.id && t.userId === todo.userId) {
        return newTodo;
      }
      return t;
    });

    setData(newData);
  }

  return (
    <div className="App">
      <h1>Todos - {title}</h1>
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
