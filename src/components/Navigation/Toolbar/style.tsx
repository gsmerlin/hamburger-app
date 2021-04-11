import styled from "styled-components";

const Header = styled.header`
  height: 56px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #703b09;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 90;
`;

export const DisplayMode = styled.div`
  @media (min-width: 500px) {
    display: none;
  }
`;

export const Nav = styled.nav`
  height: 100%;
  @media (max-width: 499px) {
    display: none;
  }
`;

export const LogoDiv = styled.div`
  height: 80%;
`;

export default Header;
