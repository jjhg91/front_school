import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Container, Tab, Tabs, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
// sections
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountChangePassword,
} from '../../sections/@dashboard/speciality/details';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getSpeciality } from '../../redux/slices/speciality';

// ----------------------------------------------------------------------

export default function SpecialityDetailsPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { speciality } = useSelector((state) => state.speciality);

  const { themeStretch } = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('general');

  const TABS = [
    {
      value: 'general',
      label: 'General',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <AccountGeneral speciality={speciality}/>,
    },
    {
      value: 'billing',
      label: 'Billing',
      icon: <Iconify icon="ic:round-receipt" />,
      component: (
        <AccountBilling
          cards={_userPayment}
          addressBook={_userAddressBook}
          invoices={_userInvoices}
        />
      ),
    },
    {
      value: 'notifications',
      label: 'Notifications',
      icon: <Iconify icon="eva:bell-fill" />,
      component: <AccountNotifications />,
    },
    {
      value: 'social_links',
      label: 'Social links',
      icon: <Iconify icon="eva:share-fill" />,
      component: <AccountSocialLinks socialLinks={_userAbout.socialLinks} />,
    },
    {
      value: 'change_password',
      label: 'Change password',
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <AccountChangePassword />,
    },
  ];

  useEffect(() => {
    dispatch(getSpeciality(id));
  }, [dispatch,id]);

  return (
    <>
      <Helmet>
        <title> Speciality: View | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Speciality Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'specialitys', href: PATH_DASHBOARD.speciality.root },
            { name: 'Detail' },
          ]}
        />

        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 5 }}>
                {tab.component}
              </Box>
            )
        )}
      </Container>
    </>
  );
}
