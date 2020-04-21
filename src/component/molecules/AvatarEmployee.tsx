import * as React from 'react';

import { Employee } from '../../container/home/types';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background-color: blue;
  height: 100px;
`;
const Name = styled.span``;
const Image = styled.img``;
const DeleteImgWrap = styled.div`
  width: 100%;
  height: 500;
  display: block;
  position: relative;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: red;
`;
const DeleteImg = styled.img`
  width: 20px;
`;

interface Props {
  employee: Employee;
}
const AvatarEmployee: React.FC<Props> = (props) => {
  return (
    <Container>
      <Image src={`${process.env.PUBLIC_URL}/assets/icons/person/Person-64.png`}/>
      <Name>{props.employee.name}</Name>
      <DeleteImgWrap>
        <DeleteImg src={`${process.env.PUBLIC_URL}/assets/icons/delete/Delete-256.png`}/>
      </DeleteImgWrap>
    </Container>
  );
};

export default AvatarEmployee;
