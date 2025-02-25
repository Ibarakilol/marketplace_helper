declare module '*.svg' {
  export default React.FC<React.SVGProps<SVGSVGElement>>;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
