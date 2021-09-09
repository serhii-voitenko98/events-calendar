import { Input, Form, DatePicker, Button, Row, Select } from 'antd';
import { Moment } from 'moment';
import React, { FC } from 'react';
import { useState } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/event';
import { IUser } from '../models/user';
import { formatDate } from '../utils/formatDate';
import { formRules } from '../utils/formRules';

interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

export const EventForm: FC<EventFormProps> = props => {
  const [event, setEvent] = useState<IEvent>({
    author: '',
    description: '',
    guest: '',
    date: '',
  } as IEvent);

  const { user } = useTypedSelector(state => state.authReducer);

  const selectDate = (moment: Moment | null) => {
    const date = moment ? formatDate(moment.toDate()) : '';
    setEvent({ ...event, date });
  };

  const submitForm = () => {
    props.submit({ ...event, author: user.username });
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label='Event name'
        name='description'
        rules={[formRules.required()]}
      >
        <Input
          value={event.description}
          onChange={e => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        label='Event date'
        name='date'
        rules={[
          formRules.required(),
          formRules.isDateAfter('The date should be today or later'),
        ]}
      >
        <DatePicker onChange={(date: Moment | null) => selectDate(date)} />
      </Form.Item>

      <Form.Item label='Guests' name='guests'>
        <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
          {props.guests.map(event => (
            <Select.Option value={event.username} key={event.username}>
              {event.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Row justify='end'>
          <Button type='primary' htmlType='submit'>
            Create
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};
