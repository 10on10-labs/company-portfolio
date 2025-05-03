import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
  PortableTextProps,
} from 'next-sanity';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { kimbieLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type TypedObject = {
  _type: string;
  _key?: string;
};

export function CustomPortableText<B extends TypedObject = PortableTextBlock>({
  ...props
}: PortableTextProps<B>) {
  const components: PortableTextComponents = {
    block: {
      h1: ({ children }) => <h1 className="my-4 text-primary text-4xl font-bold">{children}</h1>,
      h2: ({ children }) => (
        <h2 className="my-3 text-primary text-3xl font-semibold underline">{children}</h2>
      ),
      h3: ({ children }) => <h3 className="my-3 text-primary text-2xl font-medium">{children}</h3>,
      h4: ({ children }) => <h4 className="my-2 text-primary text-xl font-medium">{children}</h4>,
      h5: ({ children }) => <h5 className="my-2 text-primary text-lg font-medium">{children}</h5>,
      h6: ({ children }) => <h6 className="my-2 text-primary text-base font-medium">{children}</h6>,
      normal: ({ children }) => <p className="my-2 text-base leading-relaxed">{children}</p>,
      blockquote: ({ children }) => (
        <blockquote className="my-4 border-l-4 border-gray-300 pl-4 italic">{children}</blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="my-2 list-disc pl-5">{children}</ul>,
      number: ({ children }) => <ol className="my-2 list-decimal pl-5">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li className="ml-4">{children}</li>,
      number: ({ children }) => <li className="ml-4">{children}</li>,
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      underline: ({ children }) => <span className="underline">{children}</span>,
      strike: ({ children }) => <span className="line-through">{children}</span>,
      link: ({ value, children }) => (
        <a
          href={value?.href}
          className="text-secondary-600 hover:text-secondary-700 underline"
          target={value?.href?.startsWith('http') ? '_blank' : '_self'}
          rel={value?.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      ),
    },
    types: {
      image: ({ value }) => {
        const imageUrl = urlFor(value.asset).fit('fill').url();
        const match = imageUrl.match(/(\d{1,})(?=\.|x)/g);
        const [w, h] = match ? match : [1, 1]; // Default to [1, 1] if match is null
        const aspectRatio = (Number(w) || 1) / (Number(h) || 1);
        return (
          <div className="my-4 relative" style={{ aspectRatio }}>
            <Image
              src={imageUrl}
              alt={value.alt || 'Sanity Image'}
              className="mx-auto h-auto max-w-full rounded-lg object-contain"
              fill
            />
          </div>
        );
      },
      code: ({ value }) => (
        <div className="my-3 overflow-x-auto rounded-md m-8">
          {value.language ? (
            <SyntaxHighlighter language={value.language} style={kimbieLight}>
              {value.code}
            </SyntaxHighlighter>
          ) : (
            <pre>
              <code>{value.code}</code>
            </pre>
          )}
        </div>
      ),
      p: ({ value }) => (
        <p className="my-3 overflow-x-auto rounded-md bg-gray-900 p-4 text-white">{value}</p>
      ),
    },
  };

  return (
    <div className={['prose prose-a:text-red-500'].filter(Boolean).join(' ')}>
      <PortableText components={components} {...props} />
    </div>
  );
}
