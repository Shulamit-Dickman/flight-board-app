import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { type } from 'os'
import { useState } from 'react'

type DropdownProps = {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

const DropDown: React.FC<DropdownProps> = ({options,selected,onChange})=>{
const [isOpen,setIsOpen] = useState(false);
const [selectedValue,setSelectedValue] = useState('Status');

function selectOption(selectedValue:string){
  onChange(selectedValue);
  setIsOpen(false);
}
  return (
    <div className="relative inline-block text-left">
      <div>
        <button className="h-10 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selected}
        </button>
      </div>

      {isOpen && (
        <div className="absolute w-40 rounded-md bg-white shadow-lg z-10">
          <ul className="text-sm text-gray-700">
            {
              options.map((value,key)=>(
                <li 
                className="h-10 px-4 py-2 hover:bg-gray-100 cursor-pointer" 
                onClick={(e)=>{selectOption(value)}}
                key={value}
                >{value}</li>
              ))
            }
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropDown;