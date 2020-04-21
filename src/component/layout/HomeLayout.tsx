import * as React from 'react';

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

const TODOText = styled.p``;

interface Props {
}
const HomeLayout: React.FC<Props> = (props): React.ReactElement => {
  const { employeeList } = useHoemDetilContext();
console.log('>>> employeeList: ', employeeList)
  return (
    <Container>
      <CommandWrap>
        <TODOText>사원명 입력필드, 출근버튼</TODOText>
        <TODOText>레스토랑 선택(테이블 수, 테이블당 최소인원), 자리에 앉기</TODOText>
        <TODOText>리셋, 리프레쉬, 등..</TODOText>
        {/* <AddButton /> <DeleteButton />
        <SelectRestaurantBut /> <DivideEmployeeEachTableBut /> */}
      </CommandWrap>
      <EmployeeListWrap>
        {employeeList.map((employee) => <TODOText>{employee.name}</TODOText>)}
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
