// ./components/StarRatingInput.jsx
import { StarIcon } from '@sanity/icons';
import { Button, Flex } from '@sanity/ui';
import { NumberInputProps, NumberSchemaType, set, unset } from 'sanity';

export function StarRatingInput(props: NumberInputProps<NumberSchemaType>) {
  const { value, onChange, elementProps } = props;

  const handleStarClick = (rating: number) => {
    onChange(rating === value ? unset() : set(rating));
  };

  return (
    <Flex gap={2}>
      {[1, 2, 3, 4, 5].map((star: number) => (
        <Button
          key={star}
          mode="bleed"
          padding={2}
          onClick={() => handleStarClick(star)}
          {...elementProps}
        >
          <StarIcon
            style={{
              color: value && value >= star ? '#ffc107' : '#e0e0e0',
              width: '1.5em',
              height: '1.5em',
            }}
          />
        </Button>
      ))}
    </Flex>
  );
}
