import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import criancasEstudando from "../../assets/criancasEstudando.jpg";
import { useForm } from "react-hook-form";
import { LoginModel } from "../../models/LoginModel";
import { UsersService } from "../../services/UsersService";
import { ToastSuccess, ToastError } from "../../components/Toasts/Toasts";
import { login } from "../../services/Auth";

export function LoginIndex() {
  const history = useHistory();

  const navigation = (url) => {
    history.push(url);
  };

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

  const formLogin = useForm({
    defaultValues: LoginModel.createLogin(),
  });

  function logIn() {
    const form = { ...formLogin.getValues() };
    UsersService.login(form)
      .then((response) => {
        login(response.data);
        console.log(response);
        ToastSuccess("Logado com sucesso!");
        navigation("/inicio/");
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
              <img src={criancasEstudando} width="800px"></img>
            </Col>
            <Col>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h5>SGE - SISTEMA DE GESTÃO ESCOLAR</h5>
                <Form.Group className="mt-5 mb-3" controlId="formBasicEmail">
                  <Form.Label>Endereço de email</Form.Label>
                  <Form.Control
                    {...formLogin.register("email")}
                    type="email"
                    placeholder="Digite o seu email..."
                    required
                  />
                  <Form.Text className="text-muted">
                    Não iremos divulgar seu email com ninguém.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    {...formLogin.register("password")}
                    placeholder="Digite a sua senha..."
                    required
                  />
                </Form.Group>
                <Row>
                  <Col className="text-center mt-5">
                    <p>
                      Ainda não é registrado?{" "}
                      <a href="/registro">Registre-se</a>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center mt-5">
                    <Button variant="primary" type="submit" onClick={logIn}>
                      Logar
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
