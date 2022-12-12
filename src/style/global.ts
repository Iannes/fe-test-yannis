import { createGlobalStyle } from "@xstyled/styled-components";

export const GlobalAppStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
    scroll-behavior: smooth;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }
  
  ol, ul {
    list-style: none;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }

  body {
    background-color: background-01;
  }

  .protected-layout {
    overflow: auto;
    min-height: 100vh;
    padding: 100px 0;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
