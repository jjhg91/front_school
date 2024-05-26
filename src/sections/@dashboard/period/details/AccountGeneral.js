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
  period: PropTypes.object
};

export default function AccountGeneral({period}) {


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
            <CardHeader title="Period information"/>
            <CardContent>
              <Stack spacing={5} alignItems="flex-start">
                <Box sx={{ mb: 5 }}>
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    Name
                  </Typography>
                  <Typography variant="body2">{period?.name}</Typography>
                  <Typography variant="caption" sx={{ color:'text.disabled'}}><i>{period?.description}</i></Typography>
                </Box>
              </Stack>
              <Grid container spacing={5}>
                <Grid item xs={6} sm={6} >
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    date Start
                  </Typography>
                  <Typography variant="body2">{fDate(period?.dateStart)}</Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    Date End
                  </Typography>
                  <Typography variant="body2">{fDate(period?.dateEnd)}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            </Card>
        </Stack>
        </Grid>
        
      // </Grid>
    // </FormProvider>
    );
  }
