import {  submitLogin, viewModel } from "./Login";

describe('login', () => {

    it('should authenticate user on submit', async () => {

        let expectedUser = '';
        let expectedUrl = '';

        viewModel.repository = {authenticateUser: (u, s) => Promise.resolve({token: 'adfa-q45qaf-afads'}) };
        viewModel.notifyLoggedIn = (value: {payload: any, type: string}) => {
            expectedUser = value.payload.name;
        };
        viewModel.navigate = (url: string) => {
            expectedUrl = url;
        };
        
        await submitLogin({userName: 'abuser', password: 'hinthint'});

        expect(expectedUser).toBe('abuser');
        expect(expectedUrl).toBe('/todos');
    });
});