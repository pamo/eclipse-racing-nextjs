export interface ColorClasses {
  border: string;
  shadow: string;
  text: string;
  lightText: string;
}

export function getColorClasses(index: number): ColorClasses {
  switch (index % 3) {
    case 0:
      return {
        border: 'border-eclipse-blue-dark',
        shadow: 'bg-eclipse-blue-dark',
        text: 'text-eclipse-blue-dark',
        lightText: 'text-eclipse-blue-light',
      };
    case 1:
      return {
        border: 'border-eclipse-pink-dark',
        shadow: 'bg-eclipse-pink-dark',
        text: 'text-eclipse-pink-dark',
        lightText: 'text-eclipse-pink-light',
      };
    case 2:
      return {
        border: 'border-eclipse-green-dark',
        shadow: 'bg-eclipse-green-dark',
        text: 'text-eclipse-green-dark',
        lightText: 'text-eclipse-green-light',
      };
    default:
      return {
        border: 'border-eclipse-yellow-dark',
        shadow: 'bg-eclipse-yellow-dark',
        text: 'text-eclipse-yellow-dark',
        lightText: 'text-eclipse-yellow-light',
      };
  }
}
