import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  RHFAutocomplete,
} from '../../../../components/hook-form';
// redux
// import { useDispatch, useSelector } from '../../redux/store';
// import { updateCourse } from '../../redux/slices/course';


import speciality from 'src/redux/slices/speciality';
// ----------------------------------------------------------------------

CourseNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentCourse: PropTypes.object,
  updateCourse: PropTypes.func,
  createCourse: PropTypes.func,
  dispatch: PropTypes.func
};


const SPECIALITYS_OPTION = [
  { label: 'Administracion de personal', id: 1 },
  { label: 'Administracion de empresas', id: 2 },
  { label: 'Informatica', id: 3 },
  { label: 'Publicidad y mercadeo', id: 4 },
];

const REQUIREMENTS_OPTION = [
  { label: 'Fisica 1', id: 1 },
  { label: 'Fisica 2', id: 2 },
  { label: 'Fisica 4', id: 3 },
];

export default function CourseNewEditForm({ isEdit = false, currentCourse, updateCourse, createCourse, dispatch }) {
  // const [listCourse, setListCourse] = useState([])
  // const dispatch = useDispatch();

  // const { course, isLoading } = useSelector((state) => state.course);
  // const { control, watch } = useFormContext();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewCourseSchema = Yup.object().shape({
    name: Yup.string().required('Name course is required'),
    prefix: Yup.string().required('Code is required'),
    description: Yup.string().required('Description is required'),
    credit_unit: Yup.string().required('Unit Credit is required'),
    hours_guided: Yup.string().required('Hours Guided is required'),
    hours_self_study: Yup.string().required('Hours self study is required'),
    specialitys: Yup.array().min(1, 'Must have at least 1 specialitys'),
    requirements: Yup.array().min(1, 'Must have at least 1 requirement'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentCourse?.name || '',
      prefix: currentCourse?.prefix || '',
      description: currentCourse?.description || '',
      credit_unit: currentCourse?.credit_unit || '',
      hours_guided: currentCourse?.hours_guided || '',
      hours_self_study: currentCourse?.hours_self_study || '',
      specialitys: currentCourse?.specialitys || [],
      requirements: currentCourse?.requirements || [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCourse]
  );

  const methods = useForm({
    resolver: yupResolver(NewCourseSchema),
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
    if (isEdit && currentCourse) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentCourse]);

  const onSubmit = async (data) => {
    console.log('aqui');
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // if(isEdit){
      //     dispatch(updateCourse(currentCourse.id_course,data))
      // }else{
      //   dispatch(createCourse(data));
      // };
      // reset();
      // enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      // navigate(PATH_DASHBOARD.course.list);
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
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                  <RHFTextField name="prefix" label="Prefix" />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <RHFTextField name="name" label="Nombre" />
                </Grid>
              </Grid>
              <RHFTextField name="description" label="Description" />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <RHFTextField name="credit_unit" label="credit unit" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <RHFTextField name="hours_guided" label="hours guided" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <RHFTextField name="hours_self_study" label="hours self study" />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <RHFAutocomplete
                    name="specialitys"
                    label="Specialitys"
                    multiple
                    // freeSolo
                    options={SPECIALITYS_OPTION.map((option) => option)}
                    isOptionEqualToValue={(options, value) => options.id === value.id}
                    ChipProps={{ size: 'small' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RHFAutocomplete
                    name="requirements"
                    label="requirements"
                    multiple
                    // freeSolo
                    options={REQUIREMENTS_OPTION.map((option) => option)}
                    isOptionEqualToValue={(options, value) => options.id === value.id}
                    ChipProps={{ size: 'small' }}

                  />
                </Grid>
              </Grid>
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Course' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
    </FormProvider>
  );
}
