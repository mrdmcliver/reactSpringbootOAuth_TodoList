
import { JSX } from 'react/jsx-runtime';
import { Dispatch, useEffect, useState } from 'react';
import './App.css';
import { Link, Outlet } from 'react-router-dom';
import React from 'react';

type attr = {title: string } ;

class App extends React.Component<attr, {message: string}> {

  constructor(props: attr) {
    super(props);
    this.state = {message: ''};
  }

  componentDidMount(): void {

    fetch('/api/auth/test').then(
      res => res.text().then(val => this.setState(s => ({message: val})))
    );
  }

  render(): any {
    return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>{this.props.title}</h1>
          <p>{this.state.message}</p>
          <Link to="/todos">View the todo list</Link>
          <Outlet/>
        </header>
      </div>
    </>);
  }
}

export default App;
