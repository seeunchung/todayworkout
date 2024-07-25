import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  differenceInCalendarDays,
  getMonth,
  isSunday,
  isToday,
} from 'date-fns';

// Workout 타입 정의
interface Workout {
  date: string;
  [key: string]: any; // 추가적인 프로퍼티가 있을 수 있으므로
}

// Props 타입 정의
interface MainCalenderProps {
  workouts: Workout[];
}

const MainCalender: React.FC<MainCalenderProps> = ({ workouts }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // 현재 날짜

  // 현재 달의 시작 및 끝 날짜
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  // 현재 달의 시작 날짜가 포함된 주의 시작 날짜와 끝 날짜
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const weekMock = ["일", "월", "화", "수", "목", "금", "토"]; // 요일 배열

  const nextMonthHandler = useCallback(() => {
    setCurrentDate(addMonths(currentDate, 1));
  }, [currentDate]);

  const preMonthHandler = useCallback(() => {
    setCurrentDate(subMonths(currentDate, 1));
  }, [currentDate]);

  const createMonth = useMemo(() => {
    const monthArray: Date[] = [];
    let day = startDate;
    while (differenceInCalendarDays(endDate, day) >= 0) {
      monthArray.push(day);
      day = addDays(day, 1);
    }
    return monthArray;
  }, [startDate, endDate]);

  return (
    <section className='calender'>
      <div className='year-title'>{format(currentDate, "yyyy년")}</div>
      <div className='month-title'>
        <button className='pre-button' onClick={preMonthHandler}>
          {'<'}
        </button>
        <div className='month'>{format(currentDate, "M월")}</div>
        <button className='next-button' onClick={nextMonthHandler}>
          {'>'}
        </button>
      </div>
      <div className='day-container'>
        {weekMock.map((v, i) => {
          let style: React.CSSProperties | undefined;
          if (i === 0) {
            style = { color: '#F875AA' };
          }
          return (
            <div key={`day${i}`} style={style}>
              {v}
            </div>
          );
        })}
      </div>
      <div className='date-container'>
        {createMonth.map((v, i) => {
          let style: React.CSSProperties | undefined;
          const validation = getMonth(currentDate) === getMonth(v);
          const today = isToday(v);
          if (validation && isSunday(v)) {
            style = { color: "#F875AA" };
          }
          return (
            <Link to={`/${format(v, 'yyyy-MM-dd')}`} key={`date${i}`}>
              <div
                className={validation ? 'current-month' : 'diff-month'}
                style={style}
              >
                <div className='topline'>
                  <span className='day'>{format(v, "d")}</span>
                  {today && <span className='today'>오늘</span>}
                  {workouts.find((w) => w.date === format(v, 'yyyy-MM-dd')) && <span className='completed'>오운완!</span>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default MainCalender;
