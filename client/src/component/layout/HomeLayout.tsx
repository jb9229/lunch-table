import * as React from 'react';

import AvatarEmployee from '../molecules/AvatarEmployee';
import Spinner from '../atoms/Spinner';
import TextInput from '../molecules/TextInput';
import styled from 'styled-components';
import { useHoemDetilContext } from '../../context/HomeDetailContext';

const Container = styled.div`
  /* display: flex; */

  /* align-self: center; */
  max-width: 1200px;
  padding: 20px;
`;
const CommandWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  border-width: 1;
`;
const CommandLeftWrap = styled.div`
  padding: 10px;
`;
const CommandRightWrap = styled.div`
  padding: 10px;
`;
const EmployeeListWrap = styled.div`
  display: flex;
  justify-content: center;
  overflow: auto;
  white-space: nowrap;
`;
const SeperatorLine = styled.div`
  width: 100%;
  border-top-style: solid;
  border-top-width: 1px;
`;
const RestaurantWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
const TableSettingWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 20px;
`;
const EmployeeWrap = styled.span`
  margin: 10px 10px;
`;
const AddEmployeeBtn = styled.button``;
const AddEmployeeInput = styled(TextInput)``;
const TableCntInput = styled(TextInput)``;
const MinArrangeCntInput = styled(TextInput)``;
const TableName = styled.span`
  border-style: solid;
  border-width: 1px;
  margin-bottom: 10px;
`;

interface Props {
}
const HomeLayout: React.FC<Props> = (props): React.ReactElement => {
  const { newEmployee, employeeList, addEmployee, arrangedEmployeeList, restaurantCondition,
    deleteEmployee, arrangeEmployee } = useHoemDetilContext();

  return (
    <Container>
      <CommandWrap>
        <CommandLeftWrap>
          <AddEmployeeInput
            placeholder="이름을 입력해 주세요"
            onChange={(name) => newEmployee.name = name} />
          <AddEmployeeBtn onClick={addEmployee}>출근</AddEmployeeBtn>
        </CommandLeftWrap>
        <CommandRightWrap>
          <TableCntInput
            placeholder="테이블 수를 입력해 주세요"
            onChange={(str) => restaurantCondition.tableCnt = Number.parseInt(str)} />
          <MinArrangeCntInput
            placeholder="최소인원을 입력해 주세요"
            onChange={(str) => restaurantCondition.minArrangeCntAtTable = Number.parseInt(str)} />
          <AddEmployeeBtn onClick={arrangeEmployee}>테이블 배치</AddEmployeeBtn>
        </CommandRightWrap>
      </CommandWrap>
      <EmployeeListWrap>
        {employeeList ? (employeeList.map((employee, index) => (
          <EmployeeWrap key={`key_${index}`}>
            <AvatarEmployee employee={employee} onClickDelete={(e) => employee.id ? deleteEmployee(e, employee.id) : null} />
          </EmployeeWrap>))
        ) : (<Spinner />)}
      </EmployeeListWrap>
      <SeperatorLine/>
      <RestaurantWrap>
        {!!arrangedEmployeeList && arrangedEmployeeList.map((employeeList, tableIndex) =>
        (
          <TableSettingWrap key={`key_${tableIndex}`}>
            <TableName>{`Table ${tableIndex + 1}`}</TableName>
            {!!employeeList && employeeList.map((arEmployee) => <AvatarEmployee key={`key_${arEmployee.id}`} employee={arEmployee}/>)}
          </TableSettingWrap>
        ))}
      </RestaurantWrap>
    </Container>
  );
};

export default HomeLayout;
