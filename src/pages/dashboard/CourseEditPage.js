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
import { getSpecialityRegimens } from '../../redux/slices/specialityRegimen';
// ----------------------------------------------------------------------

export default function CourseEditPage() {

  const dispatch = useDispatch();

  const { course } = useSelector((state) => state.course);
  const { specialityRegimens } = useSelector((state) => state.specialityRegimen);

  const [currentCourse, setCurrentCourse] = useState(course);
  const [currentSpecialityRegimens, setCurrentSpecialityRegimens] = useState(specialityRegimens);

  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  // const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  useEffect(() => {
    dispatch(getCourse(id));
    dispatch(getSpecialityRegimens());
  }, [dispatch,id]);

  useEffect(() => {
    setCurrentCourse(course);
  }, [course]);

  useEffect(() => {
    setCurrentSpecialityRegimens(specialityRegimens);
  }, [specialityRegimens]);


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

        <CourseNewEditForm isEdit currentCourse={currentCourse} currentSpecialityRegimens={currentSpecialityRegimens} updateCourse={updateCourse} dispatch={dispatch} />
     
      </Container>
    </>
  );
}
