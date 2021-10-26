import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Row,
  Col,
  Form,
  Table,
  Modal,
  Button,
  ButtonGroup,
  FloatingLabel,
} from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import InfoIcon from "@mui/icons-material/Info";
import { AlunosService } from "../../services/AlunosService";
import { AlunosModel } from "../../models/AlunosModel";
import { ToastError, ToastSuccess } from "../../components/Toasts/Toasts";

export function AlunosIndex() {
  const [ID, setID] = useState();
  const [alunos, setAlunos] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [alunoByID, setAlunoByID] = useState([]);

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

  const formAlunos = useForm({
    defaultValues: AlunosModel.createAluno(),
  });

  const formAlunosUpdate = useForm({
    defaultValues: AlunosModel.createAluno(),
  });

  const closeCreateModal = () => setShowCreate(false);
  const showCreateModal = () => {
    setShowCreate(true);
  };

  const closeDeleteModal = () => setShowDelete(false);
  const showDeleteModal = (id) => {
    setID(id);
    setShowDelete(true);
  };

  const closeUpdateModal = () => setShowUpdate(false);
  const showUpdateModal = (id) => {
    getAlunoByID(id);
    setID(id);
    setShowUpdate(true);
  };

  const closeInfoModal = () => setShowInfo(false);

  const showInfoModal = (id) => {
    getAlunoByID(id);
    setShowInfo(true);
  };

  useEffect(() => {
    getAllAlunos();
    setSearch();
  }, []);

  function setSearch(value) {
    if ((value === "") | (value === undefined)) {
      getAllAlunos();
    } else {
      searchAluno(value);
    }
  }

  function searchAluno(value) {
    AlunosService.searchAluno(value)
      .then((response) => {
        setAlunos(response.data.data);
        console.log(value);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function saveAluno() {
    const form = { ...formAlunos.getValues() };
    AlunosService.postAluno(form)
      .then(() => {
        ToastSuccess("O aluno foi registrado com sucesso!");
        formAlunos.reset(AlunosModel.createAluno());
        closeCreateModal();
        getAllAlunos();
      })
      .catch(() => {
        ToastError("Algo deu errado, verifique os campos e tente novamente!");
      });
  }

  function getAlunoByID(id) {
    AlunosService.getByID(id)
      .then((response) => {
        setAlunoByID([response.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getAllAlunos() {
    AlunosService.getAll()
      .then((response) => {
        setAlunos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        ToastError(
          "A conexão não foi estabelecida com o servidor, verifique com o administrador!"
        );
      });
  }

  function updateAluno() {
    const updateTurma = { ...formAlunosUpdate.getValues() };
    AlunosService.updateAluno(ID, updateTurma)
      .then(() => {
        ToastSuccess("O aluno foi editado com sucesso!");
        formAlunosUpdate.reset(AlunosModel.createAluno());
        closeUpdateModal();
        getAllAlunos();
      })
      .catch((error) => {
        ToastError("Algo deu errado, verifique com o administrador.");
        console.log(
          "Hmmm, something went wrong, check the console with the error: " +
            error
        );
      });
  }

  function deleteAluno() {
    AlunosService.deleteAluno(ID)
      .then(() => {
        ToastSuccess("O aluno foi excluído com sucesso!");
        closeDeleteModal();
        getAllAlunos();
      })
      .catch((error) => {
        console.log(
          "Hmmm, something went wrong, check the console with the error: " +
            error
        );
        ToastError("Algo deu errado, verifique com o administrador.");
      });
  }

  return (
    <Container>
      <Row>
        <Col md>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar"
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Data de nascimento</th>
              <th>Gênero</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map(function (item, index) {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.nome}</td>
                  <td>{item.telefone}</td>
                  <td>{item.email}</td>
                  <td>{item.dataDeNascimento}</td>
                  <td>{item.genero}</td>
                  <td className="text-center">
                    <ButtonGroup aria-label="Basic example">
                      <Button
                        variant="outline-primary"
                        onClick={() => showUpdateModal(item.id)}
                      >
                        <UpdateIcon />
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => showDeleteModal(item.id)}
                      >
                        <DeleteIcon />
                      </Button>
                      <Button
                        variant="outline-warning"
                        onClick={() => showInfoModal(item.id)}
                      >
                        <InfoIcon />
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
      {/* Register modal */}
      <Modal centered show={showCreate} onHide={closeCreateModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar aluno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Nome"
                  className="mb-3"
                >
                  <Form.Control
                    {...formAlunos.register("nome")}
                    required
                    type="text"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Telefone"
                  className="mb-3"
                >
                  <Form.Control
                    {...formAlunos.register("telefone")}
                    required
                    type="text"
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="E-mail"
                  className="mb-3"
                >
                  <Form.Control
                    {...formAlunos.register("email")}
                    required
                    type="text"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Data de Nascimento"
                  className="mb-3"
                >
                  <Form.Control
                    {...formAlunos.register("dataDeNascimento")}
                    required
                    type="date"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingSelect" label="Gênero">
                  <Form.Select required {...formAlunos.register("genero")}>
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={saveAluno}>
                Adicionar
              </Button>
              <Button variant="secondary" onClick={closeCreateModal}>
                Fechar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Update modal */}
      <Modal centered show={showUpdate} onHide={closeUpdateModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar aluno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alunoByID.map(function (item, index) {
            return (
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Nome"
                      className="mb-3"
                    >
                      <Form.Control
                        {...formAlunosUpdate.setValue("nome", item.nome)}
                        {...formAlunosUpdate.register("nome")}
                        required
                        type="text"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Telefone"
                      className="mb-3"
                    >
                      <Form.Control
                        {...formAlunosUpdate.setValue(
                          "telefone",
                          item.telefone
                        )}
                        {...formAlunosUpdate.register("telefone")}
                        required
                        type="text"
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="E-mail"
                      className="mb-3"
                    >
                      <Form.Control
                        {...formAlunosUpdate.setValue("email", item.email)}
                        {...formAlunosUpdate.register("email")}
                        required
                        type="text"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Data de Nascimento"
                      className="mb-3"
                    >
                      <Form.Control
                        {...formAlunosUpdate.setValue(
                          "dataDeNascimento",
                          item.dataDeNascimento
                        )}
                        {...formAlunosUpdate.register("dataDeNascimento")}
                        required
                        type="date"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel controlId="floatingSelect" label="Gênero">
                      <Form.Select
                        required
                        {...formAlunosUpdate.setValue("genero", item.genero)}
                        {...formAlunosUpdate.register("genero")}
                      >
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>
                <Modal.Footer>
                  <Button variant="primary" type="submit" onClick={updateAluno}>
                    Atualizar
                  </Button>
                  <Button variant="secondary" onClick={closeUpdateModal}>
                    Fechar
                  </Button>
                </Modal.Footer>
              </Form>
            );
          })}
        </Modal.Body>
      </Modal>
      {/* Delete modal */}
      <Modal centered show={showDelete} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar aluno</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você está deletando o aluno, tem certeza?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={deleteAluno}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Info modal */}
      <Modal centered show={showInfo} onHide={closeInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Informações do aluno:</Modal.Title>
        </Modal.Header>
        {alunoByID.map(function (item, index) {
          return (
            <Modal.Body key={index}>
              <p>Nome: {item.nome}</p>
              <p>Telefone: {item.telefone}</p>
              <p>E-mail: {item.email}</p>
              <p>Data de nascimento: {item.dataDeNascimento}</p>
              <p>Gênero: {item.genero}</p>
            </Modal.Body>
          );
        })}

        <Modal.Footer>
          <Button variant="secondary" onClick={closeInfoModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      <Button className="mt-2" variant="success" onClick={showCreateModal}>
        Registrar aluno
      </Button>
    </Container>
  );
}
