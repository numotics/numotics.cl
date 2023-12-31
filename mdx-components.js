 
export function useMDXComponents(components) {
  return {
    h1: ({ children }) => <h1 className="mx-auto text-4xl mb-4">{children}</h1>,
    p: ({ children }) => <p className="ml-1 mr-auto text-lg text-left font-bold my-3">{children}</p>,
    ...components,
  }
}