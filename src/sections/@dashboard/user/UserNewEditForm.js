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
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
import { countries } from '../../../assets/data';
// components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';
// redux
// import { useDispatch, useSelector } from '../../redux/store';
// import { updateUser } from '../../redux/slices/user';

// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  updateUser: PropTypes.func,
  createUser: PropTypes.func,
  dispatch: PropTypes.func
};

export default function UserNewEditForm({ isEdit = false, currentUser,updateUser, createUser, dispatch }) {

  // const dispatch = useDispatch();

  // const { user, isLoading } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    cedula: Yup.string().required('Cedula is required'),
    first_name: Yup.string().required('Frst name is required'),
    second_name: Yup.string().nullable(true),
    first_surname: Yup.string().required('First surname is required'),
    second_surname:Yup.string().nullable(true),
    birth_date: Yup.string().required('Birth date is required'),
    nacionalidad:Yup.string().required('Nacionalidad is required'),
    gender:Yup.string().required('Gender is required'),
    phoneNumber_1: Yup.string().required('Phone Number 1 is required'),
    phoneNumber_2: Yup.string().nullable(true),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    address: Yup.string().required('Address is required'),
    marital_status:Yup.string().required('Marital status is required'),
    photoUrl: Yup.string().nullable(true),
  });

  const defaultValues = useMemo(
    () => ({
      cedula: currentUser?.cedula || '',
      first_name: currentUser?.first_name || '',
      second_name: currentUser?.second_name || '',
      first_surname: currentUser?.first_surname || '',
      second_surname: currentUser?.second_surname || '',
      birth_date: currentUser?.birth_date || '',
      nacionalidad: currentUser?.nacionalidad || '',
      gender: currentUser?.gender || '',
      phoneNumber_1: currentUser?.phoneNumber_1 || '',
      phoneNumber_2: currentUser?.phoneNumber_2 || '',
      email: currentUser?.email || '',
      address: currentUser?.address || '',
      marital_status: currentUser?.marital_status || '',
      photoUrl: currentUser?.photoUrl || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
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
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {
    console.log('AQUI');
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if(isEdit){
          dispatch(updateUser(currentUser.id_user,data))
      }else{
        dispatch(createUser(data));
      };
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.user.list);
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
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
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
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
              <RHFTextField name="cedula" label="Cedula" />
              <RHFTextField name="first_name" label="First name" />
              <RHFTextField name="second_name" label="Second name" />
              <RHFTextField name="first_surname" label="First surname" />
              <RHFTextField name="second_surname" label="Second surname" />
              <RHFTextField name="birth_date" label="Birth Date" />
              <RHFTextField name="nacionalidad" label="Nacionalidad" />
              <RHFSelect native name="gender" label="Gender" placeholder="Gender">
                <option value="" />

                {['Femenino','Masculino'].map((country,key) => (
                  <option key={key} value={country}>
                    {country}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="phoneNumber_1" label="Phone Number 1" />
              <RHFTextField name="phoneNumber_2" label="Phone Number 2" />
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="address" label="Address" />
              <RHFSelect native name="marital_status" label="Marital Status" placeholder="Marital Status">
                <option value="" />

                {['Casado','Soltero'].map((country,key) => (
                  <option key={key} value={country}>
                    {country}
                  </option>
                ))}
              </RHFSelect>

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
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
