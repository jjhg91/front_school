import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import RepresentativeNewEditForm from '../../sections/@dashboard/representative/RepresentativeNewEditForm';

// redux
import { useDispatch, useSelector } from '../../redux/store';
import { createRepresentative } from '../../redux/slices/representative';

// ----------------------------------------------------------------------

export default function RepresentativeCreatePage() {
  const dispatch = useDispatch();
  
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Representative: Create a new representative | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new representative"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Representative',
              href: PATH_DASHBOARD.representative.list,
            },
            { name: 'New representative' },
          ]}
        />
        <RepresentativeNewEditForm isEdit={false} createRepresentative={createRepresentative} dispatch={dispatch}/>
      </Container>
    </>
  );
}
