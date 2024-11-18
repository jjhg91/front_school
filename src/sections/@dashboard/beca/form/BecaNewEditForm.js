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
  // RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../../components/hook-form';
// redux
// import { useDispatch, useSelector } from '../../redux/store';
// import { updateBeca } from '../../redux/slices/beca';

// ----------------------------------------------------------------------

BecaNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentBeca: PropTypes.object,
  updateBeca: PropTypes.func,
  createBeca: PropTypes.func,
  dispatch: PropTypes.func
};

export default function BecaNewEditForm({ isEdit = false, currentBeca, updateBeca, createBeca, dispatch }) {

  // const dispatch = useDispatch();

  // const { beca, isLoading } = useSelector((state) => state.beca);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewBecaSchema = Yup.object().shape({
    name_beca: Yup.string().required('Name beca is required'),
    rif: Yup.string().required('Rif or C.I is required'),
    description: Yup.string().required('Name beca is required'),
    given_by: Yup.string().required('Nombre de contacto de beca required'),
    inscription: Yup.string().required('Porcentaje incripcion de beca required'),
    monthly_payment: Yup.string().required('porcentaje de mensualidad beca is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber_1: Yup.string().required('Phone Number 1 is required'),
    phoneNumber_2: Yup.string().nullable(true),
    });


  const defaultValues = useMemo(
    () => ({
      name_beca: currentBeca?.name_beca || '',
      rif: currentBeca?.rif || '',
      description: currentBeca?.description || '',
      given_by: currentBeca?.given_by || '',
      inscription: currentBeca?.inscription || '',
      monthly_payment: currentBeca?.monthly_payment || '',
      email: currentBeca?.email || '',
      phoneNumber_1: currentBeca?.phoneNumber_1 || '',
      phoneNumber_2: currentBeca?.phoneNumber_2 || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentBeca]
  );

  const methods = useForm({
    resolver: yupResolver(NewBecaSchema),
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
    if (isEdit && currentBeca) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentBeca]);

  const onSubmit = async (data) => {
    data.inscription = parseInt(data.inscription,10);
    data.monthly_payment = parseInt(data.monthly_payment,10);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if(isEdit){
          dispatch(updateBeca(currentBeca.id_beca,data))
      }else{
        dispatch(createBeca(data));
      };
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.beca.list);
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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {/* <Grid container spacing={3}> */}
        {/* <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={values.status === 'active' ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="photoUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the beca a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
          </Card>
        </Grid> */}

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
              <RHFTextField name="name_beca" label="Nombre" />
              <RHFTextField name="rif" label="Rif" />
              <RHFTextField name="description" label="Descripcion" sx={{gridColumn: 'span 2'}} />
              <RHFTextField name="inscription" label="Porcentaje inscripcion" />
              <RHFTextField name="monthly_payment" label="Porcentaje mensualidad" />
              <RHFTextField name="given_by" label="Nombre de contacto" />
              <RHFTextField name="email" label="Correo electronico de contacto" />
              <RHFTextField name="phoneNumber_1" label="Numero celular de contacto" />
              <RHFTextField name="phoneNumber_2" label="Numero celular de contacto (alternativo)" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Beca' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      {/* </Grid> */}
    </FormProvider>
  );
}
