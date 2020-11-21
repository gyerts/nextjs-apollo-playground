#### Each component in system should be wrapped to ErrorBoundary

```
const Foo = () => {
  // default logic renders null
  const renderError = useCallback(() => <div>Error</div>, []);
  
  // default logic does the same
  const logError = useCallback((error: Error, errorInfo: React.ErrorInfo) => {
    console.error(error, errorInfo);
  }, []);
  
  return (
    <ErrorBoundary
      renderError={renderError}
      logError={logError}
    >
      ...normal staff
    </ErrorBoundary>
  );
}
```
