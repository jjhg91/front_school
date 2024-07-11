import PropTypes from 'prop-types';
// @mui
import { Box, Grid, Card, CardHeader, CardContent, Stack, Typography,Tooltip  } from '@mui/material';
// auth
// import { useAuthContext } from '../../../../auth/useAuthContext';
// utils
import { fData } from '../../../../utils/formatNumber';
// components
// import { useSnackbar } from '../../../../components/snackbar';
import { CustomAvatar } from '../../../../components/custom-avatar';
import { fDate } from 'src/utils/formatTime';
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------
AccountGeneral.propTypes = {
  course: PropTypes.object
};

export default function AccountGeneral({course}) {


  // const { enqueueSnackbar } = useSnackbar();

  // const { user } = useAuthContext();



  return (
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card >
            <CardHeader title="Course information"/>
            <CardContent>
              <Stack spacing={5} alignItems="flex-start">
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={2}>
                    <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                      prefix
                    </Typography>
                    <Typography variant="body2">{course?.prefix}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={10} >
                    <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                      name
                    </Typography>
                    <Typography variant="body2">{course?.name}</Typography>
                  </Grid>
                </Grid>
                <Box sx={{ mb: 5 }}>
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    description
                  </Typography>
                  <Typography variant="body2">{course?.description}</Typography>
                </Box>

                <Grid container>
                  <Grid item xs={12} sm={3}>
                    <Tooltip title="Unidades de Creditos" placement="top-start">
                      <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                        U.C  <Iconify icon="heroicons-outline:information-circle" width={16} sx={{ mr: 0.5 }} />
                      </Typography>
                    </Tooltip>
                    <Typography variant="body2">{course?.credit_unit}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                  <Tooltip title="Horas Guiadas" placement="top-start">
                    <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    H.G  <Iconify icon="heroicons-outline:information-circle" width={16} sx={{ mr: 0.5 }}/>
                    </Typography>
                    </Tooltip>
                    <Typography variant="body2">{course?.hours_guided}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3} >
                  <Tooltip title="Horas Auto Apendrizaje" placement="top-start">
                    <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                      H.A.A  <Iconify icon="heroicons-outline:information-circle" width={16} sx={{ mr: 0.5 }}/>
                    </Typography>
                    </Tooltip>
                    <Typography variant="body2">{course?.hour_self_study}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                  <Tooltip title="Horas Totales" placement="top-start">
                    <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                      H.T  <Iconify icon="heroicons-outline:information-circle" width={16} sx={{ mr: 0.5 }}/>
                    </Typography>
                    </Tooltip>
                    <Typography variant="body2">{course?.hour_all}</Typography>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
            </Card>
        </Grid>

        <Grid item xs={12} md={4}>
        <Stack spacing={5} alignItems="stretch">
        <Card >
            <CardHeader title="Specialitys"/>
            <CardContent>
              <Stack spacing={5} alignItems="flex-start">
                {!course?.CourseSpeciality ?"":
                course.CourseSpeciality.map((cs,key) => {
                  return(
                    <Typography key={key} variant="body2">{cs.Speciality.name}</Typography>
                  )
                })}
              </Stack>
            </CardContent>
            </Card>

            <Card >
            <CardHeader title="Prelaciones"/>
            <CardContent>
              <Stack spacing={5} alignItems="flex-start">
              <Grid container spacing={5}>
                <Grid item xs={12} sm={2}>
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    code
                  </Typography>
                  <Typography variant="body2">{course?.code_course}</Typography>
                </Grid>
                <Grid item xs={12} sm={10} >
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    name
                  </Typography>
                  <Typography variant="body2">{course?.name}</Typography>
                </Grid>
              </Grid>
                <Box sx={{ mb: 5 }}>
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    description
                  </Typography>
                  <Typography variant="body2">{course?.description}</Typography>
                </Box>
              </Stack>
            </CardContent>
            </Card>
            </Stack>
        </Grid>
        </Grid>
    );
  }
