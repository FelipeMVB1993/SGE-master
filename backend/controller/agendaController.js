const Agenda = require("../model/entidades/agenda");

const agenda = new Agenda();

class AgendaController {
    
    async getAll(req, res) {
        try {
            const result = await agenda.getAll()
            return res.status(200).json(result)
        } catch (error) {
            console.log("Erro ao buscar agendas" + error)
            res.status(500).json({ error: "Erro ao buscar agendas" })
        }

    }

    async filtrar(req, res) {
        const filtro = req.body;
        try {
          const result = await agenda.filtrar(filtro);
          return res.status(200).json(result);
        } catch (error) {
          console.error('Error during filtering:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      }


    async getByCodigo(req, res) {
        const codigo = req.params.codigo;
        try {
            const result = await agenda.getByCodigo(codigo)
            if (result) {
                return res.status(200).json(result)
            } else {
                res.status(404).json({ error: 'Agenda não encontrada' })
            }
        } catch (error) {
            console.log("Erro ao buscar agendas" + error)
            res.status(500).json({ error: "Erro ao buscar agendas" })
        }

    }

    async create(req, res) {
        const agendaData = req.body;
        try {
            await agenda.create(agendaData)
            res.status(200).json({ message: "Agenda cadastrado com sucesso" })
        } catch (error) {
            console.log("Erro ao cadastrar agenda" + error)
            res.status(500).json({ error: "Erro ao cadastrar agenda" })
        }
    }

    async update(req, res) {
        const codigo = req.params.codigo;
        const agendaData = req.body;
        try {
            await agenda.update(codigo, agendaData)
            res.status(200).json({ message: "Agenda atualizada com sucesso" })
        } catch (error) {
            console.log("Erro ao atualizar agenda" + error)
            res.status(500).json({ error: "Erro ao atualizar agenda" })
        }
    }

    async deleteAgenda(req,res){
        const codigo = req.params.codigo;
        try{
            await agenda.deleteAgenda(codigo);
            res.status(200).json({message:'Agenda Deletado com sucesso!'})
        }catch(error){
            console.log('Erro ao deletar agenda',error)
            res.status(500).json({error:'Erro ao deletar agenda'})
        }
    }

}

module.exports = AgendaController;