import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Tab, Card, Tabs, Container, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// _mock_
import {
  _userAbout,
  _userFeeds,
  _userFriends,
  _userGallery,
  _userFollowers,
} from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers,
  ProfileToolbar
} from '../../sections/@dashboard/teacher/profile';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getTeacher } from '../../redux/slices/teacher';
// ----------------------------------------------------------------------

export default function TeacherProfilePage() {
  const { name } = useParams();
  const dispatch = useDispatch();

  const { teacher, isLoading } = useSelector((state) => state.teacher);


  const { themeStretch } = useSettingsContext();
  // const { teacher} = useAuthContext();

  const [searchFriends, setSearchFriends] = useState('');

  const [currentTab, setCurrentTab] = useState('profile');

  const TABS = [
    {
      value: 'profile',
      label: 'Perfil',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <Profile info={_userAbout} posts={_userFeeds} teacher={teacher} />,
    },
    {
      value: 'friends',
      label: 'Asignaturas',
      icon: <Iconify icon="ic:outline-menu-book" />,
      component: (
        <ProfileFriends
          friends={_userFriends}
          searchFriends={searchFriends}
          onSearchFriends={(event) => setSearchFriends(event.target.value)}
        />
      ),
    },
    // {
    //   value: 'followers',
    //   label: 'Record Academico',
    //   icon: <Iconify icon="ic:outline-menu-book" />,
    //   component: <ProfileFollowers followers={_userFollowers} />,
    // },
    
    // {
    //   value: 'gallery',
    //   label: 'Facturas',
    //   icon: <Iconify icon="ic:outline-request-quote" />,
    //   component: <ProfileGallery gallery={_userGallery} />,
    // },
  ];

  useEffect(() => {
    dispatch(getTeacher(name));
  }, [dispatch,name]);

  return (
    <>
      <Helmet>
        <title> Profesor: Perfil | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Profesor', href: PATH_DASHBOARD.teacher.list },
            { name: `${teacher?.User?.first_name} ${teacher?.User?.first_surname}` },
          ]}
        />
        <ProfileToolbar teacher={teacher} />

        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >


          <ProfileCover
            name={`${teacher?.User?.first_name || ''} ${teacher?.User?.first_surname || ''}`}
            role={
              !teacher?.User?.UserRole || teacher.User.UserRole.length === 0
                ? 'Sin rol asignado'
                : teacher.User.UserRole.map(element => element.Role.description).join(', ')
            }
            cover={_userAbout.cover}
          />

          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
              bgcolor: 'background.paper',
              '& .MuiTabs-flexContainer': {
                pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-end',
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
            ))}
          </Tabs>
        </Card>

        {TABS.map(
          (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>
        )}
      </Container>
    </>
  );
}
