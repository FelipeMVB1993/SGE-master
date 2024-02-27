const Database = require("../database");

const banco = new Database
class Agenda {
    codigo;
    nome;
    turma;
    dia;
    hora;
    constructor(codigo=0, nome, turma, dia, hora) {
        this.codigo = codigo;
        this.nome = nome;
        this.turma = turma;
        this.dia = dia;
        this.hora = hora;
    }

    async getAll() {
        const agendas = await banco.ExecutaComando('SELECT * FROM agenda')
        return agendas;
    }

    async filtrar({ nome }) {
        try {
            const sql = `SELECT * FROM agenda WHERE nome LIKE '%${nome}%'`;

            // Assuming ExecutaComando accepts parameters and returns a promise
            let agendas = await banco.ExecutaComando(sql);

            return agendas;
        } catch (error) {
            console.error(error);
            throw error; // Optionally rethrow the error for the calling code to handle
        }
    }
    

    async create(dadosAgenda) {
        await banco.ExecutaComandoNonQuery('insert into agenda set ?', dadosAgenda)
    }

    // async update(codigo, dadosAgenda) {
    //     await banco.ExecutaComandoNonQuery('update agenda set ? where codigo = ?', [dadosAgenda, codigo])
    // }

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
        await banco.ExecutaComandoNonQuery('DELETE FROM agenda WHERE codigo = ?', [codigo])
    }
}

module.exports=Agenda

