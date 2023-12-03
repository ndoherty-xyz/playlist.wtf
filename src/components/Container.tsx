import { PropsWithChildren } from "react"

type ContainerProps = {
    className?: string;
} & PropsWithChildren

export const PageContainer = ({ children, className }: ContainerProps) => {
    return (
        <div className="h-[calc(100vh-130px)]">
            <div className="overflow-scroll flex flex-col justify-top items-center h-full">
                <div className={`w-full h-full md:max-w-[80vw] ${className}`}>
                    {children}
                </div>
            </div>
        </div >
    )
}