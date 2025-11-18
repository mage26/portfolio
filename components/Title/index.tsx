import { twMerge } from "tailwind-merge";

type Props = {
    Element?: 'h1' | 'h2' | 'h3' | 'span';
    children: React.ReactNode;
    className?: string;
}

export default function Title({Element = 'span', children, className = ''}: Props) {
    return (
        <Element 
            className={twMerge(
                "bg-linear-to-r from-primary dark:from-primary-dark to-secondary dark:to-secondary-dark inline-block text-transparent bg-clip-text", 
                className
            )}>
            {children}
        </Element>
    )
}