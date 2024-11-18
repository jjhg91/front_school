import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import BecaNewEditForm from '../../sections/@dashboard/beca/form/BecaNewEditForm';
// redux
import { useDispatch } from '../../redux/store';
import { createBeca } from '../../redux/slices/beca';

// ----------------------------------------------------------------------

export default function BecaCreatePage() {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Beca: Create a new beca | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new beca"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Beca',
              href: PATH_DASHBOARD.beca.list,
            },
            { name: 'New Shool' },
          ]}
        />
        <BecaNewEditForm isEdit={false} createBeca={createBeca} dispatch={dispatch} />
      </Container>
    </>
  );
}
