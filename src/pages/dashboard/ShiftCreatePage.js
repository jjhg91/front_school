import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import ShiftNewEditForm from '../../sections/@dashboard/shift/form/ShiftNewEditForm';
// redux
import { useDispatch } from '../../redux/store';
import { createShift } from '../../redux/slices/shift';

// ----------------------------------------------------------------------

export default function ShiftCreatePage() {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Shift: Create a new shift | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new shift"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Shift',
              href: PATH_DASHBOARD.shift.list,
            },
            { name: 'New Shool' },
          ]}
        />
        <ShiftNewEditForm isEdit={false} createShift={createShift} dispatch={dispatch}/>
      </Container>
    </>
  );
}
