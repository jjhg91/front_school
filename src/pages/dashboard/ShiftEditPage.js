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
import ShiftNewEditForm from '../../sections/@dashboard/shift/form/ShiftNewEditForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getShift, updateShift } from '../../redux/slices/shift';
// ----------------------------------------------------------------------

export default function ShiftEditPage() {

  const dispatch = useDispatch();

  const { shift } = useSelector((state) => state.shift);

  const [currentShift, setCurrentShift] = useState(shift);

  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  // const currentShift = _invoices.find((invoice) => invoice.id === id);

  useEffect(() => {
    dispatch(getShift(id));
  }, [dispatch,id]);

  useEffect(() => {
    setCurrentShift(shift);
  }, [shift]);

  return (
    <>
      <Helmet>
        <title> Shift: Edit | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit shift"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Shifts',
              href: PATH_DASHBOARD.shift.list,
            },
            { name: currentShift?.name_shift },
          ]}
        />

        <ShiftNewEditForm isEdit currentShift={currentShift}  updateShift={updateShift} dispatch={dispatch} />
     
      </Container>
    </>
  );
}
