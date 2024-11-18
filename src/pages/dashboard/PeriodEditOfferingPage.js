import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import PeriodOfferingNewEditForm from '../../sections/@dashboard/period/form/PeriodOfferingNewEditForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getSpecialityRegimenOffering, updateSpecialityRegimenOffering } from '../../redux/slices/specialityRegimenOffering';


// ----------------------------------------------------------------------

export default function PeriodEditOfferingPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { specialityRegimenOffering } = useSelector((state) => state.specialityRegimenOffering);


  const { themeStretch } = useSettingsContext();

  useEffect(() => {
    dispatch(getSpecialityRegimenOffering(id));
  }, [dispatch, id]);

  return (
    <>
      <Helmet>
        <title> Periodo: Editar ofertas | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Editar ofertas"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Period',
              href: PATH_DASHBOARD.period.list,
            },
            { name: 'Editar oferta' },
          ]}
        />

        <PeriodOfferingNewEditForm
          isEdit
          currentOffering={specialityRegimenOffering}
          currentPeriodId={id}
          updateSpecialityRegimenOffering={updateSpecialityRegimenOffering}
          dispatch={dispatch}
        />
      </Container>
    </>
  );
}
