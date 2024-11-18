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
  student: PropTypes.object
};

export default function Profile({ info, posts, student }) {
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
            // student={student}
            names={`${student?.User?.first_name} ${student?.User?.second_name}`}
            surnames={ `${student?.User?.first_surname} ${student?.User?.second_surname}` }
            cedula={student?.User?.cedula}
            birthDate={student?.User?.birth_date}
            nacionality={student?.User?.nacionalidad}
            gender={student?.User?.gender}
            statusMarital={student?.User?.marital_status}
            role={student?.User?.role}
          />

          <ProfileSocialInfo
            address={student?.User?.address}
            email={student?.User?.email}
            phoneNumber1={student?.User?.phoneNumber_1}
            phoneNumber2={student?.User?.phoneNumber_1}
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
