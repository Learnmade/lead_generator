import Link from 'next/link';
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className,
    isLoading,
    href,
    ...props
}) {
    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm shadow-indigo-200 border-transparent",
        secondary: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 border",
        outline: "bg-white text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
        danger: "bg-red-600 text-white hover:bg-red-700 border-transparent",
        ghost: "text-gray-600 hover:bg-gray-100 border-transparent",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    const classes = clsx(
        "inline-flex items-center justify-center rounded-md font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
    );

    // If href is provided, return a Link
    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button
            className={classes}
            disabled={isLoading}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </button>
    );
}

