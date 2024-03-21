const Professor = require("../model/entidades/professor");

const professor = new Professor();

class ProfessorController {
    async getAll(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const professorr = new Professor();
            professor.getAll(termo).then((listaProfessores)=>{
                resposta.json(
                    {
                        status:true,
                        listaProfessores: listaProfessores
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter os autores: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar autores!"
            });
        }
    }

    async filtrar(req, res) {
        const filtro = req.body;
        try {
          const result = await professor.filtrar(filtro);
          return res.status(200).json(result);
        } catch (error) {
          console.error('Error during filtering:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      }


    async getByCodigo(req, res) {
        const codigo = req.params.codigo;
        try {
            const result = await professor.getByCodigo(codigo)
            if (result) {
                return res.status(200).json(result)
            } else {
                res.status(404).json({ error: 'Professor não encontrado' })
            }
        } catch (error) {
            console.log("Erro ao buscar professores" + error)
            res.status(500).json({ error: "Erro ao buscar professores" })
        }

    }

    async create(req, res) {
        const professorData = req.body;
        try {
            await professor.create(professorData)
            res.status(200).json({ message: "Professor cadastrado com sucesso" })
        } catch (error) {
            console.log("Erro ao cadastrar professor" + error)
            res.status(500).json({ error: "Erro ao cadastrar professor" })
        }
    }

    async update(req, res) {
        const codigo = req.params.codigo;
        const disciplinaData = req.body;
        try {
            await professor.update(codigo, disciplinaData)
            res.status(200).json({ message: "Disciplina atualizada com sucesso" })
        } catch (error) {
            console.log("Erro ao atualizar disciplina" + error)
            res.status(500).json({ error: "Erro ao atualizar disciplina" })
        }
    }

    async deleteDisciplina(req, res) {
        const codigo = req.params.codigo;
        try {
            await professor.deleteDisciplina(codigo);
            res.status(200).json({ message: 'Disciplina Deletada com sucesso!' })
        } catch (error) {
            console.log('Erro ao deletar disciplina', error)
            res.status(500).json({ error: 'Erro ao deletar disciplina' })
        }
    }

}

module.exports = ProfessorController