declare module '*.svg' {
  export default React.FC<React.SVGProps<SVGSVGElement>>;
}

interface Window {
  API_URL: string;
}
