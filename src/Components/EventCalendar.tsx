import { createContext, FC, useState } from 'react';
import { Paper, Grid, ThemeProvider, createTheme } from '@mui/material';
import { EventsData, Pallet } from './types';
import Day from './Day';
import ExtraDays from './ExtraDays';
import useEventCalendar from './useEventCalendar';
import Controls from './Controls';

interface Props {
  readonly?: boolean;
  pallet?: Pallet;
  elevation?: number;
  width?: number | string;
  dataSource?: EventsData;
  onDataChange?: (events: EventsData) => void;
  showEventPopup?: boolean;
}

export type CalendarContext = {
  readonly?: boolean;
  data?: EventsData;
  setData?: React.Dispatch<React.SetStateAction<EventsData | undefined>>;
  onDataChange?: (events: EventsData) => void;
  showEventPopup?: boolean;
} | null;

export const EventCalendarContext = createContext<CalendarContext>(null);

const EventCalendar: FC<Props> = ({
  readonly = false,
  pallet,
  elevation = 0,
  width = '90%',
  dataSource,
  onDataChange,
  showEventPopup = true,
}) => {
  const { changeMonth, date, daysGrid } = useEventCalendar();
  const [data, setData] = useState(dataSource);
  const theme = createTheme({
    palette: {
      primary: {
        main: pallet?.primary ?? '#1976d2',
      },
      secondary: {
        main: pallet?.secondary ?? '#9c27b0',
      },
      divider: pallet?.primary,
    },
  });

  return (
    <EventCalendarContext.Provider
      value={{
        readonly,
        data,
        setData,
        onDataChange,
        showEventPopup,
      }}
    >
      <ThemeProvider theme={theme}>
        <Paper
          sx={{ width, border: '1px solid rgba(0, 0, 0, 0.12)' }}
          elevation={elevation}
        >
          <Controls changeMonth={changeMonth} date={date} />
          <Grid container>
            {daysGrid?.map((item, i) =>
              item?.no ? (
                <Day
                  daysGridLength={daysGrid.length}
                  i={i}
                  item={item}
                  key={i}
                  events={data?.filter((d) => item.date.isSame(d?.date, 'day'))}
                />
              ) : (
                <ExtraDays daysGridLength={daysGrid.length} i={i} key={i} />
              )
            )}
          </Grid>
        </Paper>
      </ThemeProvider>
    </EventCalendarContext.Provider>
  );
};

export default EventCalendar;
