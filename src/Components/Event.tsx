import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Close } from '@mui/icons-material';
import {
  AppBar,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC, useState } from 'react';

interface Props {
  color?: string;
  i: number;
  content: ReactJSXElement;
  title?: string;
}

const Event: FC<Props> = ({ color, i, content, title }) => {
  const [showDialog, setShowDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Typography
        variant='caption'
        component='div'
        onClick={() => setShowDialog((prev) => !prev)}
        sx={{
          marginY: '0.1rem',
          backgroundColor: color ?? theme.palette.primary.main,
          color: theme.palette.getContrastText(
            color ?? theme.palette.primary.main
          ),
          cursor: 'pointer',
          borderRadius: '5px',
        }}
      >
        {i + 1}
      </Typography>
      <Dialog
        fullScreen={fullScreen}
        open={showDialog}
        onClose={() => setShowDialog((prev) => !prev)}
      >
        <AppBar
          sx={{
            position: 'relative',
            backgroundColor: color,
            color: theme.palette.getContrastText(
              color ?? theme.palette.primary.main
            ),
          }}
        >
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={() => setShowDialog((prev) => !prev)}
              aria-label='close'
            >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>

        <Divider light />
        {content}
      </Dialog>
    </Grid>
  );
};

export default Event;
