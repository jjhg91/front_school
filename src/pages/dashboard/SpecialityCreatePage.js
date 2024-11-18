import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from '../../redux/store';
import { createSpeciality } from '../../redux/slices/speciality';
import { getAcademicRegimens } from '../../redux/slices/academicRegimen';

// ----------------------------------------------------------------------

export default function SpecialityCreatePage() {
  const dispatch = useDispatch();
  const { academicRegimens } = useSelector((state) => state.academicRegimen);
  const [ currentAcademicRegimens, setCurrentAcademicRegimens] = useState(academicRegimens);

  const { themeStretch } = useSettingsContext();

  useEffect(() => {
    dispatch(getAcademicRegimens());
  }, [dispatch]);
  useEffect(() => {
    setCurrentAcademicRegimens(academicRegimens);
  }, [academicRegimens]);

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
        <SpecialityNewEditForm isEdit={false} createSpeciality={createSpeciality} currentAcademicRegimens={currentAcademicRegimens} dispatch={dispatch}/>
      </Container>
    </>
  );
}
