import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _invoices } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import SchoolNewEditForm from '../../sections/@dashboard/school/form/SchoolNewEditForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getSchool, updateSchool } from '../../redux/slices/school';
// ----------------------------------------------------------------------

export default function SchoolEditPage() {

  const dispatch = useDispatch();

  const { school } = useSelector((state) => state.school);

  const [currentSchool, setCurrentSchool] = useState(school);

  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  useEffect(() => {
    dispatch(getSchool(id));
  }, [dispatch,id]);

  useEffect(() => {
    setCurrentSchool(school);
  }, [school]);

  return (
    <>
      <Helmet>
        <title> Invoice: Edit | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit invoice"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Invoices',
              href: PATH_DASHBOARD.invoice.list,
            },
            { name: `INV-${currentInvoice?.invoiceNumber}` },
          ]}
        />

        <SchoolNewEditForm isEdit currentSchool={currentSchool}  updateSchool={updateSchool} dispatch={dispatch} />
     
      </Container>
    </>
  );
}
