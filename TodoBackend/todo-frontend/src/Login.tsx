import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser } from "./LoginSlice";
import { Dispatch, useState } from "react";
import { ILoginRepository } from "./LoginRepository";

interface LoginForm {
  userName: string;
  password: string;
}

export interface LoginViewModel {

  repository: ILoginRepository;
  loginErrorEvent:(err: any) => void;
  loginError:any;
  navigate:(url:string) => void;
  notifyLoggedIn:Dispatch<{ payload: any; type: string; }>;
}

export const viewModel: LoginViewModel = {} as LoginViewModel;

export const submitLogin: SubmitHandler<LoginForm> = async (data: LoginForm) => {

  const tokenDTO: any = await viewModel.repository.authenticateUser(data.userName, data.password);
  viewModel.notifyLoggedIn(setLoggedInUser({name: data.userName, token: tokenDTO.token}));
  viewModel.navigate('/todos');
}

const Login = (props:{repository: ILoginRepository}) => {

  viewModel.navigate = useNavigate();
  viewModel.repository = props.repository;

  const {register, handleSubmit, formState:{errors}} = useForm<LoginForm>();
  viewModel.notifyLoggedIn = useDispatch<any>();
  [viewModel.loginError, viewModel.loginErrorEvent] = useState(null);

  return (
    <>
      {viewModel.loginError && <h5>You have an error {viewModel.loginError}</h5>}
      <form onSubmit={handleSubmit(submitLogin)} className="form">
        
          <label>Name:</label>
          <input type="text" {...register("userName", {required: true, minLength: 3})} />
          {errors.userName && <p role="alert">please enter a proper name</p>}
          <label>Password:</label>
          <input type="password" {...register("password", {required: true, minLength: 6})} />
          {errors.password && <p role="alert">password needs to be at least six characters</p>}
          <input type="submit" />
      </form>
    </>
  );
};

export default Login;

