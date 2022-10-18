import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { IconButton, Stack, Typography, Paper, Grid } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const EventCalendar = () => {
  const [date, setDate] = useState(moment());
  const [daysGrid, setDaysGrid] = useState<number[]>([]);

  const d = useMemo(() => date, [date]);

  useEffect(() => {
    getMonthDaysGrid();
  }, [d]);

  const getWeekDays = () => {
    const weekDays = ['MON.', 'TUE.', 'WED.', 'THU.', 'FRI.', 'SAT.', 'SUN.'];

    return weekDays;
  };

  const getMonthDaysGrid = () => {
    let totalNextMonthStartDays: number;
    const firstDayofMonth = d.clone().startOf('month');
    const lastDayofMonth = d.clone().endOf('month');
    const totalLastMonthFinalDays =
      firstDayofMonth.days() - 1 < 0 ? 6 : firstDayofMonth.days() - 1;
    if (lastDayofMonth.days() === 1) totalNextMonthStartDays = 6;
    else if (lastDayofMonth.days() === 2) totalNextMonthStartDays = 5;
    else if (lastDayofMonth.days() === 3) totalNextMonthStartDays = 4;
    else if (lastDayofMonth.days() === 4) totalNextMonthStartDays = 3;
    else if (lastDayofMonth.days() === 5) totalNextMonthStartDays = 2;
    else if (lastDayofMonth.days() === 6) totalNextMonthStartDays = 1;
    else totalNextMonthStartDays = 0;

    const totalDays =
      d.daysInMonth() + totalLastMonthFinalDays + totalNextMonthStartDays;
    const monthList: number[] = Array.from({ length: totalDays });
    let counter = 1;

    for (let i = totalLastMonthFinalDays; i < totalDays; i++) {
      if (i < totalDays - totalNextMonthStartDays) monthList[i] = counter;

      counter++;
    }

    setDaysGrid(monthList);
  };

  const changeMonth = (action: string) => {
    if (action === 'add') {
      setDate((prevd) => prevd.clone().add(1, 'months'));
    } else if (action === 'subtract') {
      setDate((prevd) => prevd.clone().subtract(1, 'months'));
    }
  };

  const weekDays = getWeekDays();

  return (
    <Paper
      sx={{ width: '90%', border: '1px solid rgba(0, 0, 0, 0.12)' }}
      elevation={0}
    >
      <Stack
        direction='row'
        alignItems='center'
        padding='0.5em 1em'
        borderBottom='1px solid rgba(0, 0, 0, 0.12)'
      >
        <IconButton
          aria-label='previous month'
          onClick={() => changeMonth('subtract')}
          size='small'
        >
          <ArrowBackIos />
        </IconButton>
        <Typography variant='body1' aria-label='current month'>
          {d.format('MMMM, YYYY')}
        </Typography>
        <IconButton
          aria-label='next month'
          onClick={() => changeMonth('add')}
          size='small'
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Grid container>
        {daysGrid?.map((d, i) =>
          d ? (
            <Grid
              item
              width={`${100 / 7}%`}
              borderTop='none'
              borderRight='none'
              borderBottom={() => {
                if (!(i > 7 * Math.floor(daysGrid.length / 7) - 1))
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
                  <Typography
                    variant='caption'
                    gutterBottom
                    color='rgb(0, 0, 0, 0.8)'
                  >
                    {weekDays[i]}
                  </Typography>
                  <br />
                </>
              )}
              <Typography variant='caption' color='rgb(0, 0, 0, 0.8)'>
                {d}
              </Typography>
            </Grid>
          ) : (
            <Grid
              height='8rem'
              item
              textAlign='center'
              width={`${100 / 7}%`}
              borderTop='none'
              borderRight='none'
              borderBottom={() => {
                if (!(i > 7 * Math.floor(daysGrid.length / 7) - 1))
                  return '1px solid rgb(0, 0, 0, 0.12)';
              }}
              borderLeft={() => {
                if (i % 7 !== 0) return '1px solid rgb(0, 0, 0, 0.12)';
              }}
              key={i}
            >
              {i < 7 && (
                <Typography
                  variant='caption'
                  gutterBottom
                  color='rgb(0, 0, 0, 0.4)'
                >
                  {weekDays[i]}
                </Typography>
              )}
            </Grid>
          )
        )}
      </Grid>
    </Paper>
  );
};

export default EventCalendar;
