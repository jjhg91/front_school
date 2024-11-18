import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

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
import { getInvoiceStudent } from '../../../../../redux/slices/invoice';

// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// ----------------------------------------------------------------------

ProfileInvoice.propTypes = {
  currentStudentId: PropTypes.string,
  onEditRow: PropTypes.func
};

export default function ProfileInvoice({ currentStudentId,onEditRow }) {
  dayjs.extend(utc);
  const dispatch = useDispatch();
  const { invoiceStudent, isLoading } = useSelector((state) => state.invoice);
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
    dispatch(getInvoiceStudent(currentStudentId));
  }, [dispatch,currentStudentId]);


  return (
    <>
      {invoiceStudent && invoiceStudent.map(invoice=>(
        <Card sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
            <Typography
              variant="overline"
              sx={{
                flexGrow: 1,
                color: 'text.secondary',
              }}
            >
              ESTATUS: {invoice.isPaid? 'CANCELADA':'VENCIDA'}
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

              <Stack direction="column" sx={{ mb: 3 }}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                  <AccordionSummary
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      NUMERO DE FACTURA: {invoice.id_invoice}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Monto Total: {invoice.totalAmount}</Typography>
                    <Typography sx={{ color: 'text.secondary',ml:5 }}>Fecha: {dayjs.utc(invoice.createdAt).format('DD/MM/YYYY hh:mmA')}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                      {invoice.invoiceItems && invoice.invoiceItems.map(invoiceItem => (
                        <ListItem>
                          <ListItemText
                            primary=  { invoiceItem.ProductService.name }
                            secondary={<>
                                <Typography sx={{ color: 'text.secondary'}}>
                                  Descripcion: {invoiceItem.ProductService.description}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary'}}>
                                  Precio: {invoiceItem.priceHistory.amount}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>

              </Stack>
       

        </Card>
      ))}

    </>
  );
}
