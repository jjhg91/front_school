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
                <Box>
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                    Name Modality
                  </Typography>
                  <Typography variant="body2">{modality?.name_modality}</Typography>
                </Box>
                <Box>
                  <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                  Description
                  </Typography>
                  <Typography variant="body2">{modality?.description}</Typography>
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
