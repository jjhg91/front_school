import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import CourseNewEditForm from '../../sections/@dashboard/course/form/CourseNewEditForm';
// redux
import { useDispatch } from '../../redux/store';
import { createCourse } from '../../redux/slices/course';

// ----------------------------------------------------------------------

export default function CourseCreatePage() {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Course: Create a new course | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new course"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Course',
              href: PATH_DASHBOARD.course.list,
            },
            { name: 'New Shool' },
          ]}
        />
        <CourseNewEditForm isEdit={false} createCourse={createCourse} dispatch={dispatch}/>
      </Container>
    </>
  );
}
