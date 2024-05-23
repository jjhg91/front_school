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
import BecaNewEditForm from '../../sections/@dashboard/beca/form/BecaNewEditForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBeca, updateBeca } from '../../redux/slices/beca';
// ----------------------------------------------------------------------

export default function BecaEditPage() {

  const dispatch = useDispatch();

  const { beca } = useSelector((state) => state.beca);

  const [currentBeca, setCurrentBeca] = useState(beca);

  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  useEffect(() => {
    dispatch(getBeca(id));
  }, [dispatch,id]);

  useEffect(() => {
    setCurrentBeca(beca);
  }, [beca]);

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

        <BecaNewEditForm isEdit currentBeca={currentBeca}  updateBeca={updateBeca} dispatch={dispatch} />
     
      </Container>
    </>
  );
}
