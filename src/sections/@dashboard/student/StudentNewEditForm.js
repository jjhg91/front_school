import PropTypes from 'prop-types';
import * as Yup from 'yup';
import * as dayjs  from 'dayjs';
import  * as utc  from 'dayjs/plugin/utc';
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
// import { updateStudent } from '../../redux/slices/student';

// ----------------------------------------------------------------------

StudentNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentStudent: PropTypes.object,
  updateStudent: PropTypes.func,
  createStudent: PropTypes.func,
  dispatch: PropTypes.func
};

export default function StudentNewEditForm({ isEdit = false, currentStudent,updateStudent, createStudent, dispatch }) {
   dayjs.extend(utc);
  // const dispatch = useDispatch();

  // const { student, isLoading } = useSelector((state) => state.student);
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewStudentSchema = Yup.object().shape({
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
    date_admission: Yup.string().required('Admission date is required'),
  });

  const defaultValues = useMemo(
    () => ({
      cedula: currentStudent?.User?.cedula || '',
      first_name: currentStudent?.User?.first_name || '',
      second_name: currentStudent?.User?.second_name || '',
      first_surname: currentStudent?.User?.first_surname || '',
      second_surname: currentStudent?.User?.second_surname || '',
      birth_date: currentStudent?.User?.birth_date || '',
      nacionalidad: currentStudent?.User?.nacionalidad || '',
      gender: currentStudent?.User?.gender || '',
      phoneNumber_1: currentStudent?.User?.phoneNumber_1 || '',
      phoneNumber_2: currentStudent?.User?.phoneNumber_2 || '',
      email: currentStudent?.User?.email || '',
      address: currentStudent?.User?.address || '',
      marital_status: currentStudent?.User?.marital_status || '',
      photoUrl: currentStudent?.User?.photoUrl || '',
      date_admission: currentStudent?.date_admission || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStudent]
  );

  const methods = useForm({
    resolver: yupResolver(NewStudentSchema),
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
    if (isEdit && currentStudent) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentStudent]);

  const onSubmit = async (data) => {
    data.birth_date = dayjs.utc(data.birth_date).format('YYYY-MM-DD');
    data.date_admission = dayjs.utc(data.date_admission).format('YYYY-MM-DD');

    try {

      await new Promise((resolve) => setTimeout(resolve, 500));
      if(isEdit){
          dispatch(updateStudent(currentStudent.id_student,data))
      }else{
        dispatch(createStudent(data));
      };
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.student.list);
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
                    Disabling this will automatically send the student a verification email
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
              <RHFTextField name="cedula" label="Cedula de identidad" />
              <RHFTextField name="first_name" label="Primer nombre" />
              <RHFTextField name="second_name" label="Segundo nombre" />
              <RHFTextField name="first_surname" label="Primer apellido" />
              <RHFTextField name="second_surname" label="Segundo apellido" />
              <Controller
                name="birth_date"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Fecha de nacimiento"
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
              <RHFTextField name="nacionalidad" label="Nacionalidad" />
              <RHFSelect native name="gender" label="Genero" placeholder="Genero">
                <option value="" />

                {['Femenino','Masculino'].map((country,key) => (
                  <option key={key} value={country}>
                    {country}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="phoneNumber_1" label="Numero de Telefono" />
              <RHFTextField name="phoneNumber_2" label="Numero de Telefono (alternativo)" />
              <RHFTextField name="email" label="Correo electonico" />
              <RHFTextField name="address" label="Direccion de vivienda" />
              <RHFSelect native name="marital_status" label="Estado civil" placeholder="Estado civil">
                <option value="" />

                {['Casado','Soltero'].map((country,key) => (
                  <option key={key} value={country}>
                    {country}
                  </option>
                ))}
              </RHFSelect>
               <Controller
                name="date_admission"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Fecha de admision"
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

            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Student' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
