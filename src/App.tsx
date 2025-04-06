import styled from 'styled-components'
import Layout from './components/Layout/Layout'
import './App.css'
import { MediaProvider } from './context/MediaContext'

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #232323;
  color: #e6e6e6;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

function App() {
  return (
    <MediaProvider>
      <AppContainer>
        <Layout />
      </AppContainer>
    </MediaProvider>
  )
}

export default App
