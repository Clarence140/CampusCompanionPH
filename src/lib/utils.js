/**
 * Utility function to merge Tailwind CSS classes
 * Similar to clsx or classnames but simpler
 */
export function cn(...classes) {
  return classes
    .filter(Boolean)
    .join(" ")
    .split(" ")
    .filter((value, index, self) => self.indexOf(value) === index)
    .join(" ");
}


