import * as React from 'react';

import AvatarEmployee from '../molecules/AvatarEmployee';
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
  const { newEmployee, employeeList, addEmployee, deleteEmployee } = useHoemDetilContext();

  return (
    <Container>
      <CommandWrap>
        <TODOText>레스토랑 선택(테이블 수, 테이블당 최소인원), 자리에 앉기</TODOText>
        <AddEmployeeInput onChange={(name) => newEmployee.name = name} />
        <AddEmployeeBtn onClick={addEmployee}>출근</AddEmployeeBtn>
        {/* <AddButton /> <DeleteButton />
        <SelectRestaurantBut /> <DivideEmployeeEachTableBut /> */}
      </CommandWrap>
      <EmployeeListWrap>
        {employeeList.map((employee, index) => (
          <EmployeeWrap key={`key_${index}`}>
            <AvatarEmployee employee={employee} onClickDelete={(e) => deleteEmployee(e, employee.name)} />
          </EmployeeWrap>))
        }
      </EmployeeListWrap>
      <SeperatorLine />
      <RestaurantWrap>
        <TableSettingWrap>
          <TODOText>TableSettingWrap</TODOText>
          {/* {tableList.map((table) => <Table personList={table.personList}/>)} */}
        </TableSettingWrap>
      </RestaurantWrap>
    </Container>
  );
};

export default HomeLayout;
