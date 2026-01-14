import Image from "next/image";

type Props = {
  name: string;
  description?: string[];
  position?: string;
  startDate?: string;
  endDate?: string;
  image: string;
  example?: {
    link: string;
    title: string;
  };
};

export default function Card({
  name,
  description,
  position,
  startDate,
  endDate,
  image,
  example,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row min-h-100 w-full items-center gap-12 bg-section p-8 max-w-6xl rounded-xl">
      <div
        className="w-60 shrink-0 opacity-0 inview:opacity-100 transition-all duration-700"
        data-inview
        data-inview-offset="300px"
      >
        <Image src={`/images/${image}`} alt={name} width={240} height={174} />
      </div>
      <div className="relative flex flex-col gap-4 w-full">
        <h3 className="text-3xl font-bold">{name}</h3>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
          {position && <h4 className="text-xl">{position}</h4>}
          {startDate && endDate && (
            <p>
              {startDate} - {endDate}
            </p>
          )}
        </div>
        {description && (
          <ul className="list-disc">
            {description.map((desc, k) => (
              <li key={k}>{desc}</li>
            ))}
          </ul>
        )}
        {example && (
          <a
            href={`http://www.benberlinfrontend.com${example.link}`}
            target="_blank"
          >
            {example.title}
          </a>
        )}
      </div>
    </div>
  );
}
