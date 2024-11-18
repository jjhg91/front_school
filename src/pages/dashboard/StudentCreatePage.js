import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import StudentNewEditForm from '../../sections/@dashboard/student/StudentNewEditForm';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { createStudent } from '../../redux/slices/student';

// ----------------------------------------------------------------------

export default function StudentCreatePage() {
  const dispatch = useDispatch();
  
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Student: Create a new student | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new student"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Student',
              href: PATH_DASHBOARD.student.list,
            },
            { name: 'New student' },
          ]}
        />
        <StudentNewEditForm isEdit={false} createStudent={createStudent} dispatch={dispatch}/>
      </Container>
    </>
  );
}
