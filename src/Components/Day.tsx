import React, { FC } from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import moment from 'moment';

import { DaysGrid } from './types';

interface Props {
  i: number;
  daysGridLength: number;
  item: DaysGrid;
}

const Day: FC<Props> = ({ i, daysGridLength, item }) => {
  const theme = useTheme();

  const getWeekDays = () => [
    'MON.',
    'TUE.',
    'WED.',
    'THU.',
    'FRI.',
    'SAT.',
    'SUN.',
  ];

  const weekDays = getWeekDays();

  return (
    <Grid
      item
      width={`${100 / 7}%`}
      borderTop='none'
      borderRight='none'
      borderBottom={() => {
        if (!(i > 7 * Math.floor(daysGridLength / 7) - 1))
          return '1px solid rgb(0, 0, 0, 0.12)';
      }}
      borderLeft={() => {
        if (i % 7 !== 0) return '1px solid rgb(0, 0, 0, 0.12)';
      }}
      key={i}
      textAlign='center'
      height='8rem'
    >
      {i < 7 && (
        <>
          <Typography variant='caption' gutterBottom color='rgb(0, 0, 0, 0.8)'>
            {weekDays[i]}
          </Typography>
          <br />
        </>
      )}

      <Typography
        variant='caption'
        color={theme.palette.getContrastText(
          item?.date && moment().isSame(item?.date, 'day')
            ? theme.palette.primary.main
            : '#FFF'
        )}
        sx={{
          backgroundColor:
            item?.date && moment().isSame(item?.date, 'day')
              ? theme.palette.primary.main
              : 'transparent',
          borderRadius: '50%',
          padding: '0.5em',
        }}
      >
        {item.no}
      </Typography>
    </Grid>
  );
};

export default Day;
