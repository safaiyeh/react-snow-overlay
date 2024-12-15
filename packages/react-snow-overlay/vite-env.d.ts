/// <reference types="vite/client" />

// Add a declaration for Vite worker imports with inline
declare module "*?worker&inline" {
  const WorkerFactory: {
    new (): Worker;
  };
  export default WorkerFactory;
}
