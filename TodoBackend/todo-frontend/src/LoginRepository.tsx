export type ILoginRepository = { authenticateUser: (userName: string, pword: string) => Promise<any> };

export default function useLoginRepository() {

    function authenticateUser(userName: string, pword: string): Promise<any> {

        return fetch('/api/auth/login', {

            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              name: userName,
              password: pword,
            })
          }).then(res => { 
            
            return res.json();
          });
    }

    return {authenticateUser} as ILoginRepository;
}