import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
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
  return (
    <Grid item xs={12} md={6}>
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
        }}
      >
        {i + 1}
      </Typography>
      <Dialog open={showDialog} onClose={() => setShowDialog((prev) => !prev)}>
        <DialogTitle padding='0.5rem 1rem !important'>{title}</DialogTitle>
        <Divider light />
        <DialogContent>{content}</DialogContent>
      </Dialog>
    </Grid>
  );
};

export default Event;
