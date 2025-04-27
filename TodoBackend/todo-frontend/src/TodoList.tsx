import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";

interface TTodo {
    description: string;
    done?: boolean;
    id: number;
}

const Todo = ({todo, editTodo}: {todo: TTodo, editTodo: (t: TTodo) => any}) => { // TODO: possibly move this out to own file, but maybe not as todo shouldnt be reused

    const [todoForEdit, setTodoForEdit] = useState<string>(todo.description);
    const [indexForTodoEdit, setIndexForTodoEdit] = useState<boolean>(false); 

    function enableEdit() {
        setIndexForTodoEdit(true);
    }

    function callEditTodo() {

        todo.description = todoForEdit;
        editTodo(todo); // TODO: hook this up to backend before lifting up state
        setIndexForTodoEdit(false);
    }

    return (
        <>
            {(indexForTodoEdit ? <li><input value={todoForEdit} onChange={e => setTodoForEdit(e.target.value)}/>
                                 <button disabled={todoForEdit.length < 3} onClick={callEditTodo}>Update</button></li> :

                                 <li>{todo.description}<button onClick={enableEdit}>Edit</button></li>
            )}
        </>
    );
}

const TodoList = ({children}: any) => {

    const userDetails = useSelector((state:any) => state.loggedInUser.userDetails);
    const [todoRes, setTodoRes]: [string | undefined, Dispatch<SetStateAction<string | undefined>>] = useState<string>();
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    
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
    }, []); //TODO: Im using effect wrong here, should  have userDetails.token in the dependency array

    function updateTodo(todo: TTodo): any {

        const updatedTodos = todos.map(t => {

            if (t.id === todo.id)  
                t.description = todo.description ?? '';

            return t;
        });

        setTodos([...updatedTodos]);
    }

    function addTodo() {

        const createdTodo: TTodo = {description: newTodo, id: todos.length + 1}
        setTodos([...todos, createdTodo]); // TODO: call through to backend before adding to array.
        setNewTodo('');
    }

    return (
        <>
            <h1>loading todos...</h1>
            <p>{todoRes}</p> 
            <ul>
                {todos.map((t, _i) => 
                    <Todo todo={t} editTodo={updateTodo} />
                )}
            </ul>
            <input type="text" onChange={e => setNewTodo(e.target.value)} value={newTodo}/>
            <button disabled={newTodo.length < 3} onClick={addTodo}>Add</button>
        </>
    )
};

export default TodoList;