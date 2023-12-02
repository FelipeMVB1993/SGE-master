import AlunoService from '../../SERVICES/alunoService';
import './ComponenteDeClasseTabela.css';
import { useState, useEffect } from 'react';
import ComponenteFormularioAluno from './ComponenteFormularioAluno';

const alunoService = new AlunoService();

function ComponenteTabela({ isMenuExpanded }) {
  const [alunos, setAlunos] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState(null);

  const carregaAlunos = async () => {
    try {
      const dados = await alunoService.getAllAlunos();
      setAlunos(dados);
    } catch (error) {
      alert('Erro ao carregar alunos' + error);
    }
  };

  useEffect(() => {
    carregaAlunos();
  }, []);

  const handleDelete = async (cpf) => {
    await alunoService.deleteAluno(cpf);
    await carregaAlunos();
  };

  // const handleEdit = async (aluno) => {
  //   document.getElementById('atualizar').disable = true;
  //   setSelectedAluno(aluno);
  // };

  const handleEdit = async (aluno) => { 
    document.getElementById('cadastrar').disabled = true;
    document.getElementById('atualizar').disabled = false;
    setSelectedAluno(aluno); };

  const handleRestaurarTabela = async () => {
    await carregaAlunos();
  }
  
  const handleSave = async (aluno) => {
    try {
      if (selectedAluno === null) {
        await alunoService.createAluno(aluno);
      } else {
        await alunoService.updateAluno(selectedAluno.cpf, aluno);
      }
      await carregaAlunos();
      setSelectedAluno(null);
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
    }
  };

  const handleFiltrar = async () => {
    try {
      console.log('Search Input:', searchInput);

      if (!searchInput) {
        console.log('No Search Input. Loading all students.');
        await carregaAlunos();
        return;
      }

      const alunosFiltrados = await alunoService.filtrar({ nome: searchInput });

      if (alunosFiltrados.length === 0) {
        setError('Aluno não encontrado. Verifique o nome e tente novamente.');
        setTimeout(() => {
          setError(null);
        }, 5000);
      } else {
        setAlunos(alunosFiltrados);
      }
    } catch (error) {
      console.error('Erro ao filtrar alunos:', error);
      setError('Erro ao filtrar alunos. Tente novamente mais tarde.');
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  

  return (
    <div id="formularioAluno" className={isMenuExpanded ? "expanded" : ""}>
      <div className="main--content">
        <div className="form--wrapper">
          <ComponenteFormularioAluno selectedAluno={selectedAluno} onSave={handleSave} />
          <div className="row">
            <div className="col-6">
              <div className="form-group borda-form mt-5">
                <label htmlFor="pesquisar">
                  <i className="bi bi-search"></i> Pesquisar:
                </label>
                <div className="input-group flex-nowrap">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Informe o nome do Aluno"
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    name="nome"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div id='pesquisar'>
              <button
                className="btn btn-primary btn-gradient"
                id="pesquisar"
                type="button"
                onClick={handleFiltrar}
              >
                Pesquisar
              </button>
            </div>
            <div id='restaurar'>
              <button
                className="btn btn-primary btn-gradient"
                id="pesquisar"
                type="restaurar"
                onClick={handleRestaurarTabela}
              >
                Restaurar Tabela
              </button>
            </div>
            {error && <div className="alert alert-danger ml-4" role="alert">{error}</div>}
            <table class="table table-hover">
            <thead class="azul">
              <tr>
                <th scope="col">CPF</th>
                <th scope="col">RG</th>
                <th scope="col">Nome</th>
                <th scope="col">Data de Nascimento</th>
                <th scope="col">Sexo</th>
                <th scope="col">Endereço</th>
                <th scope="col">Telefone</th>
                <th scope="col">Email</th>
                <th scope="col">Editar</th>
                <th scope="col">Excluir</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.cpf}>
                  <td className="texto">{aluno.cpf}</td>
                  <td className="texto">{aluno.rg}</td>
                  <td className="texto">{aluno.nome} {aluno.sobrenome}</td>
                  <td className="texto">{aluno.dataNascimento}</td>
                  <td className="texto">{aluno.sexo}</td>
                  <td className="texto">{aluno.endereco} <br /> {aluno.bairro} <br /> {aluno.cidade}/{aluno.estado} <br /> {aluno.cep}</td>
                  <td className="texto">{aluno.telefone}</td>
                  <td className="texto">{aluno.email}</td>
                  <td>
                    <div className="centraliza">
                      <button className="btn btn-primary m-2" onClick={() => { handleEdit(aluno) }}>
                        <i class="bi bi-pencil-square"></i>{" "}
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="centraliza">
                      <button className="btn btn-danger m-2" onClick={() => { handleDelete(aluno.cpf) }}>
                        <i class="bi bi-trash"></i>{" "}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div> 
        </div>
      </div>
    </div>
  );
}

export default ComponenteTabela;

