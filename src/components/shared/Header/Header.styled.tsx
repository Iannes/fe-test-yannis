import styled from "styled-components";

export const StyledHeader = styled.header`
   {
    min-width: 100%;
    position: fixed;
    top: 20px;
    padding: 0 20px;
    @media only screen and (max-width: 680px) {
      padding: 0;
    }
  }
`;

export const StyledUserName = styled.span`
   {
    text-transform: capitalize;
    font-weight: bold;
  }
`;
