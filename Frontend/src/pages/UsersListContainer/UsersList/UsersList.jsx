import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import PaginationComponent from '../../../components/PaginationComponent/PaginationComponent';
import UsersListTable from '../../../components/UsersListTable/UsersListTable';
import { Grid, Paper, Table } from '@mui/material';
import { Box } from '@mui/system';
import SearchInput from '../../../components/SearchInput/SearchInput';

const UsersListWrapper = styled(Grid)({
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const UserListTableWrap = styled(Table)({
  minWidth: '300px',
});

const SearchWrapper = styled('div')({
  margin: '20px 0',
});

const UsersList = ({
  myUid,
  myFriends,
  users,
  usersListLength,
  setPage,
  setPerPage,
  page,
  perPage,
  lastPage,
  addToFriendsList,
  submitHandler,
  setSearchValue,
}) => {
  return (
    <UsersListWrapper container>
      <SearchWrapper>
        <SearchInput
          placeholder={'Поиск пользователя'}
          changeHandler={setSearchValue}
          onSubmit={submitHandler}
        />
      </SearchWrapper>
      <PaginationComponent
        length={usersListLength}
        lastPage={lastPage}
        changePageHandler={setPage}
        currentPage={page}
      />
      <Box component={Paper}>
        <UserListTableWrap>
          <UsersListTable
            myUid={myUid}
            myFriends={myFriends}
            users={users}
            isFriend={false}
            isFriendsOfFriends={true}
            addToFriendsList={addToFriendsList}
          />
        </UserListTableWrap>
      </Box>
    </UsersListWrapper>
  );
};

UsersList.propTypes = {
  myUid: PropTypes.string,
  myFriends: PropTypes.object,
  users: PropTypes.array,
  usersListLength: PropTypes.number,
  setPage: PropTypes.func,
  setPerPage: PropTypes.func,
  page: PropTypes.number,
  perPage: PropTypes.number,
  lastPage: PropTypes.number,
  addToFriendsList: PropTypes.func,
  submitHandler: PropTypes.func,
  setSearchValue: PropTypes.func,
};

export default UsersList;
