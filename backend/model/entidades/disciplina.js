const Database = require("../database");

const banco = new Database
class Disciplina {
    codigo;
    nome;
    constructor(codigo, nome) {
        this.codigo = codigo;
        this.nome = nome;
    }

    async getAll() {
        const disciplinas = await banco.ExecutaComando('SELECT * FROM disciplina')
        return disciplinas;
    }

    async filtrar({ codigo }) {
        try {
          const sql = 'SELECT * FROM disciplina WHERE codigo = ?';
      
          // Assuming ExecutaComando accepts parameters and returns a promise
          let disciplinas = await banco.ExecutaComando(sql, [codigo]);
      
          return disciplinas;
        } catch (error) {
          console.error(error);
          throw error; // Optionally rethrow the error for the calling code to handle
        }
      }

    async create(dadosDisciplina) {
        await banco.ExecutaComandoNonQuery('insert into disciplina set ?', dadosDisciplina)
    }

    async update(codigo, dadosDisciplina) {
        await banco.ExecutaComandoNonQuery('update disciplina set ? where codigo = ?', [dadosDisciplina, codigo])
    }

    async getByCodigo(codigo) {
        const result = await banco.ExecutaComando('SELECT * FROM disciplina WHERE codigo = ?', [codigo]);
        const disciplina = result[0];
        return disciplina;
    }

    async deleteDisciplina(codigo) {
        await banco.ExecutaComandoNonQuery('DELETE FROM disciplina WHERE codigo = ?', [codigo])
    }
}

module.exports = Disciplina


