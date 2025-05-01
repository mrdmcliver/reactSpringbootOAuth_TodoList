
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
    const create: (name: string, todo: string) => Promise<any> = (name, todo) => {

        return fetch('/api/todo/create', {

            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify( {
                username: name,
                description: todo
            })
        })
        .then(res => {
            return res.json();
         }); 
    }

    return {find, create};
}

export default useTodosRepository;