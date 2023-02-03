import Image from 'next/future/image';
import alarmsClockIcon from '../../assets/icons/alarms-clock.png';
import { IconProps } from '../../types';

export default function NotepadIcon({ className }: IconProps) {
  return <Image src={alarmsClockIcon} alt="notepad" className={className} />;
}
