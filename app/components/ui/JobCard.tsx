type JobRowProps = {
    title: string;
    description: string;
};

export default function JobRow({ title, description }: JobRowProps) {
    return (
        <div className="flex items-end justify-between gap-8 rounded-2xl border border-gray-200 px-6 py-4">
            <div>
                <h3 className="text-[32px] font-medium text-ink">{title}</h3>
                <p className="mt-1.5 text-md font-normal leading-snug text-ink max-w-[785px]">
                    {description}
                </p>
            </div>
            <a
                href="#"
                className="shrink-0 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
                Submit Application
            </a>
        </div>
    );
}