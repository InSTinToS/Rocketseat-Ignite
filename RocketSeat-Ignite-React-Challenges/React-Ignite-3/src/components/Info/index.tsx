import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import styles from './info.module.scss';

const getReadTime = (time: any[]) => {
  const humanReadTime = 200;

  const words = time.reduce(
    (prev, curr) =>
      prev +
      curr.body.reduce(
        (prev2, curr2) => prev2 + curr2.text.split(' ').length,
        0
      ),
    0
  );

  return Math.ceil(words / humanReadTime);
};

export const Info = ({ date, author, time }: any) => {
  return (
    <div className={styles.footer}>
      {date && (
        <span className={styles.otherInfo}>
          <FiCalendar size={20} className={styles.infoIcon} />

          {format(new Date(date), 'dd MMM yyyy', {
            locale: ptBR,
          })}
        </span>
      )}

      {author && (
        <span className={styles.otherInfo}>
          <FiUser size={20} className={styles.infoIcon} />
          {author}
        </span>
      )}

      {time && (
        <span className={styles.otherInfo}>
          <FiClock size={20} className={styles.infoIcon} />
          {getReadTime(time)} min
        </span>
      )}
    </div>
  );
};
