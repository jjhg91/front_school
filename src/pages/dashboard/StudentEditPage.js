import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// import { _studentList } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import StudentNewEditForm from '../../sections/@dashboard/student/StudentNewEditForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getStudent, updateStudent } from '../../redux/slices/student';



// ----------------------------------------------------------------------

export default function StudentEditPage() {

  const dispatch = useDispatch();

  const { student, isLoading } = useSelector((state) => state.student);

  const [currentStudent, setCurrentStudent] = useState(student);

  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  // const currentStudent = _studentList.find((student) => paramCase(student.name) === name);
  
  useEffect(() => {
    dispatch(getStudent(name));
  }, [dispatch,name]);

  useEffect(() => {
    setCurrentStudent(student);
  }, [student]);
  

  return (
    <>
      <Helmet>
        <title> Student: Edit student | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit student"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Student',
              href: PATH_DASHBOARD.student.list,
            },
            { name: `${currentStudent?.User?.first_name} ${currentStudent?.User?.first_surname}`},
          ]}
        />

        <StudentNewEditForm isEdit currentStudent={currentStudent}  updateStudent={updateStudent} dispatch={dispatch}/>
      </Container>
    </>
  );
}
