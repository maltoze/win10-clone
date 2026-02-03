import Image from 'next/image';
import notepadIcon from '../../assets/icons/notepad.png';
import { IconProps } from '../../types';

export default function NotepadIcon({ className, priority }: IconProps) {
  return (
    <Image
      src={notepadIcon}
      alt="notepad"
      className={className}
      priority={priority}
    />
  );
}
