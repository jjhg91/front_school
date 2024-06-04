import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// import { _invoices } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import CourseNewEditForm from '../../sections/@dashboard/course/form/CourseNewEditForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCourse, updateCourse } from '../../redux/slices/course';
// ----------------------------------------------------------------------

export default function CourseEditPage() {

  const dispatch = useDispatch();

  const { course } = useSelector((state) => state.course);

  const [currentCourse, setCurrentCourse] = useState(course);

  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  // const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  useEffect(() => {
    dispatch(getCourse(id));
  }, [dispatch,id]);

  useEffect(() => {
    setCurrentCourse(course);
  }, [course]);

  return (
    <>
      <Helmet>
        <title> Invoice: Edit | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit course"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Courses',
              href: PATH_DASHBOARD.course.list,
            },
            { name: course?.name },
          ]}
        />

        <CourseNewEditForm isEdit currentCourse={currentCourse}  updateCourse={updateCourse} dispatch={dispatch} />
     
      </Container>
    </>
  );
}
