import { AlignLeft, Calendar, ChevronDown, Circle, Hash, Type } from 'lucide-react';
import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

const ELEMENT_GROUPS = [
  {
    title: 'Basic Elements',
    elements: [
      { type: 'input', label: 'Text Input', icon: <Type className="mr-2 h-4 w-4 text-gray-500" /> },
      {
        type: 'number',
        label: 'Number Input',
        icon: <Hash className="mr-2 h-4 w-4 text-gray-500" />,
      },
      {
        type: 'radio',
        label: 'Radio Button',
        icon: <Circle className="mr-2 h-4 w-4 text-gray-500" />,
      },
    ],
  },
  {
    title: 'Advanced Inputs',
    elements: [
      {
        type: 'select',
        label: 'Select',
        icon: <ChevronDown className="mr-2 h-4 w-4 text-gray-500" />,
      },
      {
        type: 'date',
        label: 'Date Picker',
        icon: <Calendar className="mr-2 h-4 w-4 text-gray-500" />,
      },
      // {
      //   type: 'file',
      //   label: 'File Upload',
      //   icon: <Upload className="mr-2 h-4 w-4 text-gray-500" />,
      // },
      {
        type: 'textarea',
        label: 'Text Area',
        icon: <AlignLeft className="mr-2 h-4 w-4 text-gray-500" />,
      },
    ],
  },
];

function DraggableElement({ type, label, icon }: { type: string; label: string; icon: React.ReactNode }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'field',
    item: { type, label, from: 'toolbox' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(elementRef);

  return (
    <div
      ref={elementRef}
      className={`flex cursor-move items-center rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm transition-colors hover:bg-gray-100 ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

export function DSRSidebar() {
  return (
    <div className="bg-white">
      {ELEMENT_GROUPS.map((group) => (
        <div key={group.title} className="mb-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-600">{group.title}</h3>
          <div className="space-y-2">
            {group.elements.map((element) => (
              <DraggableElement key={element.type} {...element} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
