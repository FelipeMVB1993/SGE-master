// import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css';
// import Login from './COMPONENTES/LOGIN/Login';
// import ComponenteMenu from "./COMPONENTES/MENU/ComponenteMenu";
// import ComponenteTabela from './COMPONENTES/FELIPE/ComponenteTabela';
// import DadosDisciplina from './COMPONENTES/FELIPE/DadosDisciplina';
// import DadosAgenda from './COMPONENTES/FELIPE/DadosAgenda';


// function App() {
//   const [isMenuExpanded, setMenuExpanded] = useState(false);

//   return (
//     <BrowserRouter>
//       <Login></Login>
//       <ComponenteMenu isMenuExpanded={isMenuExpanded} setMenuExpanded={setMenuExpanded} />

//       <Routes>
//         <Route path='/cadastroAlunos' element={<ComponenteTabela isMenuExpanded={isMenuExpanded} ></ComponenteTabela>} />
//       </Routes>

//       <Routes>
//         <Route path="/cadastroDisciplina" element={<DadosDisciplina isMenuExpanded={isMenuExpanded}/>}/>
//       </Routes>

//       <Routes>
//         <Route path="/cadastroAgenda" element={<DadosAgenda isMenuExpanded={isMenuExpanded}/>}/>
//       </Routes>

//     </BrowserRouter>  
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Login from './COMPONENTES/LOGIN/Login';
import ComponenteMenu from "./COMPONENTES/MENU/ComponenteMenu";
import ComponenteTabela from './COMPONENTES/FELIPE/ComponenteTabela';
import DadosDisciplina from './COMPONENTES/FELIPE/DadosDisciplina';
import DadosAgenda from './COMPONENTES/FELIPE/DadosAgenda';
import DadosTurma from './COMPONENTES/FELIPE/DadosTurma';
import DadosMatricula from './COMPONENTES/FELIPE/DadosMatricula';
import CadastroResponsavel from "./COMPONENTES/MARIANE/CadastroResponsavel";
function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isMenuExpanded, setMenuExpanded] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
    setLoggedIn(true);
  };

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <Login path='/cadastro' onLogin={handleLogin} />
      ) : (
        <>
          <ComponenteMenu path='/cadastros' isMenuExpanded={isMenuExpanded} setMenuExpanded={setMenuExpanded} />

          <Routes>
            <Route path='/cadastroAlunos' element={<ComponenteTabela isMenuExpanded={isMenuExpanded} />} />
            <Route path="/cadastroDisciplina" element={<DadosDisciplina isMenuExpanded={isMenuExpanded} />} />
            <Route path="/cadastroAgenda" element={<DadosAgenda isMenuExpanded={isMenuExpanded} />} />
            <Route path="/cadastroTurma" element={<DadosTurma isMenuExpanded={isMenuExpanded} />} />
            <Route path="/matriculas" element={<DadosMatricula isMenuExpanded={isMenuExpanded} />} />
            <Route path="/cadastroResponsavel" element={<CadastroResponsavel isMenuExpanded={isMenuExpanded} />}/>
          </Routes>
        </>
      )}
    </BrowserRouter>  
  );
}

export default App;
