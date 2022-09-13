import styled from 'styled-components';

const Wrap = (props) => {
  return (
      <Container>
        {props.children}
      </Container>
    );
};

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  overflow: scroll;
  margin: auto;
  padding: 0;
  position: relative;
  border: 1px solid #eee;
`;

export default Wrap;
