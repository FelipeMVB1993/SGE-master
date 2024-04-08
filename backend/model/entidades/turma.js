const Database = require("../database");

const banco = new Database
class Turma {
    codigo;
    serie;
    turma;
    periodo;
    id_professor;
    constructor(codigo, serie, turma, periodo, id_professor) {
        this.codigo = codigo;
        this.serie = serie;
        this.turma= turma;
        this.periodo = periodo;
        this.id_professor = id_professor;
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

    // async create(dadosTurma) {
    //     try {
    //         const sql = "INSERT INTO turma (codigo, serie, turma, periodo, id_professor) VALUES (?, ?, ?, ?, ?)";
    //         const parametros = [
    //             dadosTurma.codigo,
    //             dadosTurma.serie,
    //             dadosTurma.turma,
    //             dadosTurma.periodo,
    //             dadosTurma.id_professor
    //         ];
    
    //         await banco.ExecutaComandoNonQuery(sql, parametros);
    //         console.log("Turma inserida com sucesso!");
    //         return true; // Indicating that the operation was successful
    //     } catch (error) {
    //         console.error("Erro ao registrar a turma:", error);
    //         return false; // Indicating that an error occurred
    //     }
    // }
    

    // async create(dadosTurma) {
    //     if (dadosTurma instanceof Turma) {
    //         const sql = "INSERT INTO turma(codigo, serie, turma, periodo, id_professor) VALUES (?, ?, ?, ?, ?)";
    //         const parametros = [dadosTurma.codigo, dadosTurma.serie, dadosTurma.turma, dadosTurma.periodo, dadosTurma.id_professor]; // Passando o código do departamento como um parâmetro separado
    //         try {
    //             await banco.ExecutaComandoNonQuery(sql, parametros)
    //             return true; // Indicando que a operação foi bem-sucedida
    //         } catch (erro) {
    //             console.error("Erro ao registrar o livro:", erro);
    //             return false; // Indicando que ocorreu um erro
    //         }
    //     }
    //     return false; // Indicando que o parâmetro passado não é uma instância válida de Livro
    // }

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

