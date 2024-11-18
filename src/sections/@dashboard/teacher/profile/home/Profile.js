import PropTypes from 'prop-types';
// @mui
import { Grid, Stack } from '@mui/material';
//
import ProfileAbout from './ProfileAbout';
import ProfilePostCard from './ProfilePostCard';
import ProfilePostInput from './ProfilePostInput';
import ProfileFollowInfo from './ProfileFollowInfo';
import ProfileSocialInfo from './ProfileSocialInfo';

// ----------------------------------------------------------------------

Profile.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,
  teacher: PropTypes.object
};

export default function Profile({ info, posts, teacher }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          {/* <ProfileFollowInfo follower={info.follower} following={info.following} /> */}

          <ProfileAbout
            // quote={info.quote}
            // country={info.country}
            // email={info.email}
            // role={info.role}
            // company={info.company}
            // school={info.school}
            // teacher={teacher}
            names={`${teacher?.User?.first_name} ${teacher?.User?.second_name}`}
            surnames={ `${teacher?.User?.first_surname} ${teacher?.User?.second_surname}` }
            cedula={teacher?.User?.cedula}
            birthDate={teacher?.User?.birth_date}
            nacionality={teacher?.User?.nacionalidad}
            gender={teacher?.User?.gender}
            statusMarital={teacher?.User?.marital_status}
            role={teacher?.User?.role}
          />

          <ProfileSocialInfo
            address={teacher?.User?.address}
            email={teacher?.User?.email}
            phoneNumber1={teacher?.User?.phoneNumber_1}
            phoneNumber2={teacher?.User?.phoneNumber_1}
          />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <ProfilePostInput />

          {posts.map((post) => (
            <ProfilePostCard key={post.id} post={post} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
