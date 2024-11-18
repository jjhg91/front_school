import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

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
// import Image from '../../../../../components/image';
import Iconify from '../../../../../components/iconify';
import MenuPopover from '../../../../../components/menu-popover';
// section
// import { PaymentNewCardDialog } from '../../../../payment';
// redux
import { useDispatch, useSelector } from '../../../../../redux/store';
import { getPreEnrollmentStudent } from '../../../../../redux/slices/preEnrollment';

// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ----------------------------------------------------------------------

ProfileInscription.propTypes = {
  currentStudentId: PropTypes.string,
  onEditRow: PropTypes.func
};

export default function ProfileInscription({ currentStudentId,onEditRow }) {
  const dispatch = useDispatch();
  const { preEnrollmentStudent, isLoading } = useSelector((state) => state.preEnrollment);
  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(null);

  const currentOffering = []

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

  useEffect(() => {
    dispatch(getPreEnrollmentStudent(currentStudentId));
  }, [dispatch,currentStudentId]);


  return (
    <>
      {preEnrollmentStudent && preEnrollmentStudent.map(period=>(
        <Card sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
            <Typography
              variant="overline"
              sx={{
                flexGrow: 1,
                color: 'text.secondary',
              }}
            >
              {period.periodName}
            </Typography>
{/* 
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
                onClick={() => {
                  handleOpenConfirm();
                  handleClosePopover();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon="eva:trash-2-outline" />
                Delete
              </MenuItem>
            </MenuPopover> */}
          </Stack>

          {
            period.specialityRegimens && period.specialityRegimens.map( specialityRegimen => (
              <Stack direction="column" sx={{ mb: 3 }}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                  <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      {specialityRegimen.specialityName}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{specialityRegimen.academicRegimenName}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                      {specialityRegimen.courseSections && specialityRegimen.courseSections.map(courseSection => (
                        <ListItem>
                          <ListItemText
                            primary=  { courseSection.courseName }
                            secondary={ `Seccion: ${courseSection.sectionName}` }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>

              </Stack>
            ))
          }
         
        </Card> 
      ))}
      
     


    </>
  );
}
