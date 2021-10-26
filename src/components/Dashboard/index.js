import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { logout } from "../../services/Auth";
import { ToastSuccess } from "../Toasts/Toasts";
import LogoutIcon from "@mui/icons-material/Logout";
import { UsersService } from "../../services/UsersService";

export function Dashboard(props) {
  const [userLoggedIn, setUserLoggedIn] = useState();
  const history = useHistory();

  useEffect(() => {
    getUserLoggedIn();
  }, []);

  const navigation = (url) => {
    history.push(url);
  };

  function getUserLoggedIn() {
    UsersService.me()
      .then((response) => {
        setUserLoggedIn(response.data.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logOut() {
    logout();
    ToastSuccess("Logout efetuado com sucesso!");
    navigation("/login");
  }

  return (
    <Container>
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="success" variant="dark">
        <Container>
          <Navbar.Brand href="/inicio">
            SGE - SISTEMA DE GESTÃO ESCOLAR
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigation("/escolas")}>
                Escolas
              </Nav.Link>
              <Nav.Link onClick={() => navigation("/turmas")}>Turmas</Nav.Link>
              <Nav.Link onClick={() => navigation("/alunos")}>Alunos</Nav.Link>
              <Nav.Link onClick={() => navigation("/matriculas")}>
                Matrículas
              </Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text>Logado como: {userLoggedIn}</Navbar.Text>
            </Nav>
            <Nav>
              <Nav.Link onClick={logOut}>
                <LogoutIcon />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ marginTop: "100px" }}>{props.children}</div>
    </Container>
  );
}
