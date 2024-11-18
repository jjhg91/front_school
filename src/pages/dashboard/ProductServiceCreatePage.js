import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import ProductServiceNewEditForm from '../../sections/@dashboard/productService/form/ProductServiceNewEditForm';
// redux
import { useDispatch } from '../../redux/store';
import { createProductService } from '../../redux/slices/productService';

// ----------------------------------------------------------------------

export default function ProductServiceCreatePage() {
  const dispatch = useDispatch();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> ProductService: Create a new productService | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new productService"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'ProductService',
              href: PATH_DASHBOARD.productService.list,
            },
            { name: 'New Shool' },
          ]}
        />
        <ProductServiceNewEditForm isEdit={false} createProductService={createProductService} dispatch={dispatch}/>
      </Container>
    </>
  );
}
