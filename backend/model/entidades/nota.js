const Database = require("../database");
const banco = new Database();

class Nota {
    constructor(id_nota,codigo_turma, cpf_aluno, codigo_disciplina, nota, bimestre, falta) {
        this.id_nota = id_nota;
        this.codigo_turma = codigo_turma;
        this.cpf_aluno = cpf_aluno;
        this.codigo_disciplina = codigo_disciplina;
        this.nota = nota;
        this.bimestre = bimestre;
        this.falta = falta;
    }

    async getAll() {
        return await banco.ExecutaComando('SELECT * FROM nota');
    }

    async create(dadosNota) {
        const sql = 'INSERT INTO nota (codigo_turma, cpf_aluno, codigo_disciplina, bimestre, nota, falta) VALUES (?, ?, ?, ?, ?, ?)';
        try {
            await banco.ExecutaComandoNonQuery(sql, [
                dadosNota.codigo_turma,
                dadosNota.cpf_aluno,
                dadosNota.codigo_disciplina,
                dadosNota.bimestre,
                dadosNota.nota,
                dadosNota.falta
            ]);
            return { message: 'Registro inserido com sucesso' };
        } catch (error) {
            console.log('Erro SQL:', error); // Log detalhado do erro
            console.log('Detalhe do Erro:', error.message); // Mensagem específica do erro
            console.log('Pilha de Erro:', error.stack); // Pilha de chamada para localizar a origem do erro
            return { error: 'Erro ao inserir Nota', sqlError: error.message };
        }
    }
    
    

    async getById(id_nota) {
        const sql = 'SELECT * FROM nota WHERE id_nota = ?';
        const notas = await banco.ExecutaComando(sql, [id_nota]);
        return notas[0]; // Retorna o primeiro resultado, pois ID é único
    }

    async update(id_nota, dadosNota) {
        const sql = 'UPDATE nota SET codigo_turma = ?, cpf_aluno = ?, codigo_disciplina = ?, bimestre = ?, nota = ?, falta = ? WHERE id_nota = ?';
        await banco.ExecutaComandoNonQuery(sql, [...Object.values(dadosNota), id_nota]);
    }

    async delete(id_nota) {
        const sql = 'DELETE FROM nota WHERE id_nota = ?';
        await banco.ExecutaComandoNonQuery(sql, [id_nota]);
    }
}

module.exports = Nota;
