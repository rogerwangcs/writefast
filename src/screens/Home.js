import React, { Component } from "react";
import styled from "styled-components";
import theme from "constants/theme";

import Options from "components/Home/Options";
import Begin from "components/Home/Begin";

const Home = props => (
  <div>
    <Options {...props} />
    <Begin />
  </div>
);
export default Home;
