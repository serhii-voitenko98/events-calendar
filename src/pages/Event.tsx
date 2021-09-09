import { Button, Row } from 'antd';
import Layout from 'antd/lib/layout/layout';
import Modal from 'antd/lib/modal/Modal';
import React, { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { EventCalendar } from '../components/EventCalendar';
import { EventForm } from '../components/EventForm';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/event';

export const Event: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { fetchGuests, createEvent, fetchEvents } = useActions();
  const { guests, events } = useTypedSelector(state => state.eventReducer);
  const { user } = useTypedSelector(state => state.authReducer);

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

  const addNewEvent = (event: IEvent) => {
    createEvent(event);
    setIsModalVisible(false);
  };

  return (
    <Layout>
      <EventCalendar events={events} />
      <Row justify='center'>
        <Button onClick={() => setIsModalVisible(true)}>Add Event</Button>
      </Row>
      <Modal
        title='Add an event'
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <EventForm guests={guests} submit={(event: IEvent) => addNewEvent(event)} />
      </Modal>
    </Layout>
  );
};
