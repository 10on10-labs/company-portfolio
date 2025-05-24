import { ServicesQueryResult } from '@/sanity.types';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';

export const ServiceCard = ({
  service,
  step,
}: {
  service: ServicesQueryResult[number];
  step: string | number;
}) => {
  return (
    <Card className="rounded-3xl w-full  pl-5 pr-5 pt-10 pb-10 border border-secondary shadow-sm">
      <CardHeader>
        <CardTitle className="flex justify-between items-center mb-4 capitalize">
          <h2 className="text-2xl font-bold tracking-tight">{service?.name}</h2>
          <div className="rounded-full border-2 border-secondary px-2.5 py-0.5 text-md text-sm md:text-md font-bold">
            {step}
          </div>
        </CardTitle>
        {service?.description && <CardDescription>{service.description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-1">
        {service?.categories?.map((category, index) => (
          <div key={index} className="border-b border-primary py-1 md:py-2">
            <p className="text-base font-medium capitalize">{category}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
