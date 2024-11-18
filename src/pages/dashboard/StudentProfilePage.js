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
  ProfileToolbar,
  ProfileInscription,
  ProfileInvoice,
} from '../../sections/@dashboard/student/profile';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getStudent } from '../../redux/slices/student';
// ----------------------------------------------------------------------

export default function StudentProfilePage() {
  const { name } = useParams();
  const dispatch = useDispatch();

  const { student, isLoading } = useSelector((state) => state.student);


  const { themeStretch } = useSettingsContext();
  // const { student} = useAuthContext();

  const [searchFriends, setSearchFriends] = useState('');

  const [currentTab, setCurrentTab] = useState('profile');

  const TABS = [
    {
      value: 'profile',
      label: 'Perfil',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <Profile info={_userAbout} posts={_userFeeds} student={student} />,
    },
    {
      value: 'friends',
      label: 'Representantes',
      icon: <Iconify icon="ic:baseline-groups" />,
      component: (
        <ProfileFriends
          friends={_userFriends}
          searchFriends={searchFriends}
          onSearchFriends={(event) => setSearchFriends(event.target.value)}
        />
      ),
    },
    {
      value: 'inscription',
      label: 'Inscripciones',
      icon: <Iconify icon="ic:outline-dynamic-feed" />,
      component: (
        <ProfileInscription
          // friends={_userFriends}
          // searchFriends={searchFriends}
          // onSearchFriends={(event) => setSearchFriends(event.target.value)}
          currentStudentId={student?.id_student}
        />
      ),
    },
    {
      value: 'followers',
      label: 'Record Academico',
      icon: <Iconify icon="ic:outline-menu-book" />,
      component: <ProfileFollowers followers={_userFollowers} />,
    },
    
    {
      value: 'invoices',
      label: 'Facturas',
      icon: <Iconify icon="ic:outline-request-quote" />,
      component: <ProfileInvoice  currentStudentId={student?.id_student} />,
    },
  ];

  useEffect(() => {
    dispatch(getStudent(name));
  }, [dispatch,name]);

  return (
    <>
      <Helmet>
        <title> Student: Profile | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Profile"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Student', href: PATH_DASHBOARD.student.list },
            { name: `${student?.User?.first_name} ${student?.User?.first_surname}` },
          ]}
        />
        <ProfileToolbar student={student} />

        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >


          <ProfileCover
            name={`${student?.User?.first_name || ''} ${student?.User?.first_surname || ''}`}
            role={
              !student?.User?.UserRole || student.User.UserRole.length === 0
                ? 'Sin rol asignado'
                : student.User.UserRole.map(element => element.Role.description).join(', ')
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
