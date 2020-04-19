import * as React from 'react';

import styled from 'styled-components';

const Container = styled.div``;

const HomeLayout: React.FC = () => {
  retrun (
    <Container>
      <EmployeeEditWrap>
        <AddButton /> <DeleteButton />
      </EmployeeEditWrap>
      <EmployeeListWrap>
        <EmployeeList />
      </EmployeeListWrap>
      <SeperatorLine />
      <RestaurantReservationWrap>
        <Wrap>
          <SelectRestaurantBut /> <DivideEmployeeEachTableBut />
        </Wrap>
        <TableSettingWrap>
          {tableList.map((table) => <Table personList={table.personList}/>)}
        </TableSettingWrap>
      </RestaurantReservationWrap>
    </Container>
  );
};

export default HomeLayout;
