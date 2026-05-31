import { useState } from 'react';
import type { BookingFormData, BookingStatus } from '../../types/booking';
import { TIME_SLOTS } from '../../types/booking';
import {
  validateName,
  validatePhone,
  validateDate,
  validateTime,
  validateGuests,
  getDateLimits,
} from '../../utils/validation';
import styles from './BookingForm.module.scss';

interface BookingFormProps {
  onSuccess: (data: BookingFormData) => void;
}

type FormErrors = Partial<Record<keyof BookingFormData, string>>;

const EMPTY_FORM: BookingFormData = {
  name: '',
  phone: '',
  date: '',
  time: '',
  guests: '',
};

export function BookingForm({ onSuccess }: BookingFormProps) {
  const [form, setForm] = useState<BookingFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<BookingStatus>('idle');

  const { min, max } = getDateLimits();

  function handleChange(field: keyof BookingFormData, value: string) {
    const newValue = field === 'guests' ? (value === '' ? '' : Number(value)) : value;
    setForm((prev) => ({ ...prev, [field]: newValue }));

    // убираем ошибку когда пользователь начал исправлять поле
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleBlur(field: keyof BookingFormData) {
    const error = getFieldError(field, form[field]);
    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  }

  function getFieldError(field: keyof BookingFormData, value: BookingFormData[keyof BookingFormData]): string | null {
    switch (field) {
      case 'name': return validateName(value as string);
      case 'phone': return validatePhone(value as string);
      case 'date': return validateDate(value as string);
      case 'time': return validateTime(value as string);
      case 'guests': return validateGuests(value as number | '');
      default: return null;
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // проверяем все поля
    const newErrors: FormErrors = {};
    (Object.keys(form) as (keyof BookingFormData)[]).forEach((field) => {
      const error = getFieldError(field, form[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // имитируем отправку
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      onSuccess(form);
    }, 1500);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div>
        <h1 className={styles.heading}>Забронировать столик</h1>
        <p className={styles.subheading}>Заполните форму — мы свяжемся для подтверждения</p>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">Имя гостя</label>
        <input
          id="name"
          type="text"
          className={`${styles.input} ${errors.name ? styles.error : ''}`}
          value={form.name}
          placeholder="Иван Иванов"
          autoComplete="name"
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="phone">Телефон</label>
        <input
          id="phone"
          type="tel"
          className={`${styles.input} ${errors.phone ? styles.error : ''}`}
          value={form.phone}
          placeholder="+7 (999) 123-45-67"
          autoComplete="tel"
          onChange={(e) => handleChange('phone', e.target.value)}
          onBlur={() => handleBlur('phone')}
        />
        {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="date">Дата</label>
          <input
            id="date"
            type="date"
            className={`${styles.input} ${errors.date ? styles.error : ''}`}
            value={form.date}
            min={min}
            max={max}
            onChange={(e) => handleChange('date', e.target.value)}
            onBlur={() => handleBlur('date')}
          />
          {errors.date && <span className={styles.errorText}>{errors.date}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="time">Время</label>
          <select
            id="time"
            className={`${styles.select} ${errors.time ? styles.error : ''}`}
            value={form.time}
            onChange={(e) => handleChange('time', e.target.value)}
            onBlur={() => handleBlur('time')}
          >
            <option value="">Выберите</option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          {errors.time && <span className={styles.errorText}>{errors.time}</span>}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="guests">Количество гостей</label>
        <select
          id="guests"
          className={`${styles.select} ${errors.guests ? styles.error : ''}`}
          value={form.guests}
          onChange={(e) => handleChange('guests', e.target.value)}
          onBlur={() => handleBlur('guests')}
        >
          <option value="">Выберите</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? 'гость' : n < 5 ? 'гостя' : 'гостей'}
            </option>
          ))}
        </select>
        {errors.guests && <span className={styles.errorText}>{errors.guests}</span>}
      </div>

      <button type="submit" className={styles.button} disabled={status === 'loading'}>
        {status === 'loading' ? (
          <>
            <span className={styles.spinner} />
            Бронирую...
          </>
        ) : (
          'Забронировать'
        )}
      </button>
    </form>
  );
}
