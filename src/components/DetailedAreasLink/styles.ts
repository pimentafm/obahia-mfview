import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin-top: 10px;

  border: 1px solid;
  border-radius: 2px;
  border-color: #d9d9d9;

  .layer-div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
