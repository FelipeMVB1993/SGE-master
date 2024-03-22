const Database = require("../database");

const banco = new Database
class Professor {
    id_professor;
    nome_professor;
    constructor(id_professor, nome_professor) {
        this.id_professor = id_professor;
        this.nome_professor = nome_professor;
    }

    async getAll() {
        const professores = await banco.ExecutaComando('SELECT * FROM professor')
        return professores;
    }

    async filtrar({ codigo }) {
        try {
          const sql = 'SELECT * FROM professor WHERE codigo = ?';
      
          // Assumindo que ExecutaComando aceite os parametros e retorne a promise
          let professores = await banco.ExecutaComando(sql, [codigo]);
      
          return professores;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }

    async create(dadosProfessor) {
        await banco.ExecutaComandoNonQuery('insert into professor set ?', dadosProfessor)
    }

    async update(codigo, dadosDisciplina) {
        await banco.ExecutaComandoNonQuery('update disciplina set ? where codigo = ?', [dadosDisciplina, codigo])
    }

    // async getByCodigo(codigo) {
    //     const result = await banco.ExecutaComando('SELECT * FROM professor WHERE id_professor = ?', [codigo]);
    //     const professor = result[0];
    //     return professor;
    // }

    async getByCodigo(codigo) {
        const result = await banco.ExecutaComando('SELECT nome_professor FROM professor WHERE id_professor = ?', [codigo]);
        const professor = result[0];
        return professor.nome_professor;
    }
    

    async deleteDisciplina(codigo) {
        await banco.ExecutaComandoNonQuery('DELETE FROM disciplina WHERE codigo = ?', [codigo])
    }
}

module.exports = Professor


