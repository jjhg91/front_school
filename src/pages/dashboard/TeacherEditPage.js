import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// import { _teacherList } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import TeacherNewEditForm from '../../sections/@dashboard/teacher/TeacherNewEditForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getTeacher, updateTeacher } from '../../redux/slices/teacher';



// ----------------------------------------------------------------------

export default function TeacherEditPage() {

  const dispatch = useDispatch();

  const { teacher, isLoading } = useSelector((state) => state.teacher);

  const [currentTeacher, setCurrentTeacher] = useState(teacher);

  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  // const currentTeacher = _teacherList.find((teacher) => paramCase(teacher.name) === name);

  useEffect(() => {
    dispatch(getTeacher(name));
  }, [dispatch,name]);

  useEffect(() => {
    setCurrentTeacher(teacher);
  }, [teacher]);
  

  return (
    <>
      <Helmet>
        <title> Teacher: Edit teacher | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit teacher"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Teacher',
              href: PATH_DASHBOARD.teacher.list,
            },
            { name: `${currentTeacher?.User?.first_name} ${currentTeacher?.User?.first_surname}`},
          ]}
        />

        <TeacherNewEditForm isEdit currentTeacher={currentTeacher}  updateTeacher={updateTeacher} dispatch={dispatch}/>
      </Container>
    </>
  );
}
