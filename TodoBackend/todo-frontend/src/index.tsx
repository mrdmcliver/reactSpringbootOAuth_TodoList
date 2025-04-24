import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './LoginStore';
import PrivateRoute from './PrivateRoute';
import TodoList from './TodoList';
import Login from './Login';

const router = createBrowserRouter(

  createRoutesFromElements(

    <Route
      path="/"
      element={<App title='Helloword'/>}
    >
      <Route path='todos' element={<PrivateRoute><TodoList/></PrivateRoute>} >
      </Route>
      <Route path="login" element={<Login/>} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
