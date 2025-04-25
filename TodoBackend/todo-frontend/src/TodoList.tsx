import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TodoList = ({children}: any) => {

    const [todoRes, setTodoRes] = useState<string>();
    const userDetails = useSelector((state:any) => state.loggedInUser.userDetails);
    
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

    return (
        <>
            <h1>loading todos...</h1>
            <p>{todoRes}</p> 
        </>
    )
};

export default TodoList;