CREATE TABLE aluno (
    cpf varchar(14) not null primary key,
    rg varchar(13) null,
    nome varchar(100) null,
    sobrenome varchar(100) null,
    dataNascimento varchar(100) null,
    sexo varchar(100) null,
    endereco varchar(100) null,
    bairro varchar(100) null,
    cidade varchar(100) null,
    cep varchar(100) null,
    estado varchar(100) null,
    telefone varchar(20) null,
    email varchar(100) null
);

INSERT INTO aluno (cpf, rg, nome, sobrenome, dataNascimento, sexo, endereco, bairro, cidade, cep, estado, telefone, email)
VALUES 
    ('123.456.789-01', '123456789', 'Fulano', 'Silva', '1990-01-01', 'Masculino', 'Rua A - 123', 'Centro', 'Cidade A', '12345-678', 'PR', '(11) 98765-4321', 'fulano@email.com'),
    ('987.654.321-09', '987654321', 'Ciclana', 'Oliveira', '1985-05-05', 'Feminino', 'Rua B - 456', 'Bairro B', 'Cidade B', '54321-876', 'CE', '(22) 98765-4321', 'ciclana@email.com');
