import { Link } from "expo-router";
import { LinkButtonProps } from "../@types";

export function LinkButton({ title, ...rest }: LinkButtonProps) {
  return (
    <Link className="text-neutral-300 text-center text-base font-body" {...rest}>
      {title}
    </Link>
  );
}