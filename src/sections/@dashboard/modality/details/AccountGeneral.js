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

// ----------------------------------------------------------------------
AccountGeneral.propTypes = {
  modality: PropTypes.object
};

export default function AccountGeneral({modality}) {


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
            <CardHeader title="Modality information"/>
            <CardContent>
              <Stack spacing={5} alignItems="flex-start">
                <Box sx={{ mb: 5 }}>
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    Name Modality
                  </Typography>
                  <Typography variant="body2">{modality?.name_modality}</Typography>
                  <Typography variant="caption" sx={{ color:'text.disabled'}}><i>{modality?.description}</i></Typography>
                </Box>
              </Stack>
              <Grid container spacing={5}>
                <Grid item xs={6} sm={6} >
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    Rif
                  </Typography>
                  <Typography variant="body2">{modality?.rif}</Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    direccion
                  </Typography>
                  <Typography variant="body2">{modality?.address}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            </Card>

            <Card >
              <CardHeader title="Modality benefits" />
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={6} sm={6}>
                    <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                      Inscription
                    </Typography>
                    <Typography variant="body2">{modality?.inscription}%</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                      Monthly payments
                    </Typography>
                    <Typography variant="body2">{modality?.monthly_payment}%</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card >
              <CardHeader title="Modality contact" />
              
            <CardContent>

            {/* <Box  sx={{ mb: 5 }}> */}
              {/* <Divider textAlign='left' sx={{ borderStyle: 'dashed', mb: 5 }}> */}
                {/* <Typography variant='h6'> INFORMACION DE CONTACTO</Typography> */}
              {/* </Divider> */}
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    nombre de contacto
                  </Typography>
                  <Typography variant="body2">{modality?.given_by}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    Email de contacto
                  </Typography>
                  <Typography variant="body2">{modality?.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    numero de contacto
                  </Typography>
                  <Typography variant="body2">{modality?.phoneNumber_1}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    numero de contacto 2
                  </Typography>
                  <Typography variant="body2">{modality?.phoneNumber_2}</Typography>
                </Grid>
              </Grid>
        </CardContent>
            {/* </Box> */}
          </Card>
        </Stack>
        </Grid>
        
      // </Grid>
    // </FormProvider>
    );
  }