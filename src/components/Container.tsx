import { PropsWithChildren } from "react"

type ContainerProps = {
    className?: string;
} & PropsWithChildren

export const Container = ({ children, className }: ContainerProps) => {
    return (
        <div className={`w-full max-w-[80vw] ${className}`}>
            {children}
        </div>
    )
}