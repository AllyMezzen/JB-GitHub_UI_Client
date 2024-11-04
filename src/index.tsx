import "./common/styles/global.css";
import { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import { Home } from "./Home";

const htmlRoot =  document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(htmlRoot);

root.render(
  <StrictMode>
    <Home />
  </StrictMode>
);