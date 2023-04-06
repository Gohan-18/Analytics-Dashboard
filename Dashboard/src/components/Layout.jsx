import React from "react";
import Header from "./Header";
import Settings from "./Settings";
import DataTable from "./DataTable";
import { Container, ThemeProvider, createTheme } from "@mui/material";

const Layout = () => {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Header />
          <Settings />
          <DataTable />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Layout;
