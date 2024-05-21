
const Responsavel = require("../model/entidades/responsavel");

const responsavel = new Responsavel()

class ResponsavelController{

    // async getAll (req,res){

    //     try{
    //         const result = await responsavel.getAll()
    //         return res.status(200).json(result)
    //     }

    //     catch (error){
    //         console.log('Erro ao buscar responsável:'+ error);
    //         res.status(500).json({error:'Erro ao buscar Responsável'})
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
            const responsavel = new Responsavel();
            responsavel.getAll(termo).then((listaResponsaveis)=>{
                res.json(
                    {
                        status:true,
                        listaResponsaveis: listaResponsaveis
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

    async filtrar (req,res){
        const filtro = req.body;

        try{
            const result = await responsavel.filtrar(filtro) 
            return res.status(200).json(result);
        }
        catch (error){
        }
    }

    async getById (req,res){

        const cpf = req.params.cpf;

        try{
            const result = await responsavel.getById(cpf)

            if (result){
                return res.status(200).json(result)
            }

            else{
                res.status(404).json({erro:'Registro não encontrado'})
            }

        }

        catch (error){
            console.log('Erro ao buscar responsável:'+ error);
            res.status(500).json({error:'Erro ao buscar Responsável'})
        }
    }

    async create (req,res){
        const responsavelData = req.body;

        try{
            await responsavel.create(responsavelData);
            res.status(201).json({message:'Registro inserido com sucesso'})
        }

        catch (error){
            console.log('Erro ao inserir responsável:'+ error);
            res.status(500).json({error:'Erro ao inserir Responsável'})
        }
    }

    async update (req,res){
        const cpf = req.params.cpf;
        const responsavelData = req.body;

        try{
            await responsavel.update(cpf,responsavelData);
            res.status(201).json({message:'Registro atualizado com sucesso'})
        }

        catch (error){
            console.log('Erro ao atualizar responsável:'+ error);
            res.status(500).json({error:'Erro ao atualizar Responsável'})
        }
    }

    async delete (req,res){

        const cpf = req.params.cpf;

        try{
            await responsavel.delete(cpf);
            res.status(200).json({message:'Registro Deletado com Sucesso'})
        }

        catch(error){
            console.log('Erro ao Deletar Responsável',error)
            res.status(500).json({error:'Erro ao Deletar Responsável'})
        }

    }

}

module.exports=ResponsavelController;