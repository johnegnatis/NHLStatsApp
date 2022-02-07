import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Body } from './components/Body';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TeamDisplay } from './components/TeamDisplay';

ReactDOM.render(
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element= {<Body/>}/>
            {/* {routes} */}
            <Route path =":teamName" element = {<TeamDisplay/> } />
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

