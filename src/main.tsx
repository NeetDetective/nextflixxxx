import { createRoot } from "react-dom/client";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { theme } from "./theme.ts";
import { RouterProvider } from "react-router-dom";
import router from "./Router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const GlobalStyle = createGlobalStyle`
  ${reset}
  a {
    text-decoration: none;
    color: inherit;
  }
  body {
    font-family: "DNFForgedBlade", sans-serif;
    font-weight: 300;
    line-height: 1.2;
    color: ${(props) => props.theme.white.darker};
    background-color: black;
    &::-webkit-scrollbar{
      background-color:transparent;
      width:10px;
      display: none;
    }
    &::-webkit-scrollbar-thumb{
      height: 10%;
      background-color:#babac0;
      border-radius:16px;
    }
    &::-webkit-scrollbar-track{
      background-color:#0F0F0F;
    }
  }
  * {
    box-sizing: border-box;
  }
`;

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <div>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </div>
);
