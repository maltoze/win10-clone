import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import ArrowRightIcon from '../icons/ArrowRightIcon';
import DotsVerticalIcon from '../icons/DotsVerticalIcon';
import RefreshIcon from '../icons/RefreshIcon';
import IconButton from './IconButton';

const AddressBar = () => (
  <div className="flex h-9 space-x-2 py-1 px-2">
    <div className="flex space-x-1">
      <IconButton
        icon={<ArrowLeftIcon className="h-5 w-5 text-zinc-500" />}
        disabled
      />
      <IconButton
        icon={<ArrowRightIcon className="h-5 w-5 text-zinc-500" />}
        disabled
      />
      <IconButton icon={<RefreshIcon className="h-5 w-5 text-zinc-200" />} />
    </div>
    <div className="flex h-full grow">
      <input className="w-full rounded-full bg-zinc-900 px-4 text-sm text-zinc-100 outline-none ring-blue-300 focus:ring-[2px]" />
    </div>
    <div>
      <IconButton
        icon={<DotsVerticalIcon className="h-5 w-5 text-zinc-200" />}
      />
    </div>
  </div>
);

export default AddressBar;
