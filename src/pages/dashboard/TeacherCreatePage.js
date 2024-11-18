import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import TeacherNewEditForm from '../../sections/@dashboard/teacher/TeacherNewEditForm';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { createTeacher } from '../../redux/slices/teacher';

// ----------------------------------------------------------------------

export default function TeacherCreatePage() {
  const dispatch = useDispatch();
  
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Teacher: Create a new teacher | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new teacher"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Teacher',
              href: PATH_DASHBOARD.teacher.list,
            },
            { name: 'New teacher' },
          ]}
        />
        <TeacherNewEditForm isEdit={false} createTeacher={createTeacher} dispatch={dispatch}/>
      </Container>
    </>
  );
}
