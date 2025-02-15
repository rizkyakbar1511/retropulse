interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  value: string;
}

export default function Radio({ label, ...props }: RadioProps) {
  return (
    <div className="flex items-center gap-1">
      <input className="hidden peer/status" type="radio" {...props} />
      <span className="size-4 mr-1 transition-transform peer-hover/status:scale-125 hover:scale-125 rounded-full border border-grey peer-checked/status:shadow-[0px_0px_0px_4px_#1d1f29_inset] peer-checked/status:bg-[#FFBA08]"/>
      <label className="text-sm text-slate-400" htmlFor={props.id}>
        {label}
      </label>
    </div>
  );
}
