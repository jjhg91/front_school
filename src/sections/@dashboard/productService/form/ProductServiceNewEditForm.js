import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// assets
// import { countries } from '../../../../assets/data';
// components
import Label from '../../../../components/label';
import { useSnackbar } from '../../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../components/hook-form';
// redux
// import { useDispatch, useSelector } from '../../redux/store';
// import { updateProductService } from '../../redux/slices/productService';

// ----------------------------------------------------------------------

ProductServiceNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProductService: PropTypes.object,
  updateProductService: PropTypes.func,
  createProductService: PropTypes.func,
  dispatch: PropTypes.func
};

export default function ProductServiceNewEditForm({ isEdit = false, currentProductService, updateProductService, createProductService, dispatch }) {

  // const dispatch = useDispatch();

  // const { productService, isLoading } = useSelector((state) => state.productService);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductServiceSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    categoryProductService: Yup.string().required('La categoria es requqerida'),
    description: Yup.string().required('La descripcion es requqerida'),
    durationMonths: Yup.string().required('La duracion en meses es requerida'),
    paymentFrequency: Yup.string().required('La frecuencia del pago es requerida'),
    price: Yup.object().shape({
      amount: Yup.string().required('El precio es requerido'),
      effectiveDate: Yup.string().required('La fecha de efectividad es requerida')
    })
    });


  const defaultValues = useMemo(
    () => ({
      name: currentProductService?.name || '',
      categoryProductService: currentProductService?.categoryProductService || '',
      description: currentProductService?.description || '',
      durationMonths: currentProductService?.durationMonths || '',
      paymentFrequency: currentProductService?.paymentFrequency || '',
      price: {
        amount: currentProductService?.priceHistories[0]?.amount,
        effectiveDate: currentProductService?.priceHistories[0]?.effectiveDate
      } || [{amount:'',effectiveDate:''}]
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProductService]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductServiceSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentProductService) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProductService]);

  const onError = async(error) =>{console.log(error)};
  const onSubmit = async (data) => {
    data.durationMonths = parseInt(data.durationMonths,10)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if(isEdit){
          dispatch(updateProductService(currentProductService.id_productService,data))
      }else{
        dispatch(createProductService(data));
      };
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.productService.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('photoUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit,onError)}>

        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Nombre" />
              <RHFSelect
                native
                name='categoryProductService'
                label="Categoria"
                placeholder="Categoria"
              >
                <option value="" />
                <option value='PRODUCTO'>PRODUCTO</option>
                <option value='SERVICIO'>SERVICIO</option>
                <option value='INSCRIPCION'>INSCRIPCION</option>
                <option value='PERIODO'>PERIODO</option>
              </RHFSelect>
              <RHFTextField name="description" label="Descripcion" sx={{gridColumn: 'span 2'}} />
              <RHFTextField name="durationMonths" label="Duracion (meses)" />
             
              <RHFSelect
                native
                name='paymentFrequency'
                label="Frecuencia de pago"
                placeholder="Frecuencia de pago"
              >
                <option value="" />
                <option value='MENSUAL'>MENSUAL</option>
                <option value='SERVICIO'>QUINCENAL</option>
                <option value='INSCRIPCION'>SEMANAL</option>
                <option value='UNICO'>UNICO</option>
              </RHFSelect>
              <RHFTextField name="price.amount" label="Precio" />
              <RHFTextField name="price.effectiveDate" label="fecha" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create ProductService' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
    </FormProvider>
  );
}
