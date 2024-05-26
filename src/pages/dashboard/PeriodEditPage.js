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
import PeriodNewEditForm from '../../sections/@dashboard/period/form/PeriodNewEditForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getPeriod, updatePeriod } from '../../redux/slices/period';
// ----------------------------------------------------------------------

export default function PeriodEditPage() {

  const dispatch = useDispatch();

  const { period } = useSelector((state) => state.period);

  const [currentPeriod, setCurrentPeriod] = useState(period);

  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  // const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  useEffect(() => {
    dispatch(getPeriod(id));
  }, [dispatch,id]);

  useEffect(() => {
    setCurrentPeriod(period);
  }, [period]);

  return (
    <>
      <Helmet>
        <title> Invoice: Edit | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit period"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Periods',
              href: PATH_DASHBOARD.period.list,
            },
            { name: period?.name },
          ]}
        />

        <PeriodNewEditForm isEdit currentPeriod={currentPeriod}  updatePeriod={updatePeriod} dispatch={dispatch} />
     
      </Container>
    </>
  );
}
