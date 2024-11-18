import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import PeriodOfferingNewEditForm from '../../sections/@dashboard/period/form/PeriodOfferingNewEditForm';
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
        <title> Periodo: Crear nueva oferta academica | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Crear nueva oferta academica"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Periodo',
              href: PATH_DASHBOARD.period.list,
            },
            { name: 'New' },
          ]}
        />
        <PeriodOfferingNewEditForm isEdit={false} createPeriod={createPeriod} dispatch={dispatch}/>
      </Container>
    </>
  );
}
