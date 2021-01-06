import React from 'react';
import styled from 'styled-components';

const NewsBadge = ({ count }) => (
  <BadgeView>
    <BadgeText>
      {count}
    </BadgeText>
  </BadgeView>
);

const BadgeView = styled.View`
    width:25px;
    height:25px;
    background-color:#fe0000;
    justify-content:center;
    align-items:center;
    position:absolute;
    right:15px;
    top:-8px
    border-radius:${50}px;
    z-index:10;
`;
const BadgeText = styled.Text`
    color:#fff;
    text-align:center;
    line-height:25px
`;
export default NewsBadge;
