const Database = require("../database");

const banco = new Database
class Agendamento {
    codigo;
    responsavel;
    professor;
    dia;
    hora;
    constructor(codigo=0, responsavel, professor, dia, hora) {
        this.codigo = codigo;
        this.responsavel = responsavel;
        this.professor = professor;
        this.dia = dia;
        this.hora = hora;
    }

    async getAll() {
        const agendas = await banco.ExecutaComando('SELECT * FROM agendas')
        return agendas;
    }

    async filtrar({ nome }) {
        try {
            const sql = `SELECT * FROM agendas WHERE professor LIKE '%${nome}%'`;

            // Assuming ExecutaComando accepts parameters and returns a promise
            let agendas = await banco.ExecutaComando(sql);

            return agendas;
        } catch (error) {
            console.error(error);
            throw error; // Optionally rethrow the error for the calling code to handle
        }
    }
    

    async create(dadosAgenda) {
        await banco.ExecutaComandoNonQuery('insert into agendas set ?', dadosAgenda)
    }

    async update(codigo, dadosAgenda) {
        const sql = 'UPDATE agenda SET nome = ?, turma = ?, dia = ?, hora = ? WHERE codigo = ?';
        const params = [dadosAgenda.nome, dadosAgenda.turma, dadosAgenda.dia, dadosAgenda.hora, codigo];
    
        await banco.ExecutaComandoNonQuery(sql, params);
    }
    

    async getByCodigo(codigo) {
        const result = await banco.ExecutaComando('SELECT * FROM agenda WHERE codigo = ?', [codigo]);
        const agenda = result[0];
        return agenda;
    }

    async deleteAgenda(codigo) {
        await banco.ExecutaComandoNonQuery('DELETE FROM agendas WHERE codigo = ?', [codigo])
    }
}

module.exports=Agendamento

