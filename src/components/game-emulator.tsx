interface GameEmulatorProps {
  iframeSrc: string;
}
export default function GameEmulator({ iframeSrc }: GameEmulatorProps) {
  return (
    <div className="bg-main flex justify-center items-center rounded-xl">
      {iframeSrc && (
        <iframe
          className="w-[640px] h-[500px] border-none"
          src={iframeSrc}
          title="Retro Game Emulator"
        />
      )}
    </div>
  );
}
