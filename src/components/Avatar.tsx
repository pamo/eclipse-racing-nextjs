import { SanityImageSource, urlFor } from '@/lib/sanity';
import Image from 'next/image';

interface AvatarProps {
  image?: SanityImageSource;
  firstName: string;
  lastName: string;
  colorClasses: {
    border: string;
    text: string;
  };
  className?: string;
  priority?: boolean;
}

export function Avatar({
  image,
  firstName,
  lastName,
  colorClasses,
  className = '',
  priority = false,
}: AvatarProps) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <div
      className={`h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 sm:h-28 sm:w-28 md:h-32 md:w-32 ${colorClasses.border} ${className}`}
    >
      {image ? (
        <Image
          src={urlFor(image)
            .width(400)
            .height(400)
            .fit('crop')
            .crop('focalpoint')
            .focalPoint(image.hotspot?.x ?? 0.5, image.hotspot?.y ?? 0.5)
            .quality(90)
            .url()}
          alt={`${firstName} ${lastName}`}
          width={400}
          height={400}
          className="h-full w-full object-cover"
          priority={priority}
          sizes="(max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-white">
          <span className={`text-2xl font-bold ${colorClasses.text}`}>{initials}</span>
        </div>
      )}
    </div>
  );
}
