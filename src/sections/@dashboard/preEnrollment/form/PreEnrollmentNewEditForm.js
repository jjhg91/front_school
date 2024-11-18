import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
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
// import { updatePreEnrollment } from '../../redux/slices/preEnrollment';

import { getSpecialityRegimens } from '../../../../redux/slices/specialityRegimen';
import { getCourseSpecialityRegimenOne } from '../../../../redux/slices/courseSpecialityRegimen';
import { useSelector } from '../../../../redux/store';




// ----------------------------------------------------------------------

PreEnrollmentNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentOffering: PropTypes.object,
  currentPreEnrollmentId: PropTypes.string,
  currentStudentId: PropTypes.string,
  updatePreEnrollment: PropTypes.func,
  createPreEnrollment: PropTypes.func,
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

export default function PreEnrollmentNewEditForm({ isEdit = false, currentStudentId, currentOffering, currentPreEnrollmentId, updatePreEnrollment, createPreEnrollment, dispatch }) {

  // const dispatch = useDispatch();


  const { specialityRegimens } = useSelector((state) => state.specialityRegimen);
  const { courseSpecialityRegimenOne } = useSelector((state) => state.courseSpecialityRegimen);

  // const { preEnrollment, isLoading } = useSelector((state) => state.preEnrollment);
  // const { control, watch } = useFormContext();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewPreEnrollmentSchema = Yup.object().shape({
    studentId: Yup.string().test('is-not-zero', 'Debe seleccionar un estudiante', (value) => value !== '0').required(),
    specialityRegimenOfferingId: Yup.string().test('is-not-zero', 'Debe seleccionar una especialidad', (value) => value !== '0').required('Name preEnrollment is required'),
    allCoursesValidate: Yup.boolean(),
    sectionName: Yup.object().shape({
      label: Yup.string(),
      id: Yup.number().integer().test('is-not-zero', 'Debe seleccionar una seccion', (value) => value !== 0),
    }),
  });

  const defaultValues = useMemo(
    () => ({
      studentId: currentStudentId || '0',
      specialityRegimenOfferingId: currentOffering?.SpecialityRegimen.id_specialityRegimen ||'0',
      allCoursesValidate: currentOffering?.allCoursesSections || true,
      // preEnrollmentId: currentPreEnrollmentId || '0',
      sectionName: REQUIREMENTS_OPTION.find(option => option.label === currentOffering?.sectionName) || {id:0,label:''},
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentOffering,currentStudentId]
  );

  const methods = useForm({
    resolver: yupResolver(NewPreEnrollmentSchema),
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
    if (isEdit) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

  const onError = async (data) =>{console.log('ERROR',data);}

  const onSubmit = async (data) => {
    if (data.allCoursesValidate) delete data.allCoursesValidate;
    data.sectionName = data.sectionName.label
    console.log('SUBMIT',data);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if(isEdit){
          // dispatch(updatePreEnrollment(currentOffering.id_specialityRegimenOffering,data))
      }else{
        delete data.allCoursesValidate;
        dispatch(createPreEnrollment(data));
      };
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.preEnrollment.list);
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

              <RHFSelect native name="specialityRegimenOfferingId" label="Grado y regimen" placeholder="Grado y regimen">
                <option value='0' />
                {specialityRegimens && (
                  specialityRegimens.map(specialityRegimen =>(
                    <option value={specialityRegimen.id_specialityRegimen}>{specialityRegimen.Speciality.name} - {specialityRegimen.AcademicRegimen.description}</option>
                  ))
                )}
              </RHFSelect>
              




              {/* ------------------------------------------------------- */}
              {(!isEdit && values.allCoursesValidate) && (
                <RHFAutocomplete
                  name="sectionName"
                  label="Seccion"
                  // multiple
                  // freeSolo
                  options={REQUIREMENTS_OPTION}
                  isOptionEqualToValue={(options, value) => options.id === value.id}
                  // ChipProps={{ size: 'small' }}
                  sx={{ flex: 1 }} // Ocupa la mitad del espacio disponible
                />
              )}
            
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Crear preinscripcion' : 'Guardar cambios'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
    </FormProvider>
  );
}
