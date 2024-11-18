import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, TextField,  Button, Divider} from '@mui/material';
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
  RHFSelect
} from '../../../../components/hook-form';
// redux
// import { useDispatch, useSelector } from '../../redux/store';
// import { updateSpeciality } from '../../redux/slices/speciality';

// ----------------------------------------------------------------------

SpecialityNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentSpeciality: PropTypes.object,
  currentAcademicRegimens: PropTypes.object,
  updateSpeciality: PropTypes.func,
  createSpeciality: PropTypes.func,
  dispatch: PropTypes.func
};

export default function SpecialityNewEditForm({ isEdit = false, currentSpeciality, currentAcademicRegimens, updateSpeciality, createSpeciality, dispatch }) {

  // const dispatch = useDispatch();

  // const { speciality, isLoading } = useSelector((state) => state.speciality);
  // const { control, watch } = useFormContext();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewSpecialitySchema = Yup.object().shape({
    prefix: Yup.string().required('El prefijo para identificar la especialdiad es requqerido'),
    name: Yup.string().required('El nombre de la especialdiad es requerida'),
    code_speciality: Yup.string(),
    description: Yup.string().required('La descripcion de la especialidad es requerida'),
    specialityRegimen: Yup.array().of(
      Yup.object().shape({
        regiment: Yup.string().required('Seleccionar el regimen'),
        periodsRegimeTotal: Yup.string().required('El numero de periodos totales es requerido'),
      })
    ).required('Se debe seleccionar al menos 1 regimen de estudio')
  });

  const defaultValues = useMemo(
    () => ({
      prefix: currentSpeciality?.prefix || '',
      name: currentSpeciality?.name || '',
      code_speciality: currentSpeciality?.code_speciality || '',
      description: currentSpeciality?.description || '',
      specialityRegimen: currentSpeciality?.SpecialityRegimen?.map( element => (
        {regiment:element.regimenId, periodsRegimeTotal:element.periodsRegimeTotal}
      )) || [{regiment: '', periodsRegimeTotal:''}]
    }),
    [currentSpeciality]
  );


  const methods = useForm({
    resolver: yupResolver(NewSpecialitySchema),
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
    if (isEdit && currentSpeciality) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentSpeciality]);


  const onSubmit = async (data) => {
    data.specialityRegimen = data.specialityRegimen.map( element => (
      {
        regiment: parseInt(element.regiment,10),
        periodsRegimeTotal: parseInt(element.periodsRegimeTotal,10)
      })
    )
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if(isEdit){
          dispatch(updateSpeciality(currentSpeciality.id_speciality,data))
      }else{
        dispatch(createSpeciality(data));
      };
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.speciality.list);
      
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'specialityRegimen',
  });
  const handleAdd = () => {
    append({
      regiment: '',
      periodsRegimeTotal: 1,
    });
  };
  const handleRemove = (index) => {
    remove(index);
  };


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
              <RHFTextField name="name" label="Nombre" />
              <RHFTextField name="description" label="Descripcion" />
            </Box>
            <Box
              sx={{ pt: 3 }}
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(2, 1fr)',
                }}
            >
                <RHFTextField name="prefix" label="Prefijo" />
                <RHFTextField name="code_speciality" label="codigo" />

            </Box>
            <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

            <Stack sx={{ mt: 3 }}>
              {fields.map((item, index) => (
                <Stack key={index} alignItems="flex-end" spacing={1.5}>
                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>

                    <RHFSelect
                      native
                      name={`specialityRegimen[${index}].regiment`}
                      label="Regimen de estudio"
                      placeholder="Regimen de estudio"
                      InputLabelProps={{ shrink: true }}
                    >
                      <option value="" />
                      {currentAcademicRegimens?.map((academicRegimen,key) => (
                        <option key={key} value={academicRegimen.id_academicRegimen}>
                          {academicRegimen.description}
                        </option>
                      ))}
                    </RHFSelect>

                    <RHFTextField
                      name={`specialityRegimen[${index}].periodsRegimeTotal`}
                      label="Periodos totales"
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
                {!isEdit ? 'Create Speciality' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      {/* </Grid> */}
    </FormProvider>
  );
}
