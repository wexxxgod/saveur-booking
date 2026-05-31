export function validatePhone(value: string): string | null {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
    return null;
  }
  return 'Введите корректный номер: +7 или 8, 10 цифр';
}

export function validateName(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return 'Введите имя';
  if (trimmed.length < 2) return 'Минимум 2 символа';
  if (!/^[a-zA-Zа-яёА-ЯЁ\s-]+$/.test(trimmed)) return 'Только буквы, пробелы и дефис';
  return null;
}

export function validateDate(value: string): string | null {
  if (!value) return 'Выберите дату';

  const selected = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const max = new Date(today);
  max.setDate(today.getDate() + 90);

  if (selected < today) return 'Дата не может быть в прошлом';
  if (selected > max) return 'Не более чем на 90 дней вперёд';
  return null;
}

export function validateGuests(value: number | ''): string | null {
  if (value === '') return 'Укажите количество гостей';
  return null;
}

export function validateTime(value: string): string | null {
  if (!value) return 'Выберите время';
  return null;
}

// возвращает min и max для input[type=date]
export function getDateLimits(): { min: string; max: string } {
  const today = new Date();
  const max = new Date(today);
  max.setDate(today.getDate() + 90);

  const fmt = (d: Date) => d.toISOString().split('T')[0];
  return { min: fmt(today), max: fmt(max) };
}
