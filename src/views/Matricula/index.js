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
import { TurmasService } from "../../services/TurmasService";
import { TurmasModel } from "../../models/TurmasModel";
import { ToastError, ToastSuccess } from "../../components/Toasts/Toasts";
import { EscolasService } from "../../services/EscolasService";
import { MatriculasModel } from "../../models/MatriculasModel";
import { MatriculasService } from "../../services/MatriculasService";
import { AlunosService } from "../../services/AlunosService";

export function MatriculasIndex() {
  const [ID, setID] = useState();
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [matriculaByID, setMatriculaByID] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [matriculas, setMatriculas] = useState([]);

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

  const formMatriculas = useForm({
    defaultValues: MatriculasModel.createMatricula(),
  });
  const formMatriculasUpdate = useForm({
    defaultValues: MatriculasModel.createMatricula(),
  });

  const closeCreateModal = () => setShowCreate(false);
  const showCreateModal = () => {
    getAllAlunos();
    getAllTurmas();
    setShowCreate(true);
  };

  const closeDeleteModal = () => setShowDelete(false);
  const showDeleteModal = (id) => {
    setID(id);
    setShowDelete(true);
  };

  const closeUpdateModal = () => setShowUpdate(false);
  const showUpdateModal = (id) => {
    getMatriculaByID(id);
    setID(id);
    setShowUpdate(true);
  };

  const closeInfoModal = () => setShowInfo(false);

  const showInfoModal = (id) => {
    getMatriculaByID(id);
    setShowInfo(true);
  };

  useEffect(() => {
    getAllTurmas();
    getAllMatriculas();
    setSearch();
  }, []);

  function setSearch(value) {
    if ((value === "") | (value === undefined)) {
      getAllMatriculas();
    } else {
      searchMatricula(value);
    }
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

  function getAllTurmas() {
    TurmasService.getAll()
      .then((response) => {
        setTurmas(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        ToastError(
          "A conexão não foi estabelecida com o servidor, verifique com o administrador!"
        );
      });
  }

  function saveMatricula() {
    const form = { ...formMatriculas.getValues() };
    MatriculasService.postMatricula(form)
      .then(() => {
        ToastSuccess("O(a) aluno(a) foi matriculado(a) com sucesso!");
        formMatriculas.reset(MatriculasModel.createMatricula());
        closeCreateModal();
        getAllMatriculas();
      })
      .catch(() => {
        ToastError(
          "Algo deu errado, verifique se o aluno já está registrado nessa turma!"
        );
      });
  }

  function getMatriculaByID(id) {
    MatriculasService.getByID(id)
      .then((response) => {
        setMatriculaByID([response.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getAllMatriculas() {
    MatriculasService.getAll()
      .then((response) => {
        setMatriculas(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        ToastError(
          "A conexão não foi estabelecida com o servidor, verifique com o administrador!"
        );
      });
  }

  function updateMatricula() {
    const updateMatricula = { ...formMatriculasUpdate.getValues() };
    MatriculasService.updateMatricula(ID, updateMatricula)
      .then(() => {
        ToastSuccess("A matrícula foi editada com sucesso!");
        formMatriculasUpdate.reset(MatriculasModel.createMatricula());
        closeUpdateModal();
        getAllMatriculas();
      })
      .catch((error) => {
        ToastError("Algo deu errado, verifique com o administrador.");
        console.log(
          "Hmmm, something went wrong, check the console with the error: " +
            error
        );
      });
  }

  function deleteMatricula() {
    MatriculasService.deleteMatricula(ID)
      .then(() => {
        ToastSuccess("A matrícula foi excluída com sucesso!");
        closeDeleteModal();
        getAllMatriculas();
      })
      .catch((error) => {
        console.log(
          "Hmmm, something went wrong, check the console with the error: " +
            error
        );
        ToastError("Algo deu errado, verifique com o administrador.");
      });
  }

  function searchMatricula(value) {
    MatriculasService.searchMatricula(value)
      .then((response) => {
        setMatriculas(response.data.data);
        console.log(value);
      })
      .catch((error) => {
        console.log(error);
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
                placeholder="Pesquisar pelo ID"
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID da matrícula</th>
              <th>ID do Aluno</th>
              <th>ID da Turma</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {matriculas.map(function (item, index) {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.id_aluno}</td>
                  <td>{item.id_turma}</td>
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
      {/* Create modal */}
      <Modal centered show={showCreate} onHide={closeCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar matrícula</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <FloatingLabel controlId="floatingSelect" label="Aluno">
                  <Form.Select
                    required
                    {...formMatriculas.register("id_aluno")}
                  >
                    {alunos.map((item, index) => (
                      <option key={index} value={item.id}>
                        ID: {item.id} | Nome: {item.nome}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col>
                <FloatingLabel controlId="floatingSelect" label="Turma">
                  <Form.Select
                    required
                    {...formMatriculas.register("id_turma")}
                  >
                    {turmas.map((item, index) => (
                      <option key={index} value={item.id}>
                        ID: {item.id} | Ano: {item.ano} | Série: {item.serie} |
                        Nível: {item.fundamental} | Turno: {item.turno}{" "}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={saveMatricula}>
                Registrar
              </Button>
              <Button variant="secondary" onClick={closeCreateModal}>
                Fechar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Update modal */}
      <Modal centered show={showUpdate} onHide={closeUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar matrícula</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {matriculaByID.map(function (item, index) {
            return (
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col>
                    <FloatingLabel controlId="floatingSelect" label="Aluno">
                      <Form.Select
                        required
                        {...formMatriculasUpdate.setValue(
                          "id_aluno",
                          item.id_aluno
                        )}
                        {...formMatriculasUpdate.register("id_aluno")}
                      >
                        {alunos.map((item, index) => (
                          <option key={index} value={item.id}>
                            ID: {item.id} | Nome: {item.nome}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FloatingLabel controlId="floatingSelect" label="Aluno">
                      <Form.Select
                        required
                        {...formMatriculasUpdate.setValue(
                          "id_turma",
                          item.id_turma
                        )}
                        {...formMatriculasUpdate.register("id_turma")}
                      >
                        {turmas.map((item, index) => (
                          <option key={index} value={item.id}>
                            ID: {item.id} | Ano: {item.ano} | Série:{" "}
                            {item.serie} | Nível: {item.fundamental} | Turno:{" "}
                            {item.turno}{" "}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={updateMatricula}
                  >
                    Registrar
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
          <Modal.Title>Deletar matrícula</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você está deletando a matrícula, tem certeza?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={deleteMatricula}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Info modal */}
      <Modal centered show={showInfo} onHide={closeInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Informações da matrícula:</Modal.Title>
        </Modal.Header>
        {matriculaByID.map(function (item, index) {
          let [aluno] = item.aluno;
          let [turma] = item.turma;
          return (
            <Modal.Body key={index}>
              <p>
                <strong>Informações da Matrícula:</strong>
              </p>
              <p>ID da matrícula: {item.id}</p>
              <p>ID da turma: {item.id_turma}</p>
              <p>ID do Aluno: {item.id_aluno}</p>
              <p>
                <strong>Informações do Aluno:</strong>
              </p>
              <p>Nome: {aluno.nome}</p>
              <p>Telefone: {aluno.telefone}</p>
              <p>Email: {aluno.email}</p>
              <p>
                <strong>Informações da Turma:</strong>
              </p>
              <p>Ano: {turma.ano}</p>
              <p>Nível de ensino: {turma.nivelDeEnsino}</p>
              <p>Série: {turma.serie}</p>
              <p>Turno: {turma.turno}</p>
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
        Registrar matrícula
      </Button>
    </Container>
  );
}
