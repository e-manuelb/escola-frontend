import React from "react";
import { Container, Row, Col, Card, Button, Accordion } from "react-bootstrap";
import noticia1 from "../../assets/noticia1.jpeg";
import noticia2 from "../../assets/noticia2.jpg";

export function HomeIndex() {
  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ width: "800px" }}>
            <Card.Img src={noticia1} />
            <Card.Body>
              <Card.Title>INSCRIÇÕES ABERTAS</Card.Title>
              <Card.Text>
                Seduc lança especialização em Pensamento Computacional para
                professores da rede estadual
              </Card.Text>
              <Button
                variant="primary"
                href="https://www.seduc.ce.gov.br/2021/10/15/seduc-lanca-especializacao-em-pensamento-computacional-para-professores-da-rede-estadual/"
              >
                Ir para a notícia
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Row className="mb-2">
            <Card style={{ width: "400px" }}>
              <Card.Img variant="top" src={noticia2} />
              <Card.Body>
                <Card.Title>NOTÍCIA</Card.Title>
                <Card.Text>
                  Solenidade na AL destaca relevância de professores para a
                  sociedade
                </Card.Text>
                <Button
                  variant="primary"
                  href="https://www.seduc.ce.gov.br/2021/10/26/solenidade-na-al-destaca-relevancia-de-professores-para-a-sociedade/"
                >
                  Ir para a notícia
                </Button>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card style={{ width: "400px" }}>
              <Card.Body>
                <Card.Title>CREDE</Card.Title>
                <Card.Text>
                  Crede 7 divulga retificação da chamada para coordenador
                </Card.Text>
                <Button
                  variant="primary"
                  href="https://www.seduc.ce.gov.br/2021/10/26/crede-7-divulga-escolha-de-coordenador-da-escola-do-campo-filha-da-luta-patativa-do-assare/"
                >
                  Ir para a notícia
                </Button>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
      <Row className="mt-5">
        <h6>Fonte: Secretaria da Educação do Ceará | SEDUC/CE</h6>
      </Row>
      <Row className="mt-2">
        <Card>
          <Card.Body>
            <Card.Title>
              Horizonte ganha novo Centro de Educação Infantil
            </Card.Title>
            <Card.Text>
              As famílias de Horizonte, município da Região Metropolitana de
              Fortaleza, receberam, nesta sexta-feira (22), mais um Centro de
              Educação Infantil (CEI). A entrega foi conduzida pela
              primeira-dama do Ceará, Onélia Santana, com a presença do prefeito
              de Horizonte, Nezinho Farias, e da secretária-executiva de Gestão
              da Rede Escolar da Secretaria da Educação, Oderlânia Leite, e
              demais autoridades.
              <br />
              <br />
              O CEI integra o pilar Tempo de Aprender do Programa Mais Infância
              Ceará, política pública estadual idealizada pela primeira-dama.
              Nesse sentido, o equipamento oferece oportunidades de aprendizagem
              e desenvolvimento integral para as crianças em um ambiente
              adequado. Ao todo, o Governo do Ceará, por meio do Mais Infância,
              já entregou 67 Centros à população cearense.
              <br />
              <br />
              “Recentemente, o governador esteve aqui inaugurando uma escola
              grande para adolescentes. Tudo isso são conquistas, talvez, a
              maior conquista desse município. Porque eu sempre coloco que a
              maior riqueza de uma nação, estado e município são as pessoas. Se
              nós temos crianças bem educadas e adolescentes na escola em tempo
              integral e capacitação, o município só tem a crescer. Então é
              trabalhar o presente e futuro dos nossos municípios. Muito
              obrigada Nezinho pela parceria e entendimento que a educação é
              transformadora”, afirmou Onélia Santana, destacando o desempenho
              do Ceará no recente levantamento do Índice de Oportunidades da
              Educação Brasileira (Ioeb), em que o Estado é o segundo principal
              do Brasil e possui 18 das 20 escolas com maiores notas.
              <br />
              <br />
              O CEI Maria do Carmo de Oliveira fica localizado no Centro da
              cidade e tem capacidade para atender 208 crianças de 0 a 5 anos de
              idade. Com esta, já são três unidades implantadas pela atual
              gestão estadual no município de Horizonte, em parceria com a
              gestão municipal. Os outros dois CEIs de Horizonte estão situados
              nas comunidades de Malcozinhado e Canavieiras dos Pinheiros.
              <br />
              <br />
              O espaço é sinônimo de tranquilidade para as mães como a
              cozinheira Amanda dos Santos, 36, que reside no bairro Centro.
              “Agora ficou muito bom e mais fácil. Eu tenho outro filho mais
              novo que fica com a minha mãe, e o Caio vem para cá, um lugar onde
              ele aprende e é seguro para ele”, comemorou.
              <br />
              <br />
              O equipamento dispõe de quatro salas de aula, laboratório de
              informática, refeitório, cozinha, berçário, fraldário, dormitório,
              copa, recepção e playground. As crianças também recebem refeições
              diárias e todo o material: fardamento escolar, mochila, kit
              pedagógico e material de higiene para uso no Centro. A educação
              ambiental também é estimulada no CEI.
              <br />
              <br />
              “A educação não anda só com o cognitivo, conta principalmente com
              o emocional, o acolhimento e a socialização de crianças com outras
              crianças. Através do brincar a gente compreender muito isso e
              desenvolver cada vez mais as crianças cearenses”, complementou
              Onélia.
              <br />
              <br />
              Para construir, mobiliar e equipar o espaço, foram investidos R$
              1.739.395,65 do Governo do Ceará, além de contrapartida do
              município. No total, Horizonte conta 10 Centros, algumas unidades
              foram entregues em gestões anteriores. “Está é a décima. Agora,
              nas últimas reuniões com o governador Camilo Santana, ele fez uma
              parceria meio a meio, e nós vamos concluir mais duas, ficaremos
              com 12 iguais a essa: uma no bairro do Pica-Pau e outra no
              Mangueiral”, anunciou Nezinho Farias, que fez questão de enaltecer
              os investimentos do Governo do Ceará em todas as áreas no
              município.
            </Card.Text>
            <Button
              variant="primary"
              href="https://www.seduc.ce.gov.br/2021/10/22/horizonte-ganha-novo-centro-de-educacao-infantil/"
            >
              Ir para a notícia
            </Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}
