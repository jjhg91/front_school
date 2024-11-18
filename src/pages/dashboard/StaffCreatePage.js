import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import StaffNewEditForm from '../../sections/@dashboard/staff/StaffNewEditForm';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { createStaff } from '../../redux/slices/staff';

// ----------------------------------------------------------------------

export default function StaffCreatePage() {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Staff: Create a new staff | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new staff"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Staff',
              href: PATH_DASHBOARD.staff.list,
            },
            { name: 'New staff' },
          ]}
        />
        <StaffNewEditForm isEdit={false} createStaff={createStaff} dispatch={dispatch}/>
      </Container>
    </>
  );
}
