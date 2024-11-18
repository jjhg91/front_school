import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack, Button } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// _mock_
import {
  _appFeatured,
  _appAuthors,
  _appInstalled,
  _appRelated,
  _appInvoices,
} from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import {
  AppWidget,
  AppWelcome,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
//
import {
  FileGeneralDataActivity
} from '../../sections/@dashboard/general/file';
// sections
import {
  BookingRoomAvailable,
  BookingWidgetSummary
} from '../../sections/@dashboard/general/booking';
// assets
import {
  SeoIllustration,
  BookingIllustration,
  CheckInIllustration,
  CheckOutIllustration, } from '../../assets/illustrations';

// ----------------------------------------------------------------------
const TIME_LABELS = {
  week: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  year: ['2018', '2019', '2020', '2021', '2022'],
};


export default function GeneralAppPage() {
  const { user } = useAuthContext();

  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Dashboard: Inicio | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <AppWelcome
              title={`¡Bienvenido de nuevo! \n ${user?.first_name} ${user?.first_surname}`}
              description="Nos alegra verte de vuelta. Aquí tienes acceso a tus datos más importantes, presentados de manera clara y concisa para que puedas tomar decisiones estratégicas con confianza. Explora las tendencias, analiza el rendimiento y descubre nuevas oportunidades para impulsar tu éxito. ¡Estamos aquí para apoyarte en cada paso del camino!"
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              // action={<Button variant="contained">Go Now</Button>}
            />
          </Grid>

          {/* <Grid item xs={12} md={4}>
            <AppFeatured list={_appFeatured} />
          </Grid> */}

          <Grid item xs={12} md={4}>
             <BookingWidgetSummary
              title="Total Profesores Activos"
              total={714000}
              icon={<BookingIllustration />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title="Total Estudiantes Activos"
              total={714000}
              icon={<CheckInIllustration />}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <BookingWidgetSummary
              title="Total Representantes Activos"
              total={714000}
              icon={<CheckOutIllustration />}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <BookingRoomAvailable
              title="Estatus de Facturas"
              chart={{
                series: [
                  { label: 'Sold out', value: 120 },
                  { label: 'Available', value: 66 },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <FileGeneralDataActivity
              title="Facturdos"
              chart={{
                labels: TIME_LABELS,
                colors: [
                  theme.palette.primary.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                  theme.palette.text.disabled,
                ],
                series: [
                  {
                    type: 'Week',
                    data: [
                      { name: 'Inscripciones', data: [20, 34, 48, 65, 37, 48] },
                      { name: 'Mensualidades', data: [10, 34, 13, 26, 27, 28] },
                      { name: 'Constancias de estudio', data: [10, 14, 13, 16, 17, 18] },
                      { name: 'Notas Certificadas', data: [5, 12, 6, 7, 8, 9] },
                    ],
                  },
                  {
                    type: 'Month',
                    data: [
                      { name: 'Inscripciones', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                      { name: 'Mensualidades', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                      { name: 'Constancias de estudio', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                      { name: 'Notas Certificadas', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                    ],
                  },
                  {
                    type: 'Year',
                    data: [
                      { name: 'Inscripciones', data: [10, 34, 13, 56, 77] },
                      { name: 'Mensualidades', data: [10, 34, 13, 56, 77] },
                      { name: 'Constancias de estudio', data: [10, 34, 13, 56, 77] },
                      { name: 'Notas Certificadas', data: [10, 34, 13, 56, 77] },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} lg={8}>
            <AppNewInvoice
              title="New Invoice"
              tableData={_appInvoices}
              tableLabels={[
                { id: 'id', label: 'Invoice ID' },
                { id: 'category', label: 'Category' },
                { id: 'price', label: 'Price' },
                { id: 'status', label: 'Status' },
                { id: '' },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated title="Top Related Applications" list={_appRelated} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries title="Top Installed Countries" list={_appInstalled} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors title="Top Authors" list={_appAuthors} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget
                title="Conversion"
                total={38566}
                icon="eva:person-fill"
                chart={{
                  series: 48,
                }}
              />

              <AppWidget
                title="Applications"
                total={55566}
                icon="eva:email-fill"
                color="info"
                chart={{
                  series: 75,
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
