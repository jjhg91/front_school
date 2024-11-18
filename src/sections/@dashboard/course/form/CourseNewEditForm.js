import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, TextField, Button, Divider} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import Iconify from '../../../../components/iconify';
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
  RHFSelect
} from '../../../../components/hook-form';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import { getSpecialityRegimens } from '../../../../redux/slices/specialityRegimen';
import { getCourses } from '../../../../redux/slices/course';
// ----------------------------------------------------------------------

CourseNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentCourse: PropTypes.object,
  currentSpecialityRegimens: PropTypes.object,
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

export default function CourseNewEditForm({ isEdit = false, currentCourse, currentSpecialityRegimens,updateCourse, createCourse, dispatch }) {
  // const [listCourse, setListCourse] = useState([])
  // const dispatch = useDispatch();

  // const { course, isLoading } = useSelector((state) => state.course);
  // const { control, watch } = useFormContext();

   const { specialityRegimens } = useSelector((state) => state.specialityRegimen);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewCourseSchema = Yup.object().shape({
    prefix: Yup.string().required('Code is required'),
    name: Yup.string().required('Name course is required'),
    description: Yup.string().required('Description is required'),
    credit_unit: Yup.string().required('Unit Credit is required'),
    hours_guided: Yup.string().required('Hours Guided is required'),
    hours_self_study: Yup.string().required('Hours self study is required'),
    specialitys: Yup.array().min(1, 'Must have at least 1 specialitys'),
    requirements: Yup.array(),
  });

  const defaultValues = useMemo(
    () => ({
      prefix: currentCourse?.prefix || '',
      name: currentCourse?.name || '',
      description: currentCourse?.description || '',
      credit_unit: currentCourse?.credit_unit || '',
      hours_guided: currentCourse?.hours_guided || '',
      hours_self_study: currentCourse?.hours_self_study || '',
      specialitysRequiremen: currentCourse?.CourseSpecialityRegimen?.map(element =>  (
        { specialityRegimen: element.specialityRegimenId,
          periodRegime: element.periodRegime,
          requirement: element.requirement
        })) || [{specialityRegimen:'',periodRegime:'',requirement:''}],
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
    data.credit_unit = parseInt(data.credit_unit,10);
    data.hours_guided = parseInt(data.hours_guided,10);
    data.hours_self_study = parseInt(data.hours_self_study,10);
    data.hours_all = data.hours_guided + data.hours_self_study ;
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if(isEdit){
          dispatch(updateCourse(currentCourse.id_course,data))
      }else{
        dispatch(createCourse(data));
      };
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.course.list);
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

// // Mapea las especialidades y sus regímenes
// const selectSpecialitys = currentSpecialitys?.flatMap(option =>
//   option?.SpecialityRegimen?.map(element => ({
//     label: `${option.name} - ${element.AcademicRegimen.description}`,
//     id: element.id_specialityRegimen
//   }))
// );

const { fields, append, remove } = useFieldArray({
    control,
    name: 'specialitysRequiremen',
  });
  const handleAdd = () => {
    append({
      specialityRegimen: '',
      periodRegime: '',
      requirement: ''
    });
  };
  const handleRemove = (index) => {
    remove(index);
  };

  useEffect(() => {
    dispatch(getSpecialityRegimens());
  }, [dispatch]);

  console.log(values)

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
              {/* <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <RHFAutocomplete
                    name="specialitys"
                    label="Especialidades"
                    multiple
                    // freeSolo
                    // options={SPECIALITYS_OPTION.map((option) => option)}
                    options=  {[...selectSpecialitys] }
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
              </Grid> */}
            </Box>

            <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
            <Stack sx={{ mt: 3 }}>
              {fields.map((item, index) => (
                <Stack key={index} alignItems="flex-end" spacing={1.5}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>

                    <RHFSelect
                      native
                      name={`specialitysRequiremen[${index}].specialityRegimen`}
                      label="Regimen de estudio"
                      placeholder="Regimen de estudio"
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="" />
                      {specialityRegimens?.map((specialityRegimen,key) => (
                        <option key={key} value={specialityRegimen.id_specialityRegimen}>
                          {specialityRegimen?.Speciality?.name} - {specialityRegimen?.AcademicRegimen?.description}
                        </option>
                      ))}
                    </RHFSelect>

                    <RHFTextField
                      name={`specialitysRequiremen[${index}].periodRegime`}
                      label="Periodo"
                      InputLabelProps={{ shrink: true }}
                    />

                    <RHFTextField
                      name={`specialitysRequiremen[${index}].requirement`}
                      label="Prelaciones"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Stack>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Iconify icon="eva:trash-2-outline" />}
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </Button>
                </Stack>
              ))}
            </Stack>

            <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
              <Stack
                spacing={2}
                direction={{ xs: 'column-reverse', md: 'row' }}
                alignItems={{ xs: 'flex-start', md: 'center' }}
              >
                <Button
                  size="small"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={handleAdd}
                  sx={{ flexShrink: 0 }}
                >
                  Agregar regimen de estudio
                </Button>
            </Stack>

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
