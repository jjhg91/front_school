import PropTypes from 'prop-types';
// @mui
import { Box, Grid, Card, CardHeader, CardContent, Stack, Typography } from '@mui/material';
// auth
// import { useAuthContext } from '../../../../auth/useAuthContext';
// utils
import { fData } from '../../../../utils/formatNumber';
// components
// import { useSnackbar } from '../../../../components/snackbar';
import { CustomAvatar } from '../../../../components/custom-avatar';
import { fDate } from 'src/utils/formatTime';

// ----------------------------------------------------------------------
AccountGeneral.propTypes = {
  course: PropTypes.object
};

export default function AccountGeneral({course}) {


  // const { enqueueSnackbar } = useSnackbar();

  // const { user } = useAuthContext();



  return (
    // <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      // <Grid container spacing={3}>
      //   <Grid item xs={12} md={4}>
      //     <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
      //       <CustomAvatar
      //         src="https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_default.jpg"
      //         alt='Juan'
      //         name='juan'
      //         sx={{
      //           mx: 'auto',
      //           borderWidth: 2,
      //           borderStyle: 'solid',
      //           borderColor: 'common.white',
      //           width: { xs: 80, md: 128 },
      //           height: { xs: 80, md: 128 },
      //         }}
      //       />
      //       <Typography
      //         variant="caption"
      //         sx={{
      //           mt: 2,
      //           mx: 'auto',
      //           display: 'block',
      //           textAlign: 'center',
      //           color: 'text.secondary',
      //         }}
      //       >
      //         Allowed *.jpeg, *.jpg, *.png, *.gif
      //         <br /> max size of {fData(3145728)}
      //       </Typography>
      //     </Card>
      //   </Grid>

        <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <Card >
            <CardHeader title="Course information"/>
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
        
      // </Grid>
    // </FormProvider>
    );
  }
