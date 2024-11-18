import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import {
  Card,
  Stack,
  Paper,
  Button,
  Typography,
  IconButton,
  MenuItem,
  Divider,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemText
 } from '@mui/material';
// components
import Image from '../../../../../components/image';
import Iconify from '../../../../../components/iconify';
import MenuPopover from '../../../../../components/menu-popover';
// section
import { PaymentNewCardDialog } from '../../../../payment';


// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ----------------------------------------------------------------------

AccountBillingPaymentMethod.propTypes = {
  currentOffering: PropTypes.object,
  onEditRow: PropTypes.func
};

export default function AccountBillingPaymentMethod({ currentOffering,onEditRow }) {
  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };


  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

console.log(currentOffering)

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
          <Typography
            variant="overline"
            sx={{
              flexGrow: 1,
              color: 'text.secondary',
            }}
          >
            {currentOffering.SpecialityRegimen.Speciality.name} -
            {currentOffering.SpecialityRegimen.AcademicRegimen.description}
          </Typography>

          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>

          <MenuPopover
            open={openPopover}
            onClose={handleClosePopover}
            arrow="right-top"
            sx={{ width: 160 }}
          >
            <MenuItem
              onClick={() => {
                onEditRow();
                handleClosePopover();
              }}
            >
              <Iconify icon="eva:edit-fill" />
              Edit
            </MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <MenuItem
              // onClick={() => {
                // handleOpenConfirm();
                // handleClosePopover();
              // }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="eva:trash-2-outline" />
              Delete
            </MenuItem>
          </MenuPopover>
        </Stack>

        <Stack direction="column" sx={{ mb: 3 }}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {currentOffering.SpecialityRegimen.Speciality.name}
              </Typography>
              {/* <Typography sx={{ color: 'text.secondary' }}><small><i>Secciones: </i>A, B, C</small></Typography> */}
            </AccordionSummary>
            <AccordionDetails>
             {/* ------------------ */}
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {currentOffering.CourseOffering.map(element => (
                  <ListItem>
                    <ListItemText
                      primary=  { element.CourseSpecialityRegimen.Course.name }
                      secondary={ element.CourseSection.map(section =>(`${section.sectionName} `)) }
                    />
                  </ListItem>
                ))}
              </List>
             {/* ------------------ */}
            </AccordionDetails>
          </Accordion>

        </Stack>
      </Card>


      {/* <PaymentNewCardDialog open={open} onClose={handleClose} /> */}
    </>
  );
}
