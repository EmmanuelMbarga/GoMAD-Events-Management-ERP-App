function MyApp({ Component, pageProps }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow overflow-y-auto">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
