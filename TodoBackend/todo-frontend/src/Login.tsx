import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser } from "./LoginSlice";
import { useState } from "react";

interface LoginForm {
  userName: string;
  password: string;
}

const Login = () => {

    let navigate = useNavigate();

    const {register, handleSubmit, formState:{errors}} = useForm<LoginForm>();
    const dispatch = useDispatch();
    const [apiError, setApiError] = useState(null);

    const submitLogin: SubmitHandler<LoginForm> = (data: LoginForm) => {

        fetch('/api/auth/login', {

            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              name: data.userName,
              password: data.password,
            })
          }).then(res => { 
            return res.json();
          }).then(tokenDTO => {

            dispatch(setLoggedInUser({name: data.userName, token: tokenDTO.token}));
            navigate('/todos');
          }).catch(err => {

            setApiError(err.toString());
          });
    }

    return (
        <>
            {apiError && <h5>You have an error {apiError}</h5>}
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

