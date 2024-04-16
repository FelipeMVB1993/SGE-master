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

    async filtrar({cpf}) {
        try {
            const sql = `SELECT * FROM matricula WHERE cpf_aluno = ?`;
            let matricula = await banco.ExecutaComando(sql, [cpf]);
          
            return matricula;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async filtrar({cpf}) {
        try {
            const sql = `SELECT * FROM matricula m 
            INNER JOIN aluno a ON a.cpf = m.cpf_aluno 
            WHERE m.cpf_aluno LIKE "%${cpf}%" OR  a.nome like "%${cpf}%";`;
            let matricula = await banco.ExecutaComando(sql,[]);
            // console.log(sql)
            return matricula;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async filtrarMatriculaAluno(cpf) {
        try {
            const sql = `SELECT * FROM matricula WHERE cpf_aluno = ?`;
            let matricula = await banco.ExecutaComando(sql, [cpf]);
          
            return matricula[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    
    async create(dadosMatricula) {
        await banco.ExecutaComandoNonQuery('insert into matricula set ?', dadosMatricula)
    }

    async update(cpf, dadosMatricula) {
        await banco.ExecutaComandoNonQuery('update matricula set ? where cpf_aluno = ?', [dadosMatricula, cpf])
    }

    async deleteMatricula(cpf) {
        await banco.ExecutaComandoNonQuery('DELETE FROM matricula WHERE cpf_aluno = ?', [cpf])
    }
}

module.exports = Matricula

