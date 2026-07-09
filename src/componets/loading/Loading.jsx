function Loading({ text = "Loading...", fullPage = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600" />
      <p className="text-sm font-medium text-slate-500">{text}</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-10">{content}</div>
  );
}

export default Loading;
