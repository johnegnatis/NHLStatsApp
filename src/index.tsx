import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './Outlet';
import { Body } from './components/IndexNHL';
import './index.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { TeamDisplay } from './components/IndexTeam';

ReactDOM.render(
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/NHLStatsApp/" element={<App />}>
            <Route index element= {<Body/>}/>
            <Route path ="/NHLStatsApp/:teamName" element = {<TeamDisplay/> } />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </React.StrictMode>
    </BrowserRouter>,
  document.getElementById('root')
);

