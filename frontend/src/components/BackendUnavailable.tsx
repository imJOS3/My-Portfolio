type BackendUnavailableProps = {
  title?: string;
  description?: string;
};

const BackendUnavailable = ({
  title = "Under maintenance",
  description = "Coming soon.",
}: BackendUnavailableProps) => {
  return (
    <div className="bg-white/10 rounded-xl p-6 sm:p-8 border border-fuchsia-400/20 text-center">
      <p className="text-fuchsia-200 text-lg sm:text-xl font-semibold mb-2">
        {title}
      </p>
      <p className="text-indigo-300 text-sm sm:text-base">{description}</p>
    </div>
  );
};

export default BackendUnavailable;
