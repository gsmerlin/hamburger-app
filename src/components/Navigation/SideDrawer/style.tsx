import styled from "styled-components";

export const DisplayMode = styled.div`
  @media (min-width: 500px) {
    display: none;
  }
`;

const DrawerDiv = styled.div`
  position: fixed;
  width: 280px;
  max-width: 70%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 200;
  background-color: white;
  box-sizing: border-box;
  padding: 32px 16px;
  transition: transform 0.3s ease-out;
`;

export const LogoDiv = styled.div`
  @media (min-width: 500px) {
    height: 11%;
    margin-bottom: 32px;
  }
`;
export default DrawerDiv;
