import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import useTodosRepository from './TodosRepository';

interface TTodo {
    task: string;
    done?: boolean;
    id: number;
}

const Todo = ({todo, editTodo}: {todo: TTodo, editTodo: (t: TTodo) => any}) => { // TODO: possibly move this out to own file, but maybe not as todo shouldnt be reused

    const [todoForEdit, setTodoForEdit] = useState<string>(todo.task);
    const [indexForTodoEdit, setIndexForTodoEdit] = useState<boolean>(false); 

    function enableEdit() {
        setIndexForTodoEdit(true);
    }

    function callEditTodo() {

        todo.task = todoForEdit;
        editTodo(todo); // TODO: hook this up to backend before lifting up state
        setIndexForTodoEdit(false);
    }

    return (
        <>
            {(indexForTodoEdit ? <li><input value={todoForEdit} onChange={e => setTodoForEdit(e.target.value)}/>
                                 <button disabled={todoForEdit.length < 3} onClick={callEditTodo}>Update</button></li> :

                                 <li>{todo.task}<button onClick={enableEdit}>Edit</button></li>
            )}
        </>
    );
}

const TodoList = ({children}: any) => {

    const userDetails = useSelector((state:any) => state.loggedInUser.userDetails);
    const todosRepository = useTodosRepository(userDetails.token);
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [errors, setErrors] = useState<string>();
    
    useEffect(() => {

        todosRepository.find(userDetails.name).then(todosRes => { 
            setTodos(todosRes);
        })
        .catch(err => setErrors(err.toString()));
    }, []); 

    function updateTodo(todo: TTodo): any {

        const updatedTodos = todos.map(t => {

            if (t.id === todo.id)  
                t.task = todo.task ?? '';

            return t;
        });

        setTodos([...updatedTodos]);
    }

    function addTodo() {

        const createdTodo: TTodo = {task: newTodo, id: todos.length + 1}
        setTodos([...todos, createdTodo]); // TODO: call through to backend before adding to array.
        setNewTodo('');
    }

    return (
        <>
            <h1>loading todos...</h1>
            {(errors && errors.length) && <p role="alert">{errors}</p>}
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