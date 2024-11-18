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
import PreEnrollmentNewEditForm from '../../sections/@dashboard/preEnrollment/form/PreEnrollmentNewEditForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getPreEnrollment, createPreEnrollment, updatePreEnrollment } from '../../redux/slices/preEnrollment';
// ----------------------------------------------------------------------

export default function PreEnrollmentEditPage() {
  const dispatch = useDispatch();

  const { preEnrollment } = useSelector((state) => state.preEnrollment);

  const [currentPreEnrollment, setCurrentPreEnrollment] = useState(preEnrollment);

  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  useEffect(() => {
    dispatch(getPreEnrollment(id));
  }, [dispatch, id]);

  useEffect(() => {
    setCurrentPreEnrollment(preEnrollment);
  }, [preEnrollment]);

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

        <PreEnrollmentNewEditForm
          isEdit
          currentPreEnrollment={currentPreEnrollment}
          updatePreEnrollment={updatePreEnrollment}
          dispatch={dispatch}
        />
      </Container>
    </>
  );
}
