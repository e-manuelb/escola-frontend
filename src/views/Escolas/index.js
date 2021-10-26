import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { EscolasService } from "../../services/EscolasService";
import { TurmasService } from "../../services/TurmasService";
import { EscolasModel } from "../../models/EscolasModel";
import { ToastError, ToastSuccess } from "../../components/Toasts/Toasts";

export function EscolasIndex() {
  const [ID, setID] = useState();
  const [escolas, setEscolas] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [escolaByID, setEscolaByID] = useState([]);
  const [estados, setEstados] = useState([]);
  const [total, setTotal] = useState();

  function getMatriculados(id) {
    TurmasService.turmasByEscolas(id)
      .then((response) => {
        setTotal(response.data.data.matriculas.length);
      })
      .catch((error) => {
        ToastError("Não foi possível obter o número de alunos matriculados.");
      });
  }

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

  const formEscolas = useForm({
    defaultValues: EscolasModel.createEscola(),
  });

  const formEscolasUpdate = useForm({
    defaultValues: EscolasModel.createEscola(),
  });

  const closeCreateModal = () => setShowCreate(false);
  const showCreateModal = (id) => {
    setShowCreate(true);
    getEstados();
  };

  const closeDeleteModal = () => setShowDelete(false);
  const showDeleteModal = (id) => {
    setID(id);
    setShowDelete(true);
  };

  const closeUpdateModal = () => setShowUpdate(false);
  const showUpdateModal = (id) => {
    getEscolaByID(id);
    setID(id);
    setShowUpdate(true);
    getEstados();
  };

  const closeInfoModal = () => setShowInfo(false);

  const showInfoModal = (id) => {
    getEscolaByID(id);
    getMatriculados(id);
    setShowInfo(true);
  };

  useEffect(() => {
    getAllEscolas();
  }, []);

  function searchEscola(value) {
    EscolasService.searchEscola(value)
      .then((response) => {
        setEscolas(response.data.data);
        console.log(value);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function saveEscola() {
    const form = { ...formEscolas.getValues() };
    EscolasService.postEscola(form)
      .then(() => {
        ToastSuccess("A escola foi criada com sucesso!");
        formEscolas.reset(EscolasModel.createEscola());
        closeCreateModal();
        getAllEscolas();
      })
      .catch((error) => {
        ToastError("Algo deu errado, verifique os campos e tente novamente!");
      });
  }

  function getEstados() {
    axios
      .get(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      )
      .then((response) => {
        setEstados(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getEscolaByID(id) {
    EscolasService.getByID(id)
      .then((response) => {
        setEscolaByID([response.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
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

  function updateEscola() {
    const updateEscola = { ...formEscolasUpdate.getValues() };
    EscolasService.updateEscola(ID, updateEscola)
      .then(() => {
        ToastSuccess("A escola foi editada com sucesso!");
        formEscolasUpdate.reset(EscolasModel.createEscola());
        closeUpdateModal();
        getAllEscolas();
      })
      .catch((error) => {
        ToastError("Algo deu errado, verifique com o administrador.");
        console.log(
          "Hmmm, something went wrong, check the console with the error: " +
            error
        );
      });
  }

  function deleteEscola() {
    EscolasService.deleteEscola(ID)
      .then(() => {
        ToastSuccess("A escola foi excluída com sucesso!");
        closeDeleteModal();
        getAllEscolas();
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
                onChange={(e) => searchEscola(e.target.value)}
                placeholder="Pesquisar pelo nome da escola"
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
              <th>Escola</th>
              <th>Logradouro</th>
              <th>Número</th>
              <th>Cidade</th>
              <th>Estado</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {escolas.map(function (item, index) {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.nomeEscola}</td>
                  <td>{item.endereco.logradouro}</td>
                  <td>{item.endereco.numero}</td>
                  <td>{item.endereco.cidade}</td>
                  <td>{item.endereco.estado}</td>
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
          <Modal.Title>Criar escola</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Nome da escola"
                  className="mb-3"
                >
                  <Form.Control
                    {...formEscolas.register("nomeEscola")}
                    required
                    type="text"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Logradouro"
                  className="mb-3"
                >
                  <Form.Control
                    {...formEscolas.register("logradouro")}
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
                  label="Número"
                  className="mb-3"
                >
                  <Form.Control
                    {...formEscolas.register("numero")}
                    required
                    type="text"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Bairro"
                  className="mb-3"
                >
                  <Form.Control
                    {...formEscolas.register("bairro")}
                    required
                    type="text"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Cidade"
                  className="mb-3"
                >
                  <Form.Control
                    {...formEscolas.register("cidade")}
                    required
                    type="text"
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingSelect" label="Estado">
                  <Form.Select required {...formEscolas.register("estado")}>
                    {estados.map((item, index) => (
                      <option key={index} value={item.nome}>
                        {item.nome}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={saveEscola}>
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
          <Modal.Title>Editar escola</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {escolaByID.map(function (item, index) {
            let estadosIBGE = estados;
            return (
              <Form key={index}>
                <Row>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Nome da escola"
                      className="mb-3"
                    >
                      <Form.Control
                        {...formEscolasUpdate.setValue(
                          "nomeEscola",
                          item.nomeEscola
                        )}
                        {...formEscolasUpdate.register("nomeEscola")}
                        type="text"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Logradouro"
                      className="mb-3"
                    >
                      <Form.Control
                        {...formEscolasUpdate.setValue(
                          "logradouro",
                          item.endereco.logradouro
                        )}
                        {...formEscolasUpdate.register("logradouro")}
                        type="text"
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Número"
                      className="mb-3"
                    >
                      <Form.Control
                        {...formEscolasUpdate.setValue(
                          "numero",
                          item.endereco.numero
                        )}
                        {...formEscolasUpdate.register("numero")}
                        type="text"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Bairro"
                      className="mb-3"
                    >
                      <Form.Control
                        {...formEscolasUpdate.setValue(
                          "bairro",
                          item.endereco.bairro
                        )}
                        {...formEscolasUpdate.register("bairro")}
                        type="text"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Cidade"
                      className="mb-3"
                    >
                      <Form.Control
                        {...formEscolasUpdate.setValue(
                          "cidade",
                          item.endereco.cidade
                        )}
                        {...formEscolasUpdate.register("cidade")}
                        type="text"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel controlId="floatingSelect" label="Estado">
                      <Form.Select
                        {...formEscolasUpdate.register("estado")}
                        {...formEscolasUpdate.setValue(
                          "estado",
                          item.endereco.estado
                        )}
                      >
                        {estadosIBGE.map(function (item, index) {
                          return (
                            <option key={index} value={item.nome}>
                              {item.nome}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>
              </Form>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={updateEscola}>
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
          <Modal.Title>Deletar escola</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você está deletando a escola, tem certeza?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={deleteEscola}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Info modal */}
      <Modal centered show={showInfo} onHide={closeInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Informações da escola:</Modal.Title>
        </Modal.Header>
        {escolaByID.map(function (item, index) {
          return (
            <Modal.Body key={index}>
              <p>ID da Escola: {item.id}</p>
              <p>Nome da escola: {item.nomeEscola}</p>
              <p>Logradouro: {item.endereco.logradouro}</p>
              <p>Número: {item.endereco.numero}</p>
              <p>Cidade: {item.endereco.cidade}</p>
              <p>Estado: {item.endereco.estado}</p>
              <p>Total de alunos matriculados: {total}</p>
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
        Adicionar escola
      </Button>
    </Container>
  );
}
