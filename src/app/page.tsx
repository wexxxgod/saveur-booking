'use client';

import { useState } from 'react';
import type { BookingFormData } from '../types/booking';
import { BookingForm } from '../components/BookingForm/BookingForm';
import { ConfirmationScreen } from '../components/ConfirmationScreen/ConfirmationScreen';
import styles from './page.module.scss';

export default function Page() {
  const [booking, setBooking] = useState<BookingFormData | null>(null);

  function handleSuccess(data: BookingFormData) {
    setBooking(data);
  }

  function handleReset() {
    setBooking(null);
  }

  return (
    <main className={styles.main}>
      {booking ? (
        <ConfirmationScreen data={booking} onReset={handleReset} />
      ) : (
        <BookingForm onSuccess={handleSuccess} />
      )}
    </main>
  );
}
