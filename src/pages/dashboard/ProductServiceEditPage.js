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
import ProductServiceNewEditForm from '../../sections/@dashboard/productService/form/ProductServiceNewEditForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProductService, updateProductService } from '../../redux/slices/productService';
// ----------------------------------------------------------------------

export default function ProductServiceEditPage() {

  const dispatch = useDispatch();

  const { productService } = useSelector((state) => state.productService);

  const [currentProductService, setCurrentProductService] = useState(productService);

  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  useEffect(() => {
    dispatch(getProductService(id));
  }, [dispatch,id]);

  useEffect(() => {
    setCurrentProductService(productService);
  }, [productService]);

  return (
    <>
      <Helmet>
        <title> Invoice: Edit | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Editar Proctor o Servicio"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Product Service',
              href: PATH_DASHBOARD.productService.list,
            },
            { name: `INV-${currentInvoice?.invoiceNumber}` },
          ]}
        />

        <ProductServiceNewEditForm isEdit currentProductService={currentProductService}  updateProductService={updateProductService} dispatch={dispatch} />
     
      </Container>
    </>
  );
}
