import React from "react";
import {
  Page,
  Navbar,
  NavTitle,
  NavTitleLarge,
  Link,
  Toolbar,
  Block,
} from "framework7-react";
import { Button } from "../components/button";

const HomePage = () => (
  <Page name="home">
    {/* Top Navbar */}
    <Navbar large>
      <NavTitle>caculator</NavTitle>
      <NavTitleLarge>caculator</NavTitleLarge>
    </Navbar>
    <Button value="x"></Button>
  </Page>
);
export default HomePage;
