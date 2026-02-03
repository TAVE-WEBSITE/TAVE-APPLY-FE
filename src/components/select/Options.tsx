interface SelectOptionProps {
    children: React.ReactNode;
}

const Options = ({ children }: SelectOptionProps) => {
    return (
        <ul className="absolute z-99 mt-2 w-full flex flex-col border border-gray-200 bg-white p-2 rounded-xl text-gray-700">
            {children}
        </ul>
    );
};

export default Options;
