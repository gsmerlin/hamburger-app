import styled from "styled-components";

const NavItem = styled.li`
  margin: 10px 0;
  box-sizing: border-box;
  display: block;
  width: 100%;

  @media (min-width: 500px) {
    margin: 0;
    display: flex;
    height: 100%;
    width: auto;
    align-items: center;
  }
  a {
    color: #8f5c2c;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
    display: block;
  }
  a:hover,
  a:active,
  a.active {
    color: #404ac8;
  }

  @media (min-width: 500px) {
    a {
      color: white;
      height: 100%;
      padding: 16px 10px;
      border-bottom: 4px solid transparent;
    }
    a:hover,
    a:active,
    a.active {
      background-color: #8f5c2c;
      border-bottom: 4px solid #404ac8;
      color: white;
    }
  }
`;

export default NavItem;
