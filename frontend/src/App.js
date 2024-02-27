import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ComponenteMenu from "./COMPONENTES/MENU/ComponenteMenu";
import ComponenteTabela from './COMPONENTES/FELIPE/ComponenteTabela'
import './App.css';
import DadosDisciplina from './COMPONENTES/FELIPE/DadosDisciplina';
import DadosAgenda from './COMPONENTES/FELIPE/DadosAgenda'


function App() {
  const [isMenuExpanded, setMenuExpanded] = useState(false);

  return (
    <BrowserRouter>

      <ComponenteMenu isMenuExpanded={isMenuExpanded} setMenuExpanded={setMenuExpanded} />

      <Routes>
        <Route path='/cadastroAlunos' element={<ComponenteTabela isMenuExpanded={isMenuExpanded} ></ComponenteTabela>} />
      </Routes>

      <Routes>
        <Route path="/cadastroDisciplina" element={<DadosDisciplina isMenuExpanded={isMenuExpanded}/>}/>
      </Routes>

      <Routes>
        <Route path="/cadastroAgenda" element={<DadosAgenda isMenuExpanded={isMenuExpanded}/>}/>
      </Routes>

    </BrowserRouter>  
  );
}

export default App;
