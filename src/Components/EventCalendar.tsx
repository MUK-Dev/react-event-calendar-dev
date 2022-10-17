import React, { useEffect, useState } from 'react';
import moment from 'moment';

const EventCalendar = () => {
  const [date, setDate] = useState(moment());
  const [daysGrid, setDaysGrid] = useState<number[]>([]);

  useEffect(() => {
    getMonthDaysGrid();
  }, [date]);

  const getWeekDays = () => {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return weekDays;
  };

  const getMonthDaysGrid = () => {
    const firstDayofMonth = date.clone().startOf('month');
    const totalLastMonthFinalDays =
      firstDayofMonth.days() - 1 < 0 ? 6 : firstDayofMonth.days() - 1;
    const totalDays = date.daysInMonth() + totalLastMonthFinalDays;
    const monthList: number[] = Array.from({ length: totalDays });
    let d = 1;

    for (let i = totalLastMonthFinalDays; i < totalDays; i++) {
      monthList[i] = d;
      d++;
    }

    setDaysGrid(monthList);
  };

  const changeMonth = (action: string) => {
    if (action === 'add') {
      setDate((prevDate) => prevDate.clone().add(1, 'months'));
    } else if (action === 'subtract') {
      setDate((prevDate) => prevDate.clone().subtract(1, 'months'));
    }
  };

  return (
    <div>
      <div>
        <div>
          <button
            type='button'
            aria-label='previous month'
            onClick={() => changeMonth('subtract')}
          ></button>
          <h4 tabIndex={0} aria-label='current month'>
            {date.format('MMMM, YYYY')}
          </h4>
          <button
            type='button'
            aria-label='next month'
            onClick={() => changeMonth('add')}
          ></button>
        </div>
        <div>
          {getWeekDays().map((d, i) => (
            <span key={i}>{d.substring(0, 3)}</span>
          ))}
        </div>
        <div>
          {daysGrid?.map((d, i) =>
            d ? <span key={i}>{d}</span> : <span key={i}></span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
