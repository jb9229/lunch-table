import * as React from 'react';

import AvatarEmployee from '../molecules/AvatarEmployee';
import Spinner from '../atoms/Spinner';
import TextInput from '../molecules/TextInput';
import styled from 'styled-components';
import { useHoemDetilContext } from '../../context/HomeDetailContext';

const Container = styled.div``;
const CommandWrap = styled.div`border-width: 1;`;
const EmployeeListWrap = styled.div`
    /* background-color: #333; */
    overflow: auto;
    white-space: nowrap;
`;
const SeperatorLine = styled.div`border-width: 1;`;
const RestaurantWrap = styled.div`border-width: 1;`;
const TableSettingWrap = styled.div`border-width: 1;`;
const EmployeeWrap = styled.span`
  padding: 10px 10px;
`;
const AddEmployeeBtn = styled.button``;
const AddEmployeeInput = styled(TextInput)``;
const TODOText = styled.p``;

interface Props {
}
const HomeLayout: React.FC<Props> = (props): React.ReactElement => {
  const { newEmployee, employeeList, addEmployee, arrangedEmployList, deleteEmployee, arrangeEmployee } = useHoemDetilContext();

  return (
    <Container>
      <CommandWrap>
        <TODOText>레스토랑 선택(테이블 수, 테이블당 최소인원), 자리에 앉기</TODOText>
        {/* <Wrap>
          <AddEmployeeInput onChange={(name) => newEmployee.name = name} />
          <AddEmployeeBtn onClick={addEmployee}>출근</AddEmployeeBtn>
        </Wrap> */}
        {/* <Wrap>
          <AddEmployeeBtn onClick={arrangeEmployee}>배치</AddEmployeeBtn>
          <TableCntInput onChange={(name) => newEmployee.name = name} />
          <MinArrangeCntInput onChange={(name) => newEmployee.name = name} />
        </Wrap> */}
        {/* <AddButton /> <DeleteButton />
        <SelectRestaurantBut /> <DivideEmployeeEachTableBut /> */}
      </CommandWrap>
      <EmployeeListWrap>
        {employeeList ? (employeeList.map((employee, index) => (
          <EmployeeWrap key={`key_${index}`}>
            <AvatarEmployee employee={employee} onClickDelete={(e) => deleteEmployee(e, employee.name)} />
          </EmployeeWrap>))
        ) : (<Spinner />)}
      </EmployeeListWrap>
      <SeperatorLine />
      <RestaurantWrap>
        {!!arrangedEmployList && arrangedEmployList.map((arrangedEmployeeList) =>
        (
          <TableSettingWrap>
            {arrangedEmployeeList.map((arEmployee) => <AvatarEmployee employee={arEmployee}/>)}
          </TableSettingWrap>
        ))}
      </RestaurantWrap>
    </Container>
  );
};

export default HomeLayout;
