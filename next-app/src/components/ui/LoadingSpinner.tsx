const LoadingSpinner = () => {
  return (
    <main className="h-screen overflow-hidden w-full flex items-center justify-center">
      <div className="size-14 rounded-full border-t-2 border-b-2 border-indigo-600 animate-spin" />
    </main>
  );
};

export default LoadingSpinner;
