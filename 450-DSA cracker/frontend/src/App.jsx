import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Appname from './components/appname';
import TopicGrid from './components/TopicCard/TopicCard'; 
import Topic from './components/Topic/Topic';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Navbar from './components/Navbar';

function Layout({ children }) {
  return (<>
  <Navbar/>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'transparent', 
    }}>
      
      <Appname />
      {children} 
    </div>
    </>);
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/topicgrid" element={<Layout><TopicGrid /></Layout>} />
        <Route path="/topic/:title" element={<Layout><Topic /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
