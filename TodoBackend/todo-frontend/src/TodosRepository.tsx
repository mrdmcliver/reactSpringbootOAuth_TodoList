import { Dispatch, SetStateAction, useState } from "react";

const useTodosRepository = (token: string) => {

    /** finds all todos */
    const find: (name: string) => Promise<any> = (name) => {

        return fetch('/api/todos/' + name, {

            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        .then(res => {
            return res.json();
         }); 
    }

    return {find};
}

export default useTodosRepository;