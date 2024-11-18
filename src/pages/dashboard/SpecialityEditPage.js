import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// import { _invoices } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import SpecialityNewEditForm from '../../sections/@dashboard/speciality/form/SpecialityNewEditForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getSpeciality, updateSpeciality } from '../../redux/slices/speciality';
import { getAcademicRegimens } from '../../redux/slices/academicRegimen';
// ----------------------------------------------------------------------

export default function SpecialityEditPage() {

  const dispatch = useDispatch();

  const { speciality } = useSelector((state) => state.speciality);
  const { academicRegimens } = useSelector((state) => state.academicRegimen);

  const [currentSpeciality, setCurrentSpeciality] = useState(speciality);
  const [ currentAcademicRegimens, setCurrentAcademicRegimens] = useState(academicRegimens);
  

  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  // const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  useEffect(() => {
    dispatch(getSpeciality(id));
    dispatch(getAcademicRegimens());
  }, [dispatch,id]);

  useEffect(() => {
    setCurrentSpeciality(speciality);
  }, [speciality]);

  useEffect(() => {
    setCurrentAcademicRegimens(academicRegimens);
  }, [academicRegimens]);


  return (
    <>
      <Helmet>
        <title> Invoice: Edit | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit speciality"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Specialitys',
              href: PATH_DASHBOARD.speciality.list,
            },
            { name: speciality?.name },
          ]}
        />

        <SpecialityNewEditForm isEdit currentSpeciality={currentSpeciality} currentAcademicRegimens={currentAcademicRegimens}  updateSpeciality={updateSpeciality} dispatch={dispatch} />
     
      </Container>
    </>
  );
}
