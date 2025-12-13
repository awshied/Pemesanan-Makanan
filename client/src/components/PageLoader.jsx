import { LoaderIcon } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 bg-secondary flex items-center justify-center pointer-events-auto">
      <div className="flex flex-col items-center gap-3">
        <LoaderIcon className="w-10 h-10 animate-spin text-white" />
        <span className="text-white text-sm">Loading...</span>
      </div>
    </div>
  );
};

export default PageLoader;
