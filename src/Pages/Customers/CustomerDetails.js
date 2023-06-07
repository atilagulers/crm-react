import React, {useEffect} from 'react';
import PageWrapper from '../../Components/PageWrapper';
import {Row, Col, Container} from 'react-bootstrap';

function CustomerDetails() {
  return (
    <PageWrapper title={'Müşteri Detayları'}>
      <Container className="border p-0">
        <h1 className="bg-primary">User Detail</h1>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <img
              src="/images/logo.png"
              alt=""
              style={{width: '100%', height: '100%'}}
            />
          </Col>

          <Col xs={8} sm={8} md={8} lg={8} xl={8}>
            <Row>
              <Col>
                <h6>Adı</h6>
              </Col>
              <Col>
                <p>Atila</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6>Soyadı</h6>
              </Col>
              <Col>
                <p>Atila</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6>Telefon</h6>
              </Col>
              <Col>
                <p>Atila</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6>Email</h6>
              </Col>
              <Col>
                <p>Atila</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6>Otel</h6>
              </Col>
              <Col>
                <p>Atila</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h6>Grup</h6>
              </Col>
              <Col>
                <p>Atila</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>Col 1</Col>
          <Col>Col 2</Col>
        </Row>
      </Container>
    </PageWrapper>
  );
}

export default CustomerDetails;
