import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, TextField, Divider, Button } from '@mui/material';
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
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFCheckbox,
  RHFAutocomplete
} from '../../../../components/hook-form';
// redux
// import { useDispatch, useSelector } from '../../redux/store';
// import { updatePeriod } from '../../redux/slices/period';

import { getSpecialityRegimens } from '../../../../redux/slices/specialityRegimen';
import { getCourseSpecialityRegimenOne } from '../../../../redux/slices/courseSpecialityRegimen';
import { useSelector } from '../../../../redux/store';




// ----------------------------------------------------------------------

PeriodNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentOffering: PropTypes.object,
  currentPeriodId: PropTypes.string,
  updateSpecialityRegimenOffering: PropTypes.func,
  createPeriod: PropTypes.func,
  dispatch: PropTypes.func
};

const REQUIREMENTS_OPTION = [
  { label: 'A', id: 1 },
  { label: 'B', id: 2 },
  { label: 'C', id: 3 },
  { label: 'D', id: 4 },
  { label: 'E', id: 5 },
  { label: 'F', id: 6 },
];

export default function PeriodNewEditForm({ isEdit = false, currentOffering, currentPeriodId, updateSpecialityRegimenOffering, createPeriod, dispatch }) {

  // const dispatch = useDispatch();


  const { specialityRegimens } = useSelector((state) => state.specialityRegimen);
  const { courseSpecialityRegimenOne } = useSelector((state) => state.courseSpecialityRegimen);

  // const { period, isLoading } = useSelector((state) => state.period);
  // const { control, watch } = useFormContext();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewPeriodSchema = Yup.object().shape({
    specialityRegimenId: Yup.string().required('Name period is required'),
    periodId: Yup.string().required(),
    allCoursesValidate: Yup.boolean(),
    allCoursesSections: Yup.array(),
    specificCourses: Yup.array().of(
      Yup.object().shape({
        courseId: Yup.string(),
        sections: Yup.array().of(
          Yup.object().shape({
            label: Yup.string(),
            id: Yup.number().integer()
          })
        )
      }),
    )
  });

  const defaultValues = useMemo(
    () => ({
      specialityRegimenId: currentOffering?.SpecialityRegimen.id_specialityRegimen ||'0',
      periodId: currentPeriodId || '0',
      allCoursesValidate: currentOffering?.allCoursesSections || false,
      allCoursesSections: currentOffering?.allCoursesSections || [],
      specificCourses: currentOffering?.CourseOffering.map(element => (
        {
          courseId: element.courseSpecialityRegimenId,
          sections: element.CourseSection.map((section,index) => ({id:index+1,label:section.sectionName}))
        }
      )) || [{courseId: '0', sections:[]}]
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentOffering,currentPeriodId]
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
    if (isEdit && currentPeriodId) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentPeriodId]);

  const onError = async (data) =>{console.log(data); console.log(values)}

  const onSubmit = async (data) => {
    data =  {
      ...data,
      specificCourses: data.specificCourses.map(course => ({
        ...course,
        sections: course.sections.map(section => section.label) // Extraer solo el label
      }))
    };
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if(isEdit){
          delete data.allCoursesValidate;
          delete data.allCoursesSections;
          dispatch(updateSpecialityRegimenOffering(currentOffering.id_specialityRegimenOffering,data))
      }else{
        delete data.allCoursesValidate;
        dispatch(createPeriod(data));
      };
      reset();
      enqueueSnackbar(!isEdit ? 'Crear!' : 'Actualizar!');
      navigate(PATH_DASHBOARD.period.list);
    } catch (error) {
      console.error(error);
    }
  };



  const { fields, append, remove } = useFieldArray({
    control,
    name: 'specificCourses',
  });
  const handleAdd = () => {
    append({
      courseId: '0',
      sections: [],
    });
  };
  const handleRemove = (index) => {
    remove(index);
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

  useEffect(() => {
    dispatch(getSpecialityRegimens());
  }, [dispatch]);

  useEffect(() => {
    if(values.specialityRegimenId){
      dispatch(getCourseSpecialityRegimenOne(values.specialityRegimenId));
    }else{
      dispatch(getCourseSpecialityRegimenOne(0));
    }
  }, [dispatch,values.specialityRegimenId]);


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit, onError)}>
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

              <RHFSelect native name="specialityRegimenId" label="specialityRegimenId" placeholder="specialityRegimenId">
                <option value='0' />
                {specialityRegimens && (
                  specialityRegimens.map(specialityRegimen =>(
                    <option value={specialityRegimen.id_specialityRegimen}>{specialityRegimen.Speciality.name} - {specialityRegimen.AcademicRegimen.description}</option>
                  ))
                )}
              </RHFSelect>

              {!isEdit && (
                <Controller
                  name="allCoursesValidate"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          {...field}
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked); // Actualiza el valor del switch
                            remove(fields.map((_, index) => index));
                            setValue('allCoursesSections',[])
                          }}
                        />
                      }
                      label="allCoursesValidate"
                    />
                  )}
                />
              )}
              




              {/* ------------------------------------------------------- */}
              {(!isEdit && values.allCoursesValidate) && (
                <RHFAutocomplete
                  name="allCoursesSections"
                  label="Secciones"
                  multiple
                  // freeSolo
                  options={REQUIREMENTS_OPTION}
                  isOptionEqualToValue={(options, value) => options.id === value.id}
                  // ChipProps={{ size: 'small' }}
                  sx={{ flex: 1 }} // Ocupa la mitad del espacio disponible
                />
              )}
              {/* ------------------------------------------------------- */}
              {!values.allCoursesValidate && (
                <>
                  <Stack >
                    {fields.map((item, index) => (
                      <Stack key={index} alignItems="flex-end" spacing={1.5}>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
                          <RHFSelect
                            native
                            name={`specificCourses[${index}].courseId`}
                            label="Regimen de estudio"
                            placeholder="Regimen de estudio"
                            InputLabelProps={{ shrink: true }}
                            sx={{ flex: 1 }} // Ocupa la mitad del espacio disponible
                          >
                            <option value='0' />
                            {courseSpecialityRegimenOne && (
                              courseSpecialityRegimenOne.map(element =>(
                                <option value={element.id_courseSpecialityRegimen}>{element.Course.name}</option>

                              ))
                            )}
                          </RHFSelect>
                          <RHFAutocomplete
                            name={`specificCourses[${index}].sections`}
                            label="Secciones"
                            multiple
                            // freeSolo
                            options={REQUIREMENTS_OPTION}
                            isOptionEqualToValue={(options, value) => options.id === value.id}
                            // ChipProps={{ size: 'small' }}
                            sx={{ flex: 1 }} // Ocupa la mitad del espacio disponible
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
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  <Stack
                    // spacing={2}
                    direction={{ xs: 'column-reverse', md: 'row' }}
                    alignItems={{ xs: 'flex-start', md: 'center' }}
                  >
                    <Button
                      size="small"
                      startIcon={<Iconify icon="eva:plus-fill" />}
                      onClick={handleAdd}
                      sx={{ flexShrink: 0 }}
                    >
                      Agregar Cursos
                    </Button>
                  </Stack>
                </>
              )}
              {/* ------------------------------------------------------- */}


            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Period' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
    </FormProvider>
  );
}
