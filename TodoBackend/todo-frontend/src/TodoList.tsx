import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useTodosRepository from './TodosRepository';

export interface TTodo {
    task: string;
    completed?: boolean;
    id: any;
}

const Todo = ({todo, editTodo}: {todo: TTodo, editTodo: (t: TTodo) => any}) => { // TODO: possibly move this out to own file, but maybe not as todo shouldnt be reused

    const [todoForEdit, setTodoForEdit] = useState<string>(todo.task);
    const [todoDone, setTodoDone] = useState<boolean>(todo.completed ?? false);
    const [indexForTodoEdit, setIndexForTodoEdit] = useState<boolean>(false); 

    function enableEdit() {
        setIndexForTodoEdit(true);
    }

    function callEditTodo() {

        todo.task = todoForEdit;
        todo.completed = todoDone;
        editTodo(todo); // TODO: hook this up to backend before lifting up state
        setIndexForTodoEdit(false);
    }

    return (
        <>
            {(indexForTodoEdit ? <li>
                                    <input value={todoForEdit} onChange={e => setTodoForEdit(e.target.value)}/>
                                    <input type="checkbox" checked={todoDone} onChange={e => setTodoDone(e.target.checked)} />
                                    <button disabled={todoForEdit.length < 3} onClick={callEditTodo}>Update</button>
                                </li> :

                                 <li>{todo.task}<input disabled={true} type="checkbox" checked={todoDone}/><button onClick={enableEdit}>Edit</button></li>
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

    async function updateTodo(todo: TTodo): Promise<any> {

        const res = await todosRepository.update(todo.id, todo.task, todo.completed ?? false);
        if(!res.valid) {

            setErrors("couldn't update todo");
            return; 
        }
        const updatedTodos = todos.map(t => {

            if (t.id === todo.id) {

                t.task = todo.task ?? '';
                t.completed = todo.completed;
            }
            return t;
        });

        setTodos([...updatedTodos]);
    }

    async function addTodo() {

        const res = await todosRepository.create(userDetails.name, newTodo); 
        const createdTodo: TTodo = {task: res.task, id: res.id, completed: res.completed};
        setTodos([...todos, createdTodo]); 
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