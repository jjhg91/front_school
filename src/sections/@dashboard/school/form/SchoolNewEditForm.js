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
// import { updateSchool } from '../../redux/slices/school';

// ----------------------------------------------------------------------

SchoolNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentSchool: PropTypes.object,
  updateSchool: PropTypes.func,
  createSchool: PropTypes.func,
  dispatch: PropTypes.func
};

export default function SchoolNewEditForm({ isEdit = false, currentSchool, updateSchool, createSchool, dispatch }) {

  // const dispatch = useDispatch();

  // const { school, isLoading } = useSelector((state) => state.school);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewSchoolSchema = Yup.object().shape({
    description: Yup.string().required('Name school is required'),
    abbreviation: Yup.string().required('Abbreviationis required'),
    rif: Yup.string().required('Rif school is required'),
    address: Yup.string().required('Address is required'),
    name_contact: Yup.string().required('Name contacto school is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber_1: Yup.string().required('Phone Number 1 is required'),
    phoneNumber_2: Yup.string().nullable(true),
    logoUrl: Yup.string().nullable(true),
    });

  const defaultValues = useMemo(
    () => ({
      description: currentSchool?.description || '',
      abbreviation: currentSchool?.abbreviation || '',
      rif: currentSchool?.rif || '',
      address: currentSchool?.address || '',
      name_contact: currentSchool?.name_contact || '',
      email: currentSchool?.email || '',
      phoneNumber_1: currentSchool?.phoneNumber_1 || '',
      phoneNumber_2: currentSchool?.phoneNumber_2 || '',
      logoUrl: currentSchool?.logoUrl || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSchool]
  );

  const methods = useForm({
    resolver: yupResolver(NewSchoolSchema),
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
    if (isEdit && currentSchool) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentSchool]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if(isEdit){
          dispatch(updateSchool(currentSchool.id_school,data))
      }else{
        dispatch(createSchool(data));
      };
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.school.list);
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
                    Disabling this will automatically send the school a verification email
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
              <RHFTextField name="description" label="Name school" />
              <RHFTextField name="abbreviation" label="Abbreviation name school" />
              <RHFTextField name="rif" label="rif school" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="name_contact" label="Name contact school" />
              <RHFTextField name="email" label="Email" />
              <RHFTextField name="phoneNumber_1" label="Phone Number 1" />
              <RHFTextField name="phoneNumber_2" label="Phone Number 2" />
             
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
                {!isEdit ? 'Create School' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
