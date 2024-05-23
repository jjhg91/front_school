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
import ModalityNewEditForm from '../../sections/@dashboard/modality/form/ModalityNewEditForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getModality, updateModality } from '../../redux/slices/modality';
// ----------------------------------------------------------------------

export default function ModalityEditPage() {

  const dispatch = useDispatch();

  const { modality } = useSelector((state) => state.modality);

  const [currentModality, setCurrentModality] = useState(modality);

  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  useEffect(() => {
    dispatch(getModality(id));
  }, [dispatch,id]);

  useEffect(() => {
    setCurrentModality(modality);
  }, [modality]);

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

        <ModalityNewEditForm isEdit currentModality={currentModality}  updateModality={updateModality} dispatch={dispatch} />
     
      </Container>
    </>
  );
}
