import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

//date-fns
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
} from "date-fns";

const MainCalender = ({ workouts }) => {
  const [currnetDate, setCurrentDate] = useState(new Date()); //현재 날짜
  const monthStart = startOfMonth(currnetDate); //현재 달의 시작 날짜
  const monthEnd = endOfMonth(currnetDate); // 현재 달의 마지막 날짜
  const startDate = startOfWeek(monthStart); // 현재 달의 시작 날짜가 포함된 주의 시작 날짜
  const endDate = endOfWeek(monthEnd); // 현재 달의 마지막 날짜가 포함된 주의 끝 날짜
  const weekMock = ["일", "월", "화", "수", "목", "금", "토"]; // 요일 그리기

  const nextMonthHandler = useCallback(() => { //현재 달에서 한달 더하기
    setCurrentDate(addMonths(currnetDate, 1));
  }, [currnetDate]);

  const preMonthHandler = useCallback(() => { //현재 달에서 한달 빼기
    setCurrentDate(subMonths(currnetDate, 1));
  }, [currnetDate]);

  const createMonth = useMemo(() => {
    const monthArray = []; //빈배열
    let day = startDate;   //현재 달의 시작일이 속해 있는 주의 시작일을 시작으로
    while (differenceInCalendarDays(endDate, day) >= 0) {
      monthArray.push(day);
      day = addDays(day, 1); //현재 달의 마지막 일이 속해 있는 주의 마지막 일가지 하루씩 더해주며 배열에 넣기
    } return monthArray;
  }, [startDate, endDate]);

  return (
    <section className='calender'>
      <div className='year-title'>{format(currnetDate, "yyyy년")}</div>
      <div className='month-title'>
        <button className='pre-button' onClick={preMonthHandler}>
          {'<'}
        </button>
        <div className='month'>{format(currnetDate, "M월")}</div>
        <button className='next-button' onClick={nextMonthHandler}>
          {'>'}
        </button>
      </div>
      <div className='day-container'>
        {weekMock.map((v, i) => {
          let style;
          if (i === 0) {
            style = {
              color: 'red',
            };
          }
          return (
            <div key={`day${i}`} style={style}>
              {v}
            </div>
          )
        })}
      </div>
      <div className='date-container'>
        {createMonth.map((v, i) => {
          let style;
          const validation = getMonth(currnetDate) === getMonth(v); // 이 날짜의 데이터가 현재 달과 같은지 확인
          const today = format(new Date(), "yyyyMMdd") === format(v, "yyyyMMdd"); // 이 데이터가 오늘인지 확인
          if (validation && isSunday(v)) {
            style = {
              color: "red",
            };
          }
          return (
            <Link to={`/${format(v, 'yyyy-MM-dd')}`} key={`date${i}`}>
              <div
                key={`date${i}`}
                className={validation ? 'current-month' : 'diff-month'}
                style={style}
              >
                <div className='topline'>
                  <span className='day'>{format(v, "d")}</span>
                  {today && <span className='today'>(오늘)</span>}
                  {workouts.find((w) => w.date === format(v, 'yyyy-MM-dd')) && <span className='completed'>오운완</span>}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )

}

export default MainCalender;