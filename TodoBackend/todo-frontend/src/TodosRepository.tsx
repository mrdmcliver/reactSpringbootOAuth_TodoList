import { Dispatch, SetStateAction, useState } from "react";

const useTodosRepository = (token: string) => {

    const [todoRes, setTodoRes]: [string | undefined, Dispatch<SetStateAction<string | undefined>>] = useState<string>();

    /** finds all todos */
    const find = () => {

        fetch('/api/todos', {

            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        .then(res => res.text())
        .then(str => setTodoRes(str)) // TODO: start retrieving a list of todos from the backend
        .catch(err => {
            setTodoRes(err.toString());
        });
    }

    return {todoRes, find};
}

export default useTodosRepository;