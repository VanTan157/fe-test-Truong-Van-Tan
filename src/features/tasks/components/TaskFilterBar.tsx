/* eslint-disable react-hooks/set-state-in-effect */
import { Button, DatePicker, Input, Select, Space } from "antd";
import debounce from "lodash.debounce";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { resetFilters, setFilter } from "../tasksSlice";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../constants";

const { RangePicker } = DatePicker;

function TaskFilterBar() {
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.tasks.filters);

  const [searchText, setSearchText] = useState(filters.searchText);

  useEffect(() => {
    setSearchText(filters.searchText);
  }, [filters.searchText]);

  const debounceSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(
          setFilter({
            searchText: value,
          }),
        );
      }, 300),
    [dispatch],
  );

  return (
    <Space wrap>
      <Input.Search
        placeholder="Search task"
        allowClear
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          debounceSearch(e.target.value);
        }}
      />

      <Select
        mode="multiple"
        placeholder="Status"
        className="min-w-[180px]"
        options={STATUS_OPTIONS}
        value={filters.status}
        onChange={(value) =>
          dispatch(
            setFilter({
              status: value,
            }),
          )
        }
      />

      <Select
        allowClear
        placeholder="Priority"
        className="min-w-[180px]"
        options={PRIORITY_OPTIONS}
        value={filters.priority}
        onChange={(value) =>
          dispatch(
            setFilter({
              priority: value || null,
            }),
          )
        }
      />

      <RangePicker
        value={
          filters.dateRange[0] && filters.dateRange[1]
            ? [dayjs(filters.dateRange[0]), dayjs(filters.dateRange[1])]
            : null
        }
        onChange={(dates) => {
          dispatch(
            setFilter({
              dateRange: dates
                ? [dayjs(dates[0]).toISOString(), dayjs(dates[1]).toISOString()]
                : [null, null],
            }),
          );
        }}
      />

      <Button onClick={() => dispatch(resetFilters())}>Reset</Button>
    </Space>
  );
}

export default TaskFilterBar;
