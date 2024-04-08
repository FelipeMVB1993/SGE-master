const Database = require("../database");

const banco = new Database
class Matricula {
    cpf_aluno;
    codigo_turma;
    constructor(cpf_aluno, codigo_turma) {
        this.cpf_aluno= cpf_aluno;
        this.codigo_turma = codigo_turma;
    }

    async getAll() {
        const matriculas = await banco.ExecutaComando('SELECT * FROM matricula')
        return matriculas;
    }

    async filtrar({ cpf }) {
        try {
            const sql = `SELECT * FROM matricula WHERE cpf_aluno = ?`;
            let matricula = await banco.ExecutaComando(sql, [cpf]);
          
            return matricula;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async create(dadosMatricula) {
        await banco.ExecutaComandoNonQuery('insert into matricula set ?', dadosMatricula)
    }

    async update(codigo, dadosDisciplina) {
        await banco.ExecutaComandoNonQuery('update disciplina set ? where codigo = ?', [dadosDisciplina, codigo])
    }

    async deleteMatricula(cpf) {
        await banco.ExecutaComandoNonQuery('DELETE FROM matricula WHERE cpf_aluno = ?', [cpf])
    }
}

module.exports = Matricula

