import PropTypes from 'prop-types';
import { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Stack,
  Button,
  Dialog,
  Tooltip,
  IconButton,
  DialogActions,
  CircularProgress,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/iconify';
//
// import ProfilePDF from './ProfilePDF';

// ----------------------------------------------------------------------

ProfileToolbar.propTypes = {
  student: PropTypes.object,
};

export default function ProfileToolbar({ student }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePreEnrollment = () => {
    navigate(PATH_DASHBOARD.preEnrollment.new(student.id_student));
  };

  return (
    <>
      <Stack
        // spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        sx={{ mt: -5 }}
      >
        <Stack direction="row" spacing={1}>
          <Tooltip title="Generar inscripcion">
            <IconButton onClick={handlePreEnrollment}>
              <Iconify icon="eva:file-add-outline" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Asociar representantes">
            <IconButton onClick={handleOpen}>
              <Iconify icon="eva:people-outline" />
            </IconButton>
          </Tooltip>

          {/* <PDFDownloadLink
            document={<ProfilePDF student={student} />}
            fileName={student.studentNumber}
            style={{ textDecoration: 'none' }}
          >
            {({ loading }) => (
              <Tooltip title="Download">
                <IconButton>
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <Iconify icon="eva:download-fill" />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </PDFDownloadLink> */}

          <Tooltip title="Productos y servicios">
            <IconButton>
              <Iconify icon="eva:shopping-cart-outline" />
            </IconButton>
          </Tooltip>

          {/* <Tooltip title="Send">
            <IconButton>
              <Iconify icon="ic:round-send" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Share">
            <IconButton>
              <Iconify icon="eva:share-fill" />
            </IconButton>
          </Tooltip> */}
        </Stack>
{/* 
        <Button
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="eva:checkmark-fill" />}
          sx={{ alignSelf: 'flex-end' }}
        >
          Mark as Paid
        </Button> */}
      </Stack>

      {/* <Dialog fullScreen open={open}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={handleClose}>
                <Iconify icon="eva:close-fill" />
              </IconButton>
            </Tooltip>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <ProfilePDF student={student} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog> */}
    </>
  );
}
