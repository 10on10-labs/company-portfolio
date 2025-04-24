export type Service = {
  name: string;
  id: string;
  categories: string[];
};

export const ServiceCard = ({ service, step }: { service: Service; step: string | number }) => {
  return (
    <div className="rounded-3xl md:w-1/3 pl-10 pr-10 pt-10 pb-10 border border-secondary shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold tracking-tight">{service?.name}</h2>
        <div className="rounded-full border-2 border-secondary px-2.5 py-0.5 text-md font-bold">
          {step}
        </div>
      </div>

      <div className="space-y-1">
        {service?.categories?.map((category, index) => (
          <div key={index} className="border-b border-primary py-2">
            <p className="text-base font-medium">{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
