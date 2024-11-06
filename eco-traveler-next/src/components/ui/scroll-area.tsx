<<<<<<< HEAD
'use client';

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/utils';
=======
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"
>>>>>>> 623713560b3c045e5ccb05257e7c1697443d79c1

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
<<<<<<< HEAD
    className={cn('relative overflow-hidden', className)}
=======
    className={cn("relative overflow-hidden", className)}
>>>>>>> 623713560b3c045e5ccb05257e7c1697443d79c1
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
<<<<<<< HEAD
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
=======
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName
>>>>>>> 623713560b3c045e5ccb05257e7c1697443d79c1

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
<<<<<<< HEAD
>(({ className, orientation = 'vertical', ...props }, ref) => (
=======
>(({ className, orientation = "vertical", ...props }, ref) => (
>>>>>>> 623713560b3c045e5ccb05257e7c1697443d79c1
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
<<<<<<< HEAD
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' &&
        'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' &&
        'h-2.5 flex-col border-t border-t-transparent p-[1px]',
=======
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
>>>>>>> 623713560b3c045e5ccb05257e7c1697443d79c1
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
<<<<<<< HEAD
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
=======
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
>>>>>>> 623713560b3c045e5ccb05257e7c1697443d79c1
