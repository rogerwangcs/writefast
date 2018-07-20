import React, { Component } from "react";
import styled from "styled-components";
import theme from "constants/theme";

import Options from "components/Home/Options";
import Begin from "components/Home/Begin";
import RoundButton from "components/generic/RoundButton";

const Home = props => (
  <div>
    {/* <Options /> */}
    <Begin>
      <RoundButton color={theme.colors.secondary4}>
        <h1>Begin</h1>
      </RoundButton>
    </Begin>
  </div>
);

export default Home;
