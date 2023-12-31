import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ComponenteMenu from "./COMPONENTES/MENU/ComponenteMenu";
import ComponenteTabela from './COMPONENTES/FELIPE/ComponenteTabela'

import './App.css';

function App() {
  const [isMenuExpanded, setMenuExpanded] = useState(false);

  return (
    <BrowserRouter>

      <ComponenteMenu isMenuExpanded={isMenuExpanded} setMenuExpanded={setMenuExpanded} />

      <Routes>
        <Route path='/cadastroAlunos' element={<ComponenteTabela isMenuExpanded={isMenuExpanded} ></ComponenteTabela>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;


