import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    #root {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
    }

    body {
        display: flex;
        place-items: center;
        min-width: 320px;
        min-height: 100vh;
        background-color: #ffffff;
    }

    *:focus {
        outline: 2px solid #0f2594;
    }
`;
