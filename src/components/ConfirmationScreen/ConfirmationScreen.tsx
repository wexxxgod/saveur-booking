import type { BookingFormData } from '../../types/booking';
import styles from './ConfirmationScreen.module.scss';

interface ConfirmationScreenProps {
  data: BookingFormData;
  onReset: () => void;
}

export function ConfirmationScreen({ data, onReset }: ConfirmationScreenProps) {
  const guestsLabel = () => {
    const n = Number(data.guests);
    if (n === 1) return '1 гость';
    if (n >= 2 && n <= 4) return `${n} гостя`;
    return `${n} гостей`;
  };

  const details = [
    { label: 'Имя', value: data.name },
    { label: 'Дата', value: data.date },
    { label: 'Время', value: data.time },
    { label: 'Гостей', value: guestsLabel() },
  ];

  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>✓</div>

      <div>
        <h1 className={styles.heading}>Столик забронирован!</h1>
        <p className={styles.subheading}>Ждём вас. Детали бронирования ниже.</p>
      </div>

      <div className={styles.card}>
        {details.map(({ label, value }) => (
          <div key={label} className={styles.row}>
            <span className={styles.rowLabel}>{label}</span>
            <span className={styles.rowValue}>{value}</span>
          </div>
        ))}
      </div>

      <button className={styles.button} onClick={onReset}>
        Забронировать ещё
      </button>
    </div>
  );
}
