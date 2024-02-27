const Disciplina = require("../model/entidades/disciplina");

const disciplina = new Disciplina();

class DisciplinaController {
    async getAll(req, res) {
        try {
            const result = await disciplina.getAll()
            return res.status(200).json(result)
        } catch (error) {
            console.log("Erro ao buscar disciplinas" + error)
            res.status(500).json({ error: "Erro ao buscar disciplinas" })
        }

    }

    async filtrar(req, res) {
        const filtro = req.body;
        try {
          const result = await disciplina.filtrar(filtro);
          return res.status(200).json(result);
        } catch (error) {
          console.error('Error during filtering:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      }


    async getByCodigo(req, res) {
        const codigo = req.params.codigo;
        try {
            const result = await disciplina.getByCodigo(codigo)
            if (result) {
                return res.status(200).json(result)
            } else {
                res.status(404).json({ error: 'Disciplina não encontrada' })
            }
        } catch (error) {
            console.log("Erro ao buscar disciplinas" + error)
            res.status(500).json({ error: "Erro ao buscar disciplinas" })
        }

    }

    async create(req, res) {
        const disciplinaData = req.body;
        try {
            await disciplina.create(disciplinaData)
            res.status(200).json({ message: "Disciplina cadastrado com sucesso" })
        } catch (error) {
            console.log("Erro ao cadastrar disciplina" + error)
            res.status(500).json({ error: "Erro ao cadastrar disciplina" })
        }
    }

    async update(req, res) {
        const codigo = req.params.codigo;
        const disciplinaData = req.body;
        try {
            await disciplina.update(codigo, disciplinaData)
            res.status(200).json({ message: "Disciplina atualizada com sucesso" })
        } catch (error) {
            console.log("Erro ao atualizar disciplina" + error)
            res.status(500).json({ error: "Erro ao atualizar disciplina" })
        }
    }

    async deleteDisciplina(req, res) {
        const codigo = req.params.codigo;
        try {
            await disciplina.deleteDisciplina(codigo);
            res.status(200).json({ message: 'Disciplina Deletada com sucesso!' })
        } catch (error) {
            console.log('Erro ao deletar disciplina', error)
            res.status(500).json({ error: 'Erro ao deletar disciplina' })
        }
    }

}

module.exports = DisciplinaController