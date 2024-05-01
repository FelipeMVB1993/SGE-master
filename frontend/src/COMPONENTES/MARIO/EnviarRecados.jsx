import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';


function EnviarRecados() {
    const [destinatario, setDestinatario] = useState('');
    const [assunto, setAssunto] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleDestinatarioChange = (event) => {
        setDestinatario(event.target.value);
    };

    const handleAssuntoChange = (event) => {
        setAssunto(event.target.value);
    };

    const handleMensagemChange = (event) => {
        setMensagem(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await enviarRecado({ destinatario, assunto, mensagem });
            setDestinatario('');
            setAssunto('');
            setMensagem('');
            console.log("Recado enviado com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar recado:", error);
        }
    };

    const enviarRecado = async (dadosRecado) => {
        try {
            await axios.post('http://localhost:3001/email/enviar-email', dadosRecado);
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <div className="enviar-recados-container">
            <div className="section-title text-center position-relative pb-3 mx-auto">
                <h3 className="fw-bold text-uppercase">
                    <i className="bi bi-people-fill"></i>
                    ENVIAR RECADO
                </h3>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>Destinatário:</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="email" value={destinatario} onChange={handleDestinatarioChange} placeholder="Inserir email do aluno" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>Assunto:</Form.Label>
                    <Col sm={9}>
                        <Form.Control type="text" value={assunto} onChange={handleAssuntoChange} placeholder="Assunto..." />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}>Mensagem:</Form.Label>
                    <Col sm={9}>
                        <Form.Control as="textarea" rows={3} value={mensagem} onChange={handleMensagemChange} placeholder="Inserir a mensagem..." />
                    </Col>
                </Form.Group>
                <div className="text-center">
                    <Button type="submit">Enviar Recado</Button>
                </div>
            </Form>
            <div>
                <div id='mensagem'>
                    {/* Mensagens de sucesso e erro */}
                </div>
            </div>
        </div>
    );
}

export default EnviarRecados;
