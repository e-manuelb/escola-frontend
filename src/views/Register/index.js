import React, { useState } from "react";
import { useHistory } from "react-router";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UsersModel } from "../../models/UsersModel";
import { UsersService } from "../../services/UsersService";
import { ToastSuccess, ToastError } from "../../components/Toasts/Toasts";

export function RegisterIndex() {
  const history = useHistory();

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    event.preventDefault();
  };

  const navigation = (url) => {
    history.push(url);
  };

  const formUser = useForm({
    defaultValues: UsersModel.createUser(),
  });

  function saveUser() {
    const form = { ...formUser.getValues() };
    UsersService.postUser(form)
      .then(() => {
        ToastSuccess("O usuário foi cadastrado com sucesso!");
        navigation("/login");
      })
      .catch((error) => {
        console.log(error);
        ToastError(
          "Algo de errado aconteceu, verifique os campos ou entre em contato com o administrador!"
        );
      });
  }

  return (
    <Container>
      <div
        className="d-flex flex-column align-items-center"
        style={{ marginTop: "15%" }}
      >
        <Card className="p-4">
          <Row>
            <Col>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h5>SGE - SISTEMA DE GESTÃO ESCOLAR</h5>
                <Form.Group className="mt-5 mb-3" controlId="formBasicEmail">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    {...formUser.register("name")}
                    type="text"
                    required
                    placeholder="Digite o seu nome..."
                  />
                  <Form.Text className="text-muted">
                    Não divulgaremos suas informações pessoais.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Endereço de email</Form.Label>
                  <Form.Control
                    {...formUser.register("email")}
                    type="email"
                    required
                    placeholder="Digite o seu email..."
                  />
                  <Form.Text className="text-muted">
                    Não iremos divulgar seu email com ninguém.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    {...formUser.register("password")}
                    type="password"
                    required
                    placeholder="Digite uma senha..."
                  />
                  <Form.Text className="text-muted">
                    A senha precisa ter no mínimo 8 caracteres.
                  </Form.Text>
                </Form.Group>
                <Row>
                  <Col className="text-center mt-5">
                    <p>
                      Já é registrado? <a href="/">Faça o login</a>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center mt-5">
                    <Button variant="primary" type="submit" onClick={saveUser}>
                      Registrar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </Container>
  );
}
