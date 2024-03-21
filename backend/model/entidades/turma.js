const Database = require("../database");

const banco = new Database
class Turma {
    codigo;
    serie;
    turma;
    periodo;
    professor;
    constructor(codigo, serie, turma, periodo, professor) {
        this.codigo = codigo;
        this.serie = serie;
        this.turma= turma;
        this.periodo = periodo;
        this.professor = professor;
    }

    async getAll() {
        const turmas = await banco.ExecutaComando('SELECT * FROM turma')
        return turmas;
    }

    async filtrar({ serie }) {
        try {
            const sql = `SELECT * FROM turma WHERE serie LIKE '%${serie}%'`;

            // Assuming ExecutaComando accepts parameters and returns a promise
            let turmas = await banco.ExecutaComando(sql);

            return turmas;
        } catch (error) {
            console.error(error);
            throw error; // Optionally rethrow the error for the calling code to handle
        }
    }

    async create(dadosTurma) {
        await banco.ExecutaComandoNonQuery('insert into turma set ?', dadosTurma)
    }

    async update(codigo, dadosTurma) {
        const sql = 'UPDATE turma SET serie = ?, professor = ?, turma = ?, periodo = ? WHERE codigo = ?';
        const params = [dadosTurma.serie, dadosTurma.professor, dadosTurma.turma, dadosTurma.periodo, codigo];
    
        await banco.ExecutaComandoNonQuery(sql, params);
    }
    
    async getByCodigo(codigo) {
        const result = await banco.ExecutaComando('SELECT * FROM turma WHERE codigo = ?', [codigo]);
        const turma = result[0];
        return turma;
    }

    async deleteTurma(codigo) {
        await banco.ExecutaComandoNonQuery('DELETE FROM turma WHERE codigo = ?', [codigo])
    }
}

module.exports=Turma;

