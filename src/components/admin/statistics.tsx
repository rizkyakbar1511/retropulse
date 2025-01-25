interface StatisticsProps {
  gamesCount: number;
  categoriesCount: number;
}

export default function Statistics({ gamesCount, categoriesCount }: StatisticsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="border border-slate-400 rounded-md flex justify-center items-center flex-col py-5 min-h-44">
        <h1 className="font-display font-bold text-2xl">{gamesCount}</h1>
        <p>Total Games</p>
      </div>
      <div className="border border-slate-400 rounded-md flex justify-center items-center flex-col py-5 min-h-44">
        <h1 className="font-display font-bold text-2xl">{categoriesCount}</h1>
        <p>Total Categories</p>
      </div>
    </div>
  );
}
