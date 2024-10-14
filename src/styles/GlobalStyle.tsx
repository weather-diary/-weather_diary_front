import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
  }

  #root {
    width: 100%;
    min-width: 360px;
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 5px;
  }

  /* 모바일 뷰 (360px - 767px) */
  @media (min-width: 360px) and (max-width: 767px) {
    #root {
      max-width: 100%;
      padding: 0 10px;
    }
  }

  /* 태블릿 뷰 (768px - 1024px) */
  @media (min-width: 768px) and (max-width: 1024px) {
    #root {
      padding: 0 10px;
    }
  }

  /* 1024px 이상의 화면에서도 최대 너비 1024px 유지 */
  @media (min-width: 1025px) {
    #root {
      max-width: 1024px;
      padding: 0 15px;
    }
  }
`;

export default GlobalStyle;
