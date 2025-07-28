import * as React from 'react'
import { Select } from '@base-ui-components/react/select'
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@radix-ui/react-icons'
import { cn } from '../lib/utils'

const SelectRoot = Select.Root

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof Select.Trigger>,
  React.ComponentPropsWithoutRef<typeof Select.Trigger>
>(({ className, children, ...props }, ref) => (
  <Select.Trigger
    ref={ref}
    className={cn(
      'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-slate-800 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300',
      className
    )}
    {...props}
  >
    {children}
    <Select.Icon>
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </Select.Icon>
  </Select.Trigger>
))
SelectTrigger.displayName = 'SelectTrigger'

const SelectValue = React.forwardRef<
  React.ElementRef<typeof Select.Value>,
  React.ComponentPropsWithoutRef<typeof Select.Value>
>(({ className, ...props }, ref) => (
  <Select.Value ref={ref} className={cn('', className)} {...props} />
))
SelectValue.displayName = 'SelectValue'

const SelectContent = React.forwardRef<
  React.ElementRef<typeof Select.Popup>,
  React.ComponentPropsWithoutRef<typeof Select.Popup>
>(({ className, children, ...props }, ref) => (
  <Select.Portal>
    <Select.Popup
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white text-slate-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50',
        className
      )}
      {...props}
    >
      <Select.ScrollUpArrow>
        <ChevronUpIcon className="h-4 w-4" />
      </Select.ScrollUpArrow>
      {children}
      <Select.ScrollDownArrow>
        <ChevronDownIcon className="h-4 w-4" />
      </Select.ScrollDownArrow>
    </Select.Popup>
  </Select.Portal>
))
SelectContent.displayName = 'SelectContent'

const SelectItem = React.forwardRef<
  React.ElementRef<typeof Select.Item>,
  React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ className, children, ...props }, ref) => (
  <Select.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50',
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <Select.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </Select.ItemIndicator>
    </span>
    <Select.ItemText>{children}</Select.ItemText>
  </Select.Item>
))
SelectItem.displayName = 'SelectItem'

export {
  SelectRoot as Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
}
