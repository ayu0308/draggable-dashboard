import * as React from 'react';
import { cn } from '@/lib/utils';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...properties }, reference) => (
    <table
      ref={reference}
      className={cn('w-full caption-bottom bg-white text-sm shadow-sm', className)}
      {...properties}
    />
  )
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
  <thead
    ref={reference}
    className={cn(
      'sticky top-0 z-10  bg-white shadow-sm dark:bg-black [&_tr]:border-b',
      className
    )}
    {...properties}
  />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
  <tbody ref={reference} className={cn('[&_tr:last-child]:border-0', className)} {...properties} />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...properties }, reference) => (
  <tfoot
    ref={reference}
    className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
    {...properties}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...properties }, reference) => (
    <tr
      ref={reference}
      className={cn(
        'border-b transition-colors hover:bg-[#E1E1E1]/20 data-[state=selected]:bg-muted',
        className
      )}
      {...properties}
    />
  )
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...properties }, reference) => (
  <th
    ref={reference}
    className={cn('font-sm p-4 text-left align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...properties}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...properties }, reference) => (
  <td
    ref={reference}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...properties}
  />
));
TableCell.displayName = 'TableCell';

const TableCellWithIcon = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...properties }, reference) => (
  <td
    ref={reference}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...properties}
  />
));
TableCell.displayName = 'TableCellWithIcon';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...properties }, reference) => (
  <caption
    ref={reference}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...properties}
  />
));
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableCellWithIcon,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
