import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import PeriodNewEditForm from '../../sections/@dashboard/period/form/PeriodNewEditForm';
// redux
import { useDispatch } from '../../redux/store';
import { createPeriod } from '../../redux/slices/period';

// ----------------------------------------------------------------------

export default function PeriodCreatePage() {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Period: Create a new period | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new period"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Period',
              href: PATH_DASHBOARD.period.list,
            },
            { name: 'New Shool' },
          ]}
        />
        <PeriodNewEditForm isEdit={false} createPeriod={createPeriod} dispatch={dispatch}/>
      </Container>
    </>
  );
}
