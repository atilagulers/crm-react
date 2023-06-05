import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState} from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import './Css/Components/Sidebar.css';
import {AppProvider} from './Contexts/AppContext';
// Components
import Sidebar from './Components/Sidebar';

// Pages

import Home from './Pages/Home';
import Customers from './Pages/Customers/Customers';
import CallLists from './Pages/CallLists/CallLists';
import Reservations from './Pages/Reservations';
import Credits from './Pages/Credits';
import LogIn from './Pages/LogIn';
import Management from './Pages/Management/Management';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleClickSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <AppProvider>
      <div className="App">
        <BrowserRouter>
          <Row>
            <Col
              lg={2}
              md={4}
              sm={4}
              className={`sidebar bg-light-dark ${
                isSidebarCollapsed ? 'sidebar-collapsed' : ''
              }`}
              style={{
                height: '100vh',
                width: `${isSidebarCollapsed ? '80px' : ''}`,
              }}
            >
              <Sidebar handleClickSidebarToggle={handleClickSidebarToggle} />
            </Col>

            <Col>
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/management/*" element={<Management />} />

                <Route path="/customers/*" element={<Customers />} />
                <Route path="/call-lists/*" element={<CallLists />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/credits" element={<Credits />} />
                <Route path="/login" element={<LogIn />} />
              </Routes>
            </Col>
          </Row>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;
