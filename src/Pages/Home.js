import React, {useEffect} from 'react';
import PageWrapper from '../Components/PageWrapper';
import Sidebar from '../Components/Sidebar';
import {Container, Col, Row} from 'react-bootstrap';

function Home() {
  return (
    <PageWrapper title="Home">
      <Row>
        <Sidebar />

        <Col lg={10} md={8} sm={8} xs={8}>
          <h1>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus nemo
            quam, eos error consequuntur assumenda blanditiis ipsa ipsam. Quo
            laudantium fugiat excepturi soluta aliquid repudiandae! Ad ipsam
            minus eos ullam.
          </h1>
        </Col>
      </Row>
    </PageWrapper>
  );
}

export default Home;
