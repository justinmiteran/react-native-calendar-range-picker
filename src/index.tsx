import React, { useState, useRef } from "react";
import moment from "moment";
// components
import CalendarList from "./CalendarList";
// data
import { LOCALE, LOCALE_TYPE } from "./utils/locale";

export interface Style {
  container?: {};
  monthContainer?: {};
  weekContainer?: {};
  monthNameText?: {};
  dayNameText?: {};
  dayText?: {};
  dayTextColor?: string;
  holidayColor?: string;
  todayColor?: string;
  disabledTextColor?: string;
  selectedDayTextColor?: string;
  selectedDayBackgroundColor?: string;
  selectedBetweenDayTextColor?: string;
  selectedBetweenDayBackgroundTextColor?: string;
}
interface onChangeParams {
  startDate: string | null;
  endDate: string | null;
}

interface Props {
  pastYearRange?: number;
  futureYearRange?: number;
  locale?: LOCALE_TYPE;
  startDate?: string;
  endDate?: string;
  onChange: (params: onChangeParams | any) => void;
  style?: Style;
  singleSelectMode?: boolean;
  initialNumToRender?: number;
  flatListProps?: any;
  isMonthFirst?: boolean;
  disabledBefore?: Date;
  disabledAfter?: Date;
}

export default function Index({
  pastYearRange = 1,
  futureYearRange = 2,
  initialNumToRender = 7,
  locale = LOCALE,
  startDate: prevStartDate,
  endDate: prevEndDate,
  onChange,
  style,
  singleSelectMode,
  flatListProps,
  isMonthFirst,
  disabledBefore,
  disabledAfter,
}: Props) {
  const [startDate, setStartDate] = useState(prevStartDate ? prevStartDate : null);
  const [endDate, setEndDate] = useState(prevEndDate ? prevEndDate : null);
  const startDateRef: any = useRef(null);
  const endDateRef: any = useRef(null);

  const handleSetStartDate = (startDate: string) => {
    setStartDate(startDate);
    setEndDate(null);
    startDateRef.current = startDate;
    endDateRef.current = null;
    if (singleSelectMode) {
      onChange(startDate);
    } else {
      onChange({ startDate, endDate: null });
    }
  };

  const handleSetEndDate = (startDate: string, endDate: string) => {
    setEndDate(endDate);
    endDateRef.current = endDate;
    onChange({ startDate, endDate });
  };

  const handlePress = (date: string) => {
    if (singleSelectMode) {
      handleSetStartDate(date);
      return;
    }

    if (!startDateRef.current && !endDateRef.current) {
      handleSetStartDate(date);
      return;
    }

    if (startDateRef.current && endDateRef.current) {
      handleSetStartDate(date);
      return;
    }

    if (startDateRef.current) {
      if (moment(date).isBefore(startDateRef.current)) {
        handleSetStartDate(date);
      } else {
        handleSetEndDate(startDateRef.current, date);
      }
    }
  };

  return (
    <CalendarList
      initialNumToRender={initialNumToRender}
      pastYearRange={pastYearRange}
      futureYearRange={futureYearRange}
      locale={locale}
      handlePress={handlePress}
      startDate={startDate}
      endDate={endDate}
      style={style}
      flatListProps={flatListProps}
      isMonthFirst={isMonthFirst}
      disabledBefore={disabledBefore}
      disabledAfter={disabledAfter}
    />
  );
}
