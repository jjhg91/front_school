import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, Grid, Card, Button, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../../routes/paths';
//
import AccountBillingAddressBook from './AccountBillingAddressBook';
import AccountBillingPaymentMethod from './AccountBillingPaymentMethod';
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory';
import Iconify from '../../../../../components/iconify';

import { getSpecialityRegimenOfferings } from '../../../../../redux/slices/specialityRegimenOffering';
import { useDispatch, useSelector } from '../../../../../redux/store';

// ----------------------------------------------------------------------

AccountBilling.propTypes = {
  cards: PropTypes.array,
  invoices: PropTypes.array,
  addressBook: PropTypes.array,
};

export default function AccountBilling({ cards, addressBook, invoices }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { specialityRegimenOfferings } = useSelector((state) => state.specialityRegimenOffering);

  useEffect(() => {
    dispatch(getSpecialityRegimenOfferings());
  }, [dispatch,id]);

  const handleEditRow = (rowId) => {
    navigate(PATH_DASHBOARD.period.editPeriodOffering(rowId));
  };


  return (
    <Grid container spacing={5}>
      <Grid item md={12}>
        <Box display="flex" justifyContent="flex-end">
          <Button
            component={RouterLink}
            to={PATH_DASHBOARD.period.newPeriodOffering}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Nueva Especialidad o grado
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={12}>
        <Stack spacing={3}>

          { specialityRegimenOfferings && ( specialityRegimenOfferings.map( specialityRegimenOffering =>(
              <AccountBillingPaymentMethod
                currentOffering= {specialityRegimenOffering}
                onEditRow={() => handleEditRow(specialityRegimenOffering.id_specialityRegimenOffering)}
              />
          ) ))}

        </Stack>
      </Grid>

    </Grid>
  );
}
