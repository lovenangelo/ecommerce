import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const UserAvatar = ({
  src,
  name,
  height,
  width,
}: {
  src: string;
  name: string;
  height: number;
  width: number;
}) => {
  return (
    <Avatar className="mt-4 w-mix h-min">
      <AvatarImage
        height={height}
        width={width}
        className="object-cover"
        src={src !== null ? `http://localhost:8000/${src}` : "/"}
      />
      <AvatarFallback className="font-semibold">{name}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
