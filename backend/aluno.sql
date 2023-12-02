CREATE TABLE aluno (
    cpf varchar(14) not null primary key,
    rg varchar(13) null,
    nome varchar(100) null,
    sobrenome varchar(100) null,
    dataNascimento datetime(8) null,
    sexo varchar(15) null,
    endereco varchar(100) null,
    bairro varchar(100) null,
    cidade varchar(100) null,
    cep varchar(100) null,
    estado varchar(100) null,
    telefone varchar(20) null,
    email varchar(100) null
);