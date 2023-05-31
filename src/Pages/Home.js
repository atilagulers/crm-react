import React, {useEffect} from 'react';
import PageWrapper from '../Components/PageWrapper';
import Sidebar from '../Components/Sidebar';
import {Container, Col, Row} from 'react-bootstrap';

function Home() {
  return (
    <PageWrapper title="Home">
      <Row>
        <Col lg={2} md={4} sm={4} className="bg-light-dark">
          <Sidebar />
        </Col>
        <Col className="border">
          <h1>Home</h1>
        </Col>
      </Row>
    </PageWrapper>
  );
}

export default Home;
