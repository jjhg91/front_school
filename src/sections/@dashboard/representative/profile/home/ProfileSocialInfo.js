import PropTypes from 'prop-types';
// @mui
import { Link, Card, CardHeader, Stack, Typography } from '@mui/material';
// _mock
import { _socials } from '../../../../../_mock/arrays';
// components
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

ProfileSocialInfo.propTypes = {
  socialLinks: PropTypes.shape({
    facebookLink: PropTypes.string,
    instagramLink: PropTypes.string,
    linkedinLink: PropTypes.string,
    twitterLink: PropTypes.string,
  }),
  user: PropTypes.object,
};

export default function ProfileSocialInfo({ socialLinks, user }) {
  const { facebookLink, instagramLink, linkedinLink, twitterLink } = socialLinks;
 

  return (
    <Card>
      <CardHeader title="Contact" />

      <Stack spacing={2} sx={{ p: 3 }}>
      
      {/* ----------------------------- */}
      
      <Stack direction="row">
          <Iconify
              icon="eva:pin-fill"
              sx={{
                mr: 2,
                flexShrink: 0,
                // color: link.color,
              }}
            />
          <Typography variant="body2">
            Live at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {user?.address}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <Iconify
              icon="eva:email-fill"
              sx={{
                mr: 2,
                flexShrink: 0,
                // color: link.color,
              }}
            />
          <Typography variant="body2">{user?.email}</Typography>
        </Stack>
        <Stack direction="row">
          <Iconify
              icon="eva:smartphone-fill"
              sx={{
                mr: 2,
                flexShrink: 0,
                // color: link.color,
              }}
            />
          <Typography variant="body2">{user?.phoneNumber_1}</Typography>
        </Stack>
        <Stack direction="row">
          <Iconify
              icon="eva:phone-fill"
              sx={{
                mr: 2,
                flexShrink: 0,
                // color: link.color,
              }}
            />
          <Typography variant="body2">{!user?.phoneNumber_2 ? 'Sin numero de telefono alternativo' : user?.phoneNumber_2}</Typography>
        </Stack>
      {/* ------------------------------ */}
{/* 
        {_socials.map((link) => (
          <Stack key={link.name} direction="row" sx={{ wordBreak: 'break-all' }}>
            <Iconify
              icon={link.icon}
              sx={{
                mr: 2,
                flexShrink: 0,
                color: link.color,
              }}
            />
            <Link component="span" variant="body2" color="text.primary">
              {(link.value === 'facebook' && facebookLink) ||
                (link.value === 'instagram' && instagramLink) ||
                (link.value === 'linkedin' && linkedinLink) ||
                twitterLink}
            </Link>
          </Stack>
        ))} */}
      </Stack>
    </Card>
  );
}
