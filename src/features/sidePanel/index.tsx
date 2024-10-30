import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SidePanel from './SidePanel/SidePanel'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';


createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <MantineProvider >
        <SidePanel />
      </MantineProvider>
  </StrictMode>,
)
