import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// import { _staffList } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import StaffNewEditForm from '../../sections/@dashboard/staff/StaffNewEditForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getStaff, updateStaff } from '../../redux/slices/staff';



// ----------------------------------------------------------------------

export default function StaffEditPage() {

  const dispatch = useDispatch();

  const { staff, isLoading } = useSelector((state) => state.staff);

  const [currentStaff, setCurrentStaff] = useState(staff);

  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  // const currentStaff = _staffList.find((staff) => paramCase(staff.name) === name);
  
  useEffect(() => {
    dispatch(getStaff(name));
  }, [dispatch,name]);

  useEffect(() => {
    setCurrentStaff(staff);
  }, [staff]);
  

  return (
    <>
      <Helmet>
        <title> Staff: Edit staff | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit staff"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Staff',
              href: PATH_DASHBOARD.staff.list,
            },
            { name: `${currentStaff?.User?.first_name} ${currentStaff?.User?.first_surname}`},
          ]}
        />

        <StaffNewEditForm isEdit currentStaff={currentStaff}  updateStaff={updateStaff} dispatch={dispatch}/>
      </Container>
    </>
  );
}
