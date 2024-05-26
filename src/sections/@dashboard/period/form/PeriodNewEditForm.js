import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, TextField} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
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
// import { updatePeriod } from '../../redux/slices/period';

// ----------------------------------------------------------------------

PeriodNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentPeriod: PropTypes.object,
  updatePeriod: PropTypes.func,
  createPeriod: PropTypes.func,
  dispatch: PropTypes.func
};

export default function PeriodNewEditForm({ isEdit = false, currentPeriod, updatePeriod, createPeriod, dispatch }) {

  // const dispatch = useDispatch();

  // const { period, isLoading } = useSelector((state) => state.period);
  // const { control, watch } = useFormContext();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewPeriodSchema = Yup.object().shape({
    name: Yup.string().required('Name period is required'),
    description: Yup.string().required('Name period is required'),
    dateStart: Yup.string().required('Rif or C.I is required'),
    dateEnd: Yup.string().required('Porcentaje incripcion de period required'),
    });

  const defaultValues = useMemo(
    () => ({
      name: currentPeriod?.name || '',
      description: currentPeriod?.description || '',
      dateStart: currentPeriod?.dateStart || '',
      dateEnd: currentPeriod?.dateEnd || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPeriod]
  );

  const methods = useForm({
    resolver: yupResolver(NewPeriodSchema),
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
    if (isEdit && currentPeriod) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentPeriod]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if(isEdit){
          dispatch(updatePeriod(currentPeriod.id_period,data))
      }else{
        dispatch(createPeriod(data));
      };
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.period.list);
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
                    Disabling this will automatically send the period a verification email
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
              <RHFTextField name="name" label="Nombre" />
              <RHFTextField name="description" label="Descripcion" />
              <Controller
                name="dateStart"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Date start"
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                    )}
                  />
                )}
              />
               <Controller
                name="dateEnd"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Date end"
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                    )}
                  />
                )}
              />
              {/* <RHFTextField name="dateStart" label="Date start" /> */}
              {/* <RHFTextField name="dateEnd" label="Date End" /> */}
              {/* 
              <RHFSelect native name="country" label="Country" placeholder="Country">
                <option value="" />
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </RHFSelect> */}

            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Period' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      {/* </Grid> */}
    </FormProvider>
  );
}
