import Image from 'next/image';
import alarmsClockIcon from '../../assets/icons/alarms-clock.png';
import { IconProps } from '../../types';

export default function AlarmsClockIcon({ className, priority }: IconProps) {
  return (
    <Image
      src={alarmsClockIcon}
      alt="Alarms & Clock"
      className={className}
      priority={priority}
    />
  );
}
