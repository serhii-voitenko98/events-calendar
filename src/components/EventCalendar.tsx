import { Calendar } from 'antd'
import { Moment } from 'moment';
import React, { FC } from 'react'
import { IEvent } from '../models/event'
import { formatDate } from '../utils/formatDate';

interface EventCalendarProps {
  events: IEvent[];
}

export const EventCalendar: FC<EventCalendarProps> = (props) => {
  function dateCellRender(value: Moment) {
    const formattedDate = formatDate(value.toDate());
    const currentDayEvents = props.events.filter(event => event.date === formattedDate);

    return (
      <div>
        {currentDayEvents.map((event, index) =>
          <div key={index}>{event.description}</div>
        )}
      </div>
    );
  }

  return (
    <Calendar dateCellRender={dateCellRender} />
  )
}
