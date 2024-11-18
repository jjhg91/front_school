import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
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
  names: PropTypes.string,
  surnames: PropTypes.string,
  cedula: PropTypes.string,
  birthDate: PropTypes.string,
  nacionality: PropTypes.string,
  gender: PropTypes.object,
  statusMarital: PropTypes.object,
  role: PropTypes.string,
};

export default function ProfileAbout({ names, surnames, cedula, birthDate, nacionality, gender, statusMarital, role}) {
  dayjs.extend(utc);
  return (
    <Card>
      <CardHeader title="Informacion Personal" />

      <Stack spacing={2} sx={{ p: 3 }}>
        {/* <Typography variant="body2">{quote}</Typography> */}

      

        <Stack direction="row">
          <StyledIcon icon="eva:file-remove-fill" />
          <Typography variant="body2">{names}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:file-text-fill" />
          <Typography variant="body2">{surnames}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:credit-card-fill" />
          <Typography variant="body2">{cedula}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:calendar-fill" />
          <Typography variant="body2">{ dayjs.utc(birthDate).format('DD/MM/YYYY')}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:map-fill" />
          <Typography variant="body2">{nacionality}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:people-fill" />
          <Typography variant="body2">{gender}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:round-business-center" />
          <Typography variant="body2">{statusMarital}</Typography>
        </Stack>

      </Stack>
    </Card>
  );
}
