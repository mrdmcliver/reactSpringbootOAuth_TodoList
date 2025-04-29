import { Dispatch, SetStateAction, useState } from "react";

const useTodosRepository = (token: string) => {

    /** finds all todos */
    const find: () => Promise<string> = () => {

        return fetch('/api/todos', {

            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        .then(res => res.text()); // TODO: start retrieving a list of todos from the backend
    }

    return {find};
}

export default useTodosRepository;