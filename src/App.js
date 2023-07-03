import {useEffect, useContext} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState} from 'react';
import {Col, Row} from 'react-bootstrap';
import './Css/Components/Sidebar.css';
import {AppContext} from './Contexts/AppContext';
import {ToastContainer, Slide} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

//Auth
import {ProtectedRoute} from './Auth/Auth';

function App() {
  const {state} = useContext(AppContext);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleClickSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem('token', state.token);
      localStorage.setItem('id', state.user._id);
      localStorage.setItem('firstName', state.user.firstName);
      localStorage.setItem('lastName', state.user.lastName);
      localStorage.setItem('username', state.user.username);
      localStorage.setItem('role', state.user.role);
    } else {
      localStorage.removeItem('token', state.token);
      localStorage.removeItem('id', state.user._id);
      localStorage.removeItem('firstName');
      localStorage.removeItem('lastName');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
    }
  }, [state]);

  return (
    <div className="App">
      <BrowserRouter>
        <Row>
          <ProtectedRoute>
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
          </ProtectedRoute>

          <Col>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/management/*"
                element={
                  <ProtectedRoute>
                    <Management />
                  </ProtectedRoute>
                }
              />

              <Route path="/customers/*" element={<Customers />} />
              <Route path="/call-lists/*" element={<CallLists />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/login" element={<LogIn />} />
            </Routes>
          </Col>
        </Row>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        autoClose={1500}
        transition={Slide}
      />
    </div>
  );
}

export default App;
