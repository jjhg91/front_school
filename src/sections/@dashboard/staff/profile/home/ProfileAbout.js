import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Typography, CardHeader, Stack } from '@mui/material';
// components
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  company: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string,
  quote: PropTypes.string,
  role: PropTypes.string,
  school: PropTypes.string,
  user: PropTypes.object,
};

export default function ProfileAbout({ quote, country, email, role, company, school, user}) {
  return (
    <Card>
      <CardHeader title="Personal Information" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{quote}</Typography>

        <Stack direction="row">
          <StyledIcon icon="eva:credit-card-fill" />
          <Typography variant="body2">{user?.cedula}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:file-remove-fill" />
          <Typography variant="body2">{user?.first_name} {user?.second_name}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:file-text-fill" />
          <Typography variant="body2">{user?.first_surname} {user?.second_surname}</Typography>
        </Stack>


        <Stack direction="row">
          <StyledIcon icon="eva:calendar-fill" />
          <Typography variant="body2">{user?.birth_date}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:map-fill" />
          <Typography variant="body2">{user?.nacionalidad}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:people-fill" />
          <Typography variant="body2">{user?.gender}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:round-business-center" />
          <Typography variant="body2">{user?.marital_status}</Typography>
        </Stack>

      </Stack>
    </Card>
  );
}
