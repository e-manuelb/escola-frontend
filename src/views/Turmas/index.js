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

export function TurmasIndex() {
  const [ID, setID] = useState();
  const [turmas, setTurmas] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [turmaByID, setTurmaByID] = useState([]);
  const [escolas, setEscolas] = useState([]);

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

  const formTurmas = useForm({
    defaultValues: TurmasModel.createTurma(),
  });
  const formTurmasUpdate = useForm({
    defaultValues: TurmasModel.createTurma(),
  });

  const closeCreateModal = () => setShowCreate(false);
  const showCreateModal = () => {
    getAllEscolas();
    setShowCreate(true);
  };

  const closeDeleteModal = () => setShowDelete(false);
  const showDeleteModal = (id) => {
    setID(id);
    setShowDelete(true);
  };

  const closeUpdateModal = () => setShowUpdate(false);
  const showUpdateModal = (id) => {
    getTurmaByID(id);
    setID(id);
    setShowUpdate(true);
    getAllEscolas();
  };

  const closeInfoModal = () => setShowInfo(false);

  const showInfoModal = (id) => {
    getTurmaByID(id);
    setShowInfo(true);
  };

  useEffect(() => {
    getAllTurmas();
    setSearch();
  }, []);

  function setSearch(value) {
    if ((value === "") | (value === undefined)) {
      getAllTurmas();
    } else {
      searchTurma(value);
    }
  }

  function getAllEscolas() {
    EscolasService.getAll()
      .then((response) => {
        setEscolas(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        ToastError(
          "A conexão não foi estabelecida com o servidor, verifique com o administrador!"
        );
      });
  }

  function searchTurma(value) {
    TurmasService.searchTurma(value)
      .then((response) => {
        setTurmas(response.data.data);
        console.log(value);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function saveTurma() {
    const form = { ...formTurmas.getValues() };
    TurmasService.postTurma(form)
      .then(() => {
        ToastSuccess("A turma foi criada com sucesso!");
        formTurmas.reset(TurmasModel.createTurma());
        closeCreateModal();
        getAllTurmas();
      })
      .catch(() => {
        ToastError("Algo deu errado, verifique os campos e tente novamente!");
      });
  }

  function getTurmaByID(id) {
    TurmasService.getByID(id)
      .then((response) => {
        setTurmaByID([response.data.data]);
      })
      .catch((error) => {
        console.log(error);
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

  function updateTurma() {
    const updateTurma = { ...formTurmasUpdate.getValues() };
    TurmasService.updateTurma(ID, updateTurma)
      .then(() => {
        ToastSuccess("A turma foi editada com sucesso!");
        formTurmasUpdate.reset(TurmasModel.createTurma());
        closeUpdateModal();
        getAllTurmas();
      })
      .catch((error) => {
        ToastError("Algo deu errado, verifique com o administrador.");
        console.log(
          "Hmmm, something went wrong, check the console with the error: " +
            error
        );
      });
  }

  function deleteTurma() {
    TurmasService.deleteTurma(ID)
      .then(() => {
        ToastSuccess("A turma foi excluída com sucesso!");
        closeDeleteModal();
        getAllTurmas();
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
                placeholder="Pesquisar pelo nível de ensino"
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
              <th>Ano</th>
              <th>Nível de ensino</th>
              <th>Série</th>
              <th>Turno</th>
              <th>ID da escola</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {turmas.map(function (item, index) {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.ano}</td>
                  <td>{item.nivelDeEnsino}</td>
                  <td>{item.serie}</td>
                  <td>{item.turno}</td>
                  <td>{item.id_escola}</td>
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
      <Modal centered show={showCreate} onHide={closeCreateModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Criar turma</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <FloatingLabel controlId="floatingSelect" label="Ano">
                  <Form.Select required {...formTurmas.register("ano")}>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Nível de ensino"
                  className="mb-3"
                >
                  <Form.Control
                    {...formTurmas.register("nivelDeEnsino")}
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
                  label="Série"
                  className="mb-3"
                >
                  <Form.Control
                    {...formTurmas.register("serie")}
                    required
                    type="text"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Turno"
                  className="mb-3"
                >
                  <Form.Control
                    {...formTurmas.register("turno")}
                    required
                    type="text"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingSelect" label="Escola">
                  <Form.Select required {...formTurmas.register("id_escola")}>
                    {escolas.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.nomeEscola}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={saveTurma}>
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
          <Modal.Title>Editar turma</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {turmaByID.map(function (item, index) {
            return (
              <Form key={index}>
                <Row>
                  <Col>
                    <FloatingLabel controlId="floatingSelect" label="Ano">
                      <Form.Select
                        required
                        {...formTurmasUpdate.setValue("ano", item.ano)}
                        {...formTurmasUpdate.register("ano")}
                      >
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Nível de ensino"
                      className="mb-3"
                    >
                      <Form.Control
                        {...formTurmasUpdate.setValue(
                          "nivelDeEnsino",
                          item.nivelDeEnsino
                        )}
                        {...formTurmasUpdate.register("nivelDeEnsino")}
                        type="text"
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Série"
                      className="mb-3"
                    >
                      <Form.Control
                        {...formTurmasUpdate.setValue("serie", item.serie)}
                        {...formTurmasUpdate.register("serie")}
                        type="text"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Turno"
                      className="mb-3"
                    >
                      <Form.Control
                        {...formTurmasUpdate.setValue("turno", item.turno)}
                        {...formTurmasUpdate.register("turno")}
                        type="text"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel controlId="floatingSelect" label="Escola">
                      <Form.Select
                        required
                        {...formTurmasUpdate.setValue(
                          "id_escola",
                          item.id_escola
                        )}
                        {...formTurmasUpdate.register("id_escola")}
                      >
                        {escolas.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.nomeEscola}
                          </option>
                        ))}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>
              </Form>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={updateTurma}>
            Atualizar
          </Button>
          <Button variant="secondary" onClick={closeUpdateModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete modal */}
      <Modal centered show={showDelete} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar turma</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você está deletando a turma, tem certeza?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={deleteTurma}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Info modal */}
      <Modal centered show={showInfo} onHide={closeInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Informações da turma:</Modal.Title>
        </Modal.Header>
        {turmaByID.map(function (item, index) {
          return (
            <Modal.Body key={index}>
              <p>ID da turma: {item.id}</p>
              <p>Ano: {item.ano}</p>
              <p>Nível de ensino: {item.nivelDeEnsino}</p>
              <p>Série: {item.serie}</p>
              <p>Turno: {item.turno}</p>
              <p>ID da Escola: {item.id_escola}</p>
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
        Adicionar turma
      </Button>
    </Container>
  );
}
