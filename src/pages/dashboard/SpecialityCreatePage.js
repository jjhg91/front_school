import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import SpecialityNewEditForm from '../../sections/@dashboard/speciality/form/SpecialityNewEditForm';
// redux
import { useDispatch } from '../../redux/store';
import { createSpeciality } from '../../redux/slices/speciality';

// ----------------------------------------------------------------------

export default function SpecialityCreatePage() {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Speciality: Create a new speciality | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new speciality"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Speciality',
              href: PATH_DASHBOARD.speciality.list,
            },
            { name: 'New Shool' },
          ]}
        />
        <SpecialityNewEditForm isEdit={false} createSpeciality={createSpeciality} dispatch={dispatch}/>
      </Container>
    </>
  );
}
