import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import PreEnrollmentNewEditForm from '../../sections/@dashboard/preEnrollment/form/PreEnrollmentNewEditForm';
// redux
import { useDispatch } from '../../redux/store';
import { createPreEnrollment } from '../../redux/slices/preEnrollment';

// ----------------------------------------------------------------------

export default function PreEnrollmentCreatePage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Preinscripcion: Crear nueva | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Crear nueva preinscripcion"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Preinscripcion',
              href: PATH_DASHBOARD.preEnrollment.list,
            },
            { name: 'Nueva' },
          ]}
        />
        <PreEnrollmentNewEditForm isEdit={false} currentStudentId={id} createPreEnrollment={createPreEnrollment} dispatch={dispatch} />
      </Container>
    </>
  );
}
