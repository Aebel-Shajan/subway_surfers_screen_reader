import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SidePanel from './SidePanel/SidePanel'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ErrorBoundary } from "react-error-boundary";
import Fallback from '../../components/Fallback/Fallback';


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={Fallback}>
      <MantineProvider >
        <SidePanel />
      </MantineProvider>
    </ErrorBoundary>
  </StrictMode>,
)
