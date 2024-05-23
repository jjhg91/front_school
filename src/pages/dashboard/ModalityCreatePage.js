import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import ModalityNewEditForm from '../../sections/@dashboard/modality/form/ModalityNewEditForm';
// redux
import { useDispatch } from '../../redux/store';
import { createModality } from '../../redux/slices/modality';

// ----------------------------------------------------------------------

export default function ModalityCreatePage() {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Modality: Create a new modality | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new modality"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Modality',
              href: PATH_DASHBOARD.modality.list,
            },
            { name: 'New Shool' },
          ]}
        />
        <ModalityNewEditForm isEdit={false} createModality={createModality} dispatch={dispatch}/>
      </Container>
    </>
  );
}
