export default function AuthLayout({ children }: LayoutProps<"/">) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            {children}
        </div>
    );
}