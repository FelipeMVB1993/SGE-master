const express = require('express')
const cors = require('cors')
const app = express()
const porta = 3001;
app.use(express.json());

app.use(cors({origin:'http://localhost:3000',credentials:true}))
const alunoRoutes = require('./routes/alunoRoutes')
app.use('/aluno',alunoRoutes);
const disciplinaRoutes = require('./routes/disciplinaRoutes')
app.use('/disciplina',disciplinaRoutes);
const agendaRoutes = require('./routes/agendaRoutes')
app.use('/agenda',agendaRoutes);



app.listen(porta,()=>{
    console.log("Servidor escutando na porta:",porta)
})
