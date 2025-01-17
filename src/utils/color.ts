export interface ColorClasses {
  border: string;
  shadow: string;
  text: string;
  lightText: string;
}

export function getColorClasses(index: number): ColorClasses {
  switch (index % 5) { // Changed to 5 to use all colors
    case 0:
      return {
        border: 'border-eclipse-blue',
        shadow: 'bg-eclipse-blue',
        text: 'text-eclipse-blue',
        lightText: 'text-eclipse-blue-light',
      };
    case 1:
      return {
        border: 'border-eclipse-pink',
        shadow: 'bg-eclipse-pink',
        text: 'text-eclipse-pink',
        lightText: 'text-eclipse-pink-light',
      };
    case 2:
      return {
        border: 'border-eclipse-green',
        shadow: 'bg-eclipse-green',
        text: 'text-eclipse-green',
        lightText: 'text-eclipse-green-light',
      };
    case 3:
      return {
        border: 'border-eclipse-yellow',
        shadow: 'bg-eclipse-yellow',
        text: 'text-eclipse-yellow',
        lightText: 'text-eclipse-yellow-light',
      };
    case 4:
      return {
        border: 'border-eclipse-orange',
        shadow: 'bg-eclipse-orange',
        text: 'text-eclipse-orange',
        lightText: 'text-eclipse-orange-light',
      };
    default:
      return {
        border: 'border-eclipse-blue',
        shadow: 'bg-eclipse-blue',
        text: 'text-eclipse-blue',
        lightText: 'text-eclipse-blue-light',
      };
  }
}
