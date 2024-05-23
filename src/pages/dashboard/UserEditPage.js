import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _userList } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUser, updateUser } from '../../redux/slices/user';



// ----------------------------------------------------------------------

export default function UserEditPage() {

  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.user);

  const [currentUser, setCurrentUser] = useState(user);

  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  // const currentUser = _userList.find((user) => paramCase(user.name) === name);

  
  useEffect(() => {
    dispatch(getUser(name));
  }, [dispatch,name]);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  

  return (
    <>
      <Helmet>
        <title> User: Edit user | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit user"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'User',
              href: PATH_DASHBOARD.user.list,
            },
            { name: `${currentUser?.first_name} ${currentUser?.first_surname}`},
          ]}
        />

        <UserNewEditForm isEdit currentUser={currentUser}  updateUser={updateUser} dispatch={dispatch}/>
      </Container>
    </>
  );
}
