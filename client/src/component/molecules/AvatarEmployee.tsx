import * as React from 'react';

import { Employee } from '../../container/home/types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 100px;
  position: relative;
`;
const Name = styled.div`
  width:100px;
  display: block;
  text-decoration: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
const Image = styled.img``;
const DeleteImgWrap = styled.div`
  position: absolute;
  z-index: 999;
  top: 1px;
  right: 1px;
  cursor: pointer;
`;
const DeleteImg = styled.img`
  width: 20px;
`;

interface Props {
  employee: Employee;
  onClickDelete?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
const AvatarEmployee: React.FC<Props> = (props) => {
  return (
    <Container>
      {!!props.onClickDelete &&
        <DeleteImgWrap onClick={props.onClickDelete}>
          <DeleteImg src={`${process.env.PUBLIC_URL}/assets/icons/delete/Delete-256.png`}/>
        </DeleteImgWrap>
      }
      <Image src={`${process.env.PUBLIC_URL}/assets/icons/person/Person-64.png`}/>
      <Name>{props.employee.name}</Name>
    </Container>
  );
};

export default AvatarEmployee;
