const TitleText = ({title}) => {
  return (
    <div className="relative flex items-center justify-center py-6 w-full">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full h-10 bg-gradient-to-r from-transparent via-teal-300 to-transparent opacity-60" />
      </div>
      <h2 className="relative z-10 px-4 text-xl font-bold text-gray-700 uppercase">
        {title}
      </h2>
    </div>
  );
};

export default TitleText;
