import React, { useMemo, useCallback } from "react";
import moment from "moment";
import { FlatList, View, ActivityIndicator } from "react-native";
// components
import Month from "./Month";
// data
import { getMonths } from "./utils/data";
// types
import { Month_Type } from "./utils/data";
import { LOCALE_TYPE } from "./utils/locale";
import { Style } from "./index";

interface Props {
  pastYearRange: number;
  futureYearRange: number;
  initialNumToRender: number;
  locale: LOCALE_TYPE;
  handlePress: (date: string) => void;
  startDate: string | null;
  endDate: string | null;
  style?: Style;
  flatListProps?: any;
  isMonthFirst?: boolean;
  disabledBefore?: Date;
  disabledAfter?: Date;
}

const LAYOUT_HEIGHT = 370;
const CalendarList = ({
  pastYearRange,
  futureYearRange,
  initialNumToRender,
  locale,
  handlePress,
  startDate,
  endDate,
  flatListProps,
  isMonthFirst,
  disabledBefore,
  disabledAfter,
  style,
}: Props) => {
  const months: Month_Type[] = useMemo(
    () => getMonths(pastYearRange, futureYearRange),
    [pastYearRange, futureYearRange]
  );

  const getInitialIndex = useCallback(() => {
    return months.findIndex((month: Month_Type) => {
      const targetDate = startDate ? moment(startDate) : moment();
      return month.id === targetDate.format("YYYY-MM");
    });
  }, []);

  const handleRenderItem = useCallback(
    ({ item }: any) => (
      <View style={{ height: LAYOUT_HEIGHT }}>
        <Month
          item={item}
          locale={locale}
          handlePress={handlePress}
          startDate={startDate}
          endDate={endDate}
          isMonthFirst={isMonthFirst}
          disabledBefore={disabledBefore}
          disabledAfter={disabledAfter}
          style={style}
        />
      </View>
    ),
    [locale.today, startDate, endDate]
  );

  return (
    <View
      style={[
        { position: "relative", backgroundColor: "#fff" },
        style?.container,
      ]}
    >
      <View
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
      <FlatList
        keyExtractor={(item: Month_Type) => item.id}
        data={months}
        renderItem={handleRenderItem}
        getItemLayout={(_, index) => ({
          length: LAYOUT_HEIGHT,
          offset: LAYOUT_HEIGHT * index,
          index,
        })}
        initialScrollIndex={getInitialIndex()}
        initialNumToRender={initialNumToRender}
        {...flatListProps}
      />
    </View>
  );
};

export default CalendarList;
