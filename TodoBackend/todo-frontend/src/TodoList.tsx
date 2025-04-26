import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Todo {
    description: string;
    done?: boolean;
}

const TodoList = ({children}: any) => {

    const [todoRes, setTodoRes] = useState<string>();
    const userDetails = useSelector((state:any) => state.loggedInUser.userDetails);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState<string>('');
    
    useEffect(() => {

        fetch('/api/todos', {

            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userDetails.token
            },
        })
        .then(res => res.text())
        .then(str => setTodoRes(str)) // TODO: start retrieving a list of todos from the backend
        .catch(err => {
            setTodoRes(err.toString());
        });
    }, []);

    function addTodo() {

        setTodos([...todos, {description: todo}]);
        setTodo('');
    }

    return (
        <>
            <h1>loading todos...</h1>
            <p>{todoRes}</p> 
            <ul>
            {todos.map(t => 
                <li>{t.description}</li>
            )}
            </ul>
            <input type="text" onChange={e => setTodo(e.target.value)} value={todo}/>
            <button disabled={todo.length < 3} onClick={addTodo}>Add</button>
        </>
    )
};

export default TodoList;