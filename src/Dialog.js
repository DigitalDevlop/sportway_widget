import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import App from './App';

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(true); // Main dialog state
  const [noAccessOpen, setNoAccessOpen] = React.useState(false); // Second dialog state
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  const handleNoClick = () => {
    setOpen(false); // Close the main dialog
    setNoAccessOpen(true); // Open the "No Access" dialog
  };

  const handleNoAccessClose = () => {
    setNoAccessOpen(false); // Close the "No Access" dialog
  };

  return (
    <React.Fragment>
      <App />
      <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={(_, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          handleClose();
        }
      }}
      disableEscapeKeyDown
      aria-labelledby="responsive-dialog-title"
    >
      
        <DialogTitle id="responsive-dialog-title">
          {"Sportway Legal to play"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you 18+ years old?
          </DialogContentText>
          <DialogContentText>
            நீங்கள் 18 வயதிற்கு மேற்பட்டவரா?
          </DialogContentText>
          <DialogContentText>
            ඔබ වයස අවුරුදු 18 ට වැඩිද?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleNoClick}>
            NO
          </Button>
          <Button onClick={handleClose} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={noAccessOpen}
        onClose={handleNoAccessClose}
        aria-labelledby="no-access-dialog-title"
      >
        <DialogTitle id="no-access-dialog-title">
          {"Access Denied"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You must be 18 or older to access this site.
            <br/>
            இந்த வலைத்தளத்தை அணுக நீங்கள் 18 வயதிற்கு மேற்பட்டவராக இருக்க வேண்டும்.
            <br/>
            මෙම වෙබ් අඩවියට පිවිසීමට ඔබ වයස අවුරුදු 18 හෝ වැඩි විය යුතුය.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleNoAccessClose} autoFocus>
            OK
          </Button> */}
          <Button as="a" href="https://www.sportwaynews.com/">YES</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
