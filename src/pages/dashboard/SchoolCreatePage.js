import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import SchoolNewEditForm from '../../sections/@dashboard/school/form/SchoolNewEditForm';
// redux
import { useDispatch } from '../../redux/store';
import { createSchool } from '../../redux/slices/school';

// ----------------------------------------------------------------------

export default function SchoolCreatePage() {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> School: Create a new school | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new school"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'School',
              href: PATH_DASHBOARD.school.list,
            },
            { name: 'New Shool' },
          ]}
        />
        <SchoolNewEditForm isEdit={false} createSchool={createSchool} dispatch={dispatch}/>
      </Container>
    </>
  );
}
