/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop, useDragLayer } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Define types for field types and form fields
type FieldType = {
  type: string;
  label: string;
};

type FormField = {
  id: string;
  type: string;
  label: string;
};

// Field types for the toolbox
const FIELD_TYPES: FieldType[] = [
  { type: "text", label: "Text" },
  { type: "email", label: "Email" },
  { type: "number", label: "Number" },
  { type: "textarea", label: "Textarea" },
  { type: "select", label: "Select" },
  { type: "checkbox", label: "Checkbox" },
  { type: "radio", label: "Radio" },
  { type: "date", label: "Date" },
];

// Props for ToolboxItem
interface ToolboxItemProps {
  fieldType: FieldType;
}

function ToolboxItem({ fieldType }: ToolboxItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "field",
    item: { ...fieldType, from: "toolbox" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(ref);

  return (
    <div
      ref={ref}
      className={`p-3 mb-2 bg-white rounded-lg shadow-sm border border-gray-200 cursor-grab hover:bg-gray-50 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {fieldType.label}
    </div>
  );
}

// Props for CanvasField
interface CanvasFieldProps {
  field: FormField;
  index: number;
  moveField: (fromIndex: number, toIndex: number) => void;
}

function CanvasField({ field, index, moveField }: CanvasFieldProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "field",
    item: { ...field, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: "field",
    hover: (item: any) => {
      if (item.index === index) return;
      moveField(item.index, index);
      item.index = index;
    },
  }));

  return (
    <div
      ref={(node) => {
        if (node) drag(drop(node));
      }}
      className={`p-3 mb-2 bg-white rounded-lg shadow-sm border border-gray-200 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {field.label} ({field.type})
    </div>
  );
}

function FormBuilder() {
  const [fields, setFields] = useState<FormField[]>([]);

  const moveField = (fromIndex: number, toIndex: number) => {
    setFields((prev) => {
      const newFields = [...prev];
      const [removed] = newFields.splice(fromIndex, 1);
      newFields.splice(toIndex, 0, removed);
      return newFields;
    });
  };

  const [, drop] = useDrop(() => ({
    accept: "field",
    drop: (item: any) => {
      if (item.from === "toolbox") {
        setFields((prev) => [
          ...prev,
          {
            id: `field-${Date.now()}`,
            type: item.type,
            label: item.label,
          },
        ]);
      }
    },
  }));

  return (
    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-white rounded-lg shadow p-4">
        <h2 className="font-bold text-lg mb-4 text-gray-800">Field Toolbox</h2>
        <div className="space-y-2">
          {FIELD_TYPES.map((ft) => (
            <ToolboxItem key={ft.type} fieldType={ft} />
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={(node) => {
          drop(node);
        }}
        className="flex-1 bg-white rounded-lg shadow p-4"
      >
        <h2 className="font-bold text-lg mb-4 text-gray-800">Form Canvas</h2>
        <div className="min-h-[300px] p-4 bg-gray-50 rounded border-2 border-dashed border-gray-300">
          {fields.length === 0 ? (
            <div className="text-gray-400 text-center py-12">
              Drag fields here to build your form
            </div>
          ) : (
            fields.map((field, index) => (
              <CanvasField
                key={field.id}
                field={field}
                index={index}
                moveField={moveField}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// Wrap the FormBuilder with DndProvider
export default function FormBuilderWithDnd() {
  return (
    <DndProvider backend={HTML5Backend}>
      <FormBuilder />
    </DndProvider>
  );
}