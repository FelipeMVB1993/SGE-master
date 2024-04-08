const Turma = require("../model/entidades/turma");

const turma = new Turma();

class TurmaController {
    
    // async getAll(req, res) {
    //     try {
    //         const result = await turma.getAll()
    //         return res.status(200).json(result)
    //     } catch (error) {
    //         console.log("Erro ao buscar turmas" + error)
    //         res.status(500).json({ error: "Erro ao buscar turmas" })
    //     }

    // }

    async getAll(req, res) {
        res.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = req.params.termo;
        if (!termo){
            termo = "";
        }
        if (req.method === "GET"){
            const turma = new Turma();
            turma.getAll(termo).then((listaTurmas)=>{
                res.json(
                    {
                        status:true,
                        listaTurmas: listaTurmas
                    });
            })
            .catch((erro)=>{
                res.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter os autores: " + erro.message
                    }
                );
            });
        }
        else 
        {
            res.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar autores!"
            });
        }
    }

    async filtrar(req, res) {
        const filtro = req.body;
        try {
          const result = await turma.filtrar(filtro);
          return res.status(200).json(result);
        } catch (error) {
          return res.status(500).json({ error: 'Erro' });
        }
      }


    async getByCodigo(req, res) {
        const codigo = req.params.codigo;
        try {
            const result = await turma.getByCodigo(codigo)
            if (result) {
                return res.status(200).json(result)
            } else {
                res.status(404).json({ error: 'Turma não encontrada' })
            }
        } catch (error) {
            console.log("Erro ao buscar turmas" + error)
            res.status(500).json({ error: "Erro ao buscar turmas" })
        }

    }

    async create(req,res){
        const turmaData = req.body;
        try{
            await turma.create(turmaData)
            res.status(200).json({
                "status": true,
                "mensagem": "Turma incluída com sucesso!"
            })
        }catch(error){
            console.log("Erro ao cadastrar turma "+error+"a")
            res.status(500).json({error: "Erro ao cadastrar turma"})
        }
    }
    
    async update(req, res) {
        const codigo = req.params.codigo;
        const turmaData = req.body;
        try {
            await turma.update(codigo, turmaData)
            res.status(200).json({ message: "Turma atualizada com sucesso" })
        } catch (error) {
            console.log("Erro ao atualizar turma" + error)
            res.status(500).json({ error: "Erro ao atualizar turma" })
        }
    }

    async deleteTurma(req,res){
        const codigo = req.params.codigo;
        try{
            await turma.deleteTurma(codigo);
            res.status(200).json({message:'Turma deletada com sucesso!'})
        }catch(error){
            console.log('Erro ao deletar turma',error)
            res.status(500).json({error:'Erro ao deletar turma'})
        }
    }

}

module.exports = TurmaController;