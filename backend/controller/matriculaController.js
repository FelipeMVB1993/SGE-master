const Matricula = require("../model/entidades/matricula");

const matricula = new Matricula();

class MatriculaController {
    async getAll(req, res) {
        res.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = req.params.termo;
        if (!termo) {
            termo = "";
        }
        if (req.method === "GET") {
            const matricula = new Matricula();
            matricula.getAll(termo).then((listaMatriculas) => {
                res.json(
                    {
                        status: true,
                        listaMatriculas: listaMatriculas
                    });
            })
                .catch((erro) => {
                    res.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os autores: " + erro.message
                        }
                    );
                });
        }
        else {
            res.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar autores!"
            });
        }
    }

    async filtrar(req, res) {
        const cpf = req.body;
        try {
            const result = await matricula.filtrar(cpf);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error during filtering:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async filtrarMatriculaAluno(req, res) {
        const { cpf } = req.params;
        try {
            const result = await matricula.filtrarMatriculaAluno(cpf);
            console.log(result)
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error during filtering:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    async create(req, res) {
        const matriculaData = req.body;
        try {
            await matricula.create(matriculaData)
            res.status(200).json({
                "status": true,
                "mensagem": "Aluno matriculado com sucesso!"
            });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(400).json({
                    "status": false,
                    "mensagem": "Não foi possível realizar a matrícula pois o aluno já está matriculado em outra turma."
                });
            } else {
                console.log("Erro ao matricular aluno", error);
                res.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao matricular aluno"
                });
            }
        }
    }


    async update(req, res) {
        const cpf = req.body.cpf;
        const matriculaData = req.body;
        try {
            await matricula.update(cpf, matriculaData)
            res.status(200).json({ message: "Matricula atualizada com sucesso" })
        } catch (error) {
            console.log("Erro ao atualizar matricula" + error)
            res.status(500).json({ error: "Erro ao atualizar matricula" })
        }
    }

    async deleteMatricula(req, res) {
        const cpf = req.params.cpf;
        try {
            await matricula.deleteMatricula(cpf);
            res.status(200).json({ message: 'Matricula deletada com sucesso!' })
        } catch (error) {
            console.log('Erro ao deletar turma', error)
            res.status(500).json({ error: 'Erro ao deletar turma' })
        }
    }

}

module.exports = MatriculaController