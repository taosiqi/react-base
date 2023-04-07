import React from 'react';
import ReactDOM from 'react-dom/client';
import {  HashRouter } from "react-router-dom";
import Router from './router/index';
import './styles/base.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  (
    <HashRouter>
      <Router />
    </HashRouter>
  ),
);
