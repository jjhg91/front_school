import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from '../../redux/store';
import { createCourse } from '../../redux/slices/course';
import { getSpecialityRegimens } from '../../redux/slices/specialityRegimen';

// ----------------------------------------------------------------------

export default function CourseCreatePage() {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();
  const { specialityRegimens } = useSelector((state) => state.specialityRegimen);
  const [currentSpecialityRegimens, setCurrentSpecialityRegimens] = useState(specialityRegimens);

  useEffect(() => {
    dispatch(getSpecialityRegimens());
  }, [dispatch]);

  useEffect(() => {
    setCurrentSpecialityRegimens(specialityRegimens);
  }, [specialityRegimens]);

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
            { name: 'New Course' },
          ]}
        />
        <CourseNewEditForm
          isEdit={false}
          createCourse={createCourse}
          currentSpecialityRegimens={currentSpecialityRegimens}
          dispatch={dispatch}
        />
      </Container>
    </>
  );
}
