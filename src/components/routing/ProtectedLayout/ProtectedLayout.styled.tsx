import styled from "styled-components";

const CallsListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CallsListTitle = styled.h3`
  text-transform: capitalize;
  font-weight: bold;
  font-size: 1.4rem;
  line-height: 1.8rem;
`;

const HeaderContainer = styled.div`
  min-height: 100px;
  background-color: white;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 20;
`;

export { CallsListContainer, CallsListTitle, HeaderContainer };
